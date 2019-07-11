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
  const accountID = req.user.profile.accountID // logged in user

  if (req.user.profile.type.localeCompare('admin') == 0) {
    var connection = mysql.createConnection({
      host: sensitive.host,
      user: sensitive.user,
      password: sensitive.password,
      database: sensitive.database
    })

    connection.connect(function(err) {
      if (err) throw err

      connection.query('CALL deleteAccount(?)', userID, function (error, result, feilds) {
        if (error) throw error

        res.redirect('/account')
        connection.end()
      })
    })
  } else {
    res.redirect('/')
  }
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
