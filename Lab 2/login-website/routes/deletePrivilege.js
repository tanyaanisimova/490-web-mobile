const express = require('express')
const router = express.Router()

const parser = require('body-parser')
parser.json()
parser.urlencoded({extended : false})

var mysql = require('mysql')
var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  const setID = validateInput(req.query.setID)
  if (setID == null) {
    res.redirect('/')
    return
  }

  const privilegeID = validateInput(req.query.privilegeID)
  if (privilegeID == null) {
    res.redirect('/')
    return
  }

  const accountID = req.user.profile.accountID

  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkOwner(?,?)', [ accountID, setID ], function (error, result, fields) {
      if (error) throw error

      if (result[0][0] == null) { // do not have access to set or does not exist
        res.redirect('/')
        connection.end()
        return
      }

      connection.query('CALL deletePrivileges(?)', privilegeID, function (error, result, feilds) {
        if (error) throw error

        res.redirect('/set/?setID=' + setID)
        connection.end()
      })
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
