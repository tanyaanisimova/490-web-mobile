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

  const privilegeID = validateInput(req.query.privilegeID)
  const accountID = req.user.profile.accountID

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkOwner(?,?)', [ accountID, setID ], function (error, result, fields) {
      if (error) throw error

      if (result[0][0] == null) { // do not have access to set or does not exist
        res.redirect('/')
        connection.end()
        return
      }

      connection.query('CALL getStackName(?)', setID, function (error, result, fields) {
        if (error) throw error

        if (result[0][0] == null) { // no name?!?
          res.redirect('/')
          connection.end()
          return
        }

        const setName = result[0][0].StackName

        if (privilegeID == null) {
          res.render('submitPrivilege', { data :
            { setID: setID, setName: setName,
            privileges: [ false, false, false ]}})
          connection.end()
          return
        }

        connection.query('CALL getPrivilegeEmail(?)', privilegeID, function (error, result, fields) {
          if (error) throw error

          if (result[0][0] == null) { // no user?!?
            res.redirect('/')
            connection.end()
            return
          }

          const email = result[0][0].Email

          connection.query('CALL getUserPrivileges(?)', privilegeID, function (error, result, fields) {
            if (error) throw error

            if (result[0][0] == null) { // no contents?!?
              res.redirect('/')
              connection.end()
              return
            }

            owner = false
            copy = false
            view = false

            const privilegeID = result[0][0].PrivilegeID

            for (var i = 0; i < result[0].length; i++) {
              if (result[0][i].PrivilegeType.localeCompare('view') == 0) {
                view = true
              } else if (result[0][i].PrivilegeType.localeCompare('copy') == 0) {
                copy = true
              } else if (result[0][i].PrivilegeType.localeCompare('owner') == 0) {
                owner = true
              }
            }

            var privileges = [ owner, copy, view ]

            res.render('submitPrivilege', { data :
              { setID: setID, email: email,
                setName: setName, privileges: privileges,
                privilegeID: privilegeID }})
            connection.end()
          })
        })
      })
    })
  })
})

router.post('/', (req, res) => {
  const postBody = req.body

  var setID = postBody.setID
  if (setID.trim() === 0 | !setID.trim()) {
    res.redirect('dashboard')
  }

  var privilegeID = postBody.privilegeID
  if (privilegeID.trim() === 0 | !privilegeID.trim()) {
    privilegeID = null
  }

  const setName = postBody.setName
  const email = postBody.email.trim()
  var owner = postBody.owner
  var copy = postBody.copy
  var view = postBody.view

  owner = (owner ? true : false)
  copy = (copy ? true : false)
  view = (view ? true : false)
  var privileges = [ owner, copy, view ]

  var isEmailEmpty = (email.trim() === 0 | !email.trim())
  var isPrivilegesEmpty = (!owner && !copy && !view)

  if (isEmailEmpty || isPrivilegesEmpty) {
    if (privilegeID == null) {
      res.render('submitPrivilege', { data :
        { setID: setID, setName: setName,
          isEmailEmpty: isEmailEmpty, isPrivilegesEmpty: isPrivilegesEmpty,
          email: email, privileges: privileges }})
    } else {
      res.render('submitPrivilege', { data :
        { setID: setID, privilegeID: privilegeID, setName: setName,
          isEmailEmpty: isEmailEmpty, isPrivilegesEmpty: isPrivilegesEmpty,
          email: email, privileges: privileges }})
    }
    return
  }

  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    if (privilegeID == null) {
      if (req.user.profile.email.toLowerCase() == email.toLowerCase()) {
        res.render('submitPrivilege', { data :
          { setID: setID, setName: setName,
            email: email, privileges: privileges,
            isYou: true }})
        connection.end()
        return
      }

      connection.query('CALL getAccountID(?)', email, function (error, result, feilds) {
        if (error) throw error

        if (result[0][0] == null) {
          res.render('submitPrivilege', { data :
            { setID: setID, setName: setName,
              email: email, privileges: privileges,
              isInvalid: true }})
          connection.end()
          return
        }

        const userID = result[0][0].AccountID

        connection.query('CALL addPrivileges(?,?,?,?,?)', [ userID, setID, owner, copy, view ], function (error, result, feilds) {
          if (error) throw error

          res.redirect('/set/?setID=' + setID)
        })
      })

    } else {
      connection.query('CALL updatePrivileges(?,?,?,?)', [ privilegeID, owner, copy, view], function (error, result, feilds) {
        if (error) throw error

        res.redirect('/set/?setID=' + setID)
      })
    }
    connection.end()
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
