const express = require('express')
const router = express.Router()

const parser = require('body-parser')
parser.json()
parser.urlencoded({extended : false})

var mysql = require('mysql')
var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  const setID = validateInput(req.query.setID)
  if (setID == null) {
    res.redirect('/')
    return
  }

  const userID = req.user.profile.accountID

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkOwner(?,?)', [userID, setID] , function (error, result, fields) {
      if (error) throw error

      const isOwner = (result[0][0] != null)

      if (isOwner) {
        show(isOwner, isOwner, !isOwner, setID, res)
        connection.end()
        return
      }

      connection.query('CALL getPrivileges(?,?)', [ userID, setID ], function (error, result, fields) {
        if (error) throw error

        if (result[0][0] == null) { // do not have access to set or does not exist
          res.redirect('/')
          connection.end()
          return
        }

        var canModify = false
        var canCopy = false

        for (var i = 0; i < result[0].length; i++) {
          if (result[0][i].PrivilegeType.localeCompare('copy') == 0) {
            canCopy = true
          }
          if (result[0][i].PrivilegeType.localeCompare('owner') == 0) {
            canModify = true
          }
        }

        show(isOwner, canModify, canCopy, setID, res)
        connection.end()
      })
    })
  })
})

function show(isOwner, canModify, canCopy, setID, res) {
  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err
    connection.query('CALL getStackContents(?)', setID, function (error, result, fields) {
      if (error) throw error

      var contents = result[0]

      //TODO: check this
      if (isOwner) {
        connection.query('CALL getStackPrivileges(?)', setID, function (error, result, fields) {
          if (error) throw error

          var privilegeRS = []
          var privileges
          var id = -1
          for (var i = 0; i < result[0].length; i++) {
            if (id == -1 || id != result[0][i].PrivilegeID) {
              id = result[0][i].PrivilegeID
              privileges = []
              privileges.push(result[0][i].PrivilegeType)
              privilegeRS.push({ privilegeID: id, email: result[0][i].Email, privileges: privileges })
            } else {
              privileges.push(result[0][i].PrivilegeType)
            }
          }

          res.render('set', { data : { setID: setID, contents: contents,
            isOwner: isOwner, canModify: canModify, canCopy: canCopy,
            privileges: privilegeRS }})
        })

      } else {
        res.render('set', { data : { setID: setID, contents: contents,
        isOwner: isOwner, canModify: canModify, canCopy: canCopy }})
      }
      connection.end()
    })
  })
}

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
