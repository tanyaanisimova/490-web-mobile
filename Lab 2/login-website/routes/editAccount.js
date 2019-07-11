const express = require('express')
const router = express.Router()

const parser = require('body-parser')
parser.json()
parser.urlencoded({extended : false})

var mysql = require('mysql')
var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  const userID = validateInput(req.query.userID)
  if (userID == null) {
    res.redirect('/account')
    return
  }

  const accountID = req.user.profile.accountID

  if (req.user.profile.type.localeCompare('admin') == 0) {
    if (userID != accountID) {
      var connection = mysql.createConnection({
        host: sensitive.host,
        user: sensitive.user,
        password: sensitive.password,
        database: sensitive.database
      })

      connection.connect(function(err) {
        if (err) throw err

        connection.query('CALL getAccountContents(?)', userID, function (error, result, feilds) {
          if (error) throw error

          const isEnabled = result[0][0].AccountStatus.localeCompare('enabled') == 0
          const isAdmin = result[0][0].AccountType.localeCompare('admin') == 0

          res.render('editAccount', { data :
            { userID: userID, email: result[0][0].Email,
              name: result[0][0].FirstName + ' ' + result[0][0].LastName,
              isEnabled: isEnabled, isAdmin: isAdmin }})
          connection.end()
        })
      })
    } else {
      res.redirect('/account')
    }
  } else {
    res.redirect('/')
  }
})

router.post('/', (req, res) => {
  const postBody = req.body
  const userID = postBody.userID
  const status = postBody.status
  const type = postBody.type

  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL updateAccount(?,?,?)', [ userID, status, type ], function (error, result, feilds) {
      if (error) throw error

      res.redirect('/account')
    })
  })
})

function validateInput(input) {
  if (input != null) {
    if (input.trim() != 0 | input.trim()) {
      input = input.trim()
      if (parseInt(input)) {
        input = parseInt(input)
        return input
      }
    }
  }
  return null
}

module.exports = router
