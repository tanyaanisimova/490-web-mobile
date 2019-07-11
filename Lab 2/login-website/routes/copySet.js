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

      if (result[0][0] != null) { // already their set
        res.redirect('/')
        connection.end()
        return
      }

      connection.query('CALL getPrivileges(?,?)', [ accountID, setID ], function (error, result, fields) {
        if (error) throw error

        if (result[0][0] == null) { // do not have access to set or does not exist
          res.redirect('/')
          connection.end()
          return
        }

        var canCopy = false

        for (var i = 0; i < result[0].length; i++) {
          if (result[0][i].PrivilegeType.localeCompare('copy') == 0) {
            canCopy = true
            break
          }
        }

        if (canCopy) {
          connection.query('CALL getStackName(?)', setID, function (error, result, fields) {
            if (error) throw error

            if (result[0][0] == null) { // no name?!?
              res.redirect('/')
              connection.end()
              return
            }

            const setName = result[0][0].StackName

            connection.query('CALL getStackID(?,?)', [ accountID, setName ], function (error, result, feilds) {
              if (error) throw error

              if (result[0][0] != null) { // already have a set with same lastName
                res.render('copySet', { data : { setID : setID,
                  isDuplicate: true, setName : setName }})
                connection.end()
                return
              }

              copy(accountID, setID, setName, res)
            })
          })

        } else {
          res.redirect('/')
          connection.end()
        }
      })
    })
  })
})

router.post('/', (req, res) => {
  const accountID = req.user.profile.accountID
  const postBody = req.body
  var setID = postBody.setID
  const setName = postBody.setName
  if (postBody.newSetName.trim() === 0 | !postBody.newSetName.trim()) {
    res.render('copySet', { data : { isEmpty : true, setID: setID,
      setName: setName }})
    return
  }
  const newSetName = postBody.newSetName


  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL getStackID(?,?)', [ accountID, newSetName ], function (error, result, feilds) {
      if (error) throw error

      console.log(result[0][0])

      if (result[0][0] != null) { // retured a result -> duplicate
        res.render('copySet', {data : { isDuplicate : true, setID: setID,
          newSetName: newSetName, setName : setName }})
        connection.end()
        return
      }

      copy(accountID, setID, newSetName, res)
    })
  })
})

function copy(accountID, setID, newSetName, res) {
  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL addStack(?,?)', [ accountID, newSetName ], function (error, result, feilds) {
      if (error) throw error

      if (result[0][0] == null) { // did not return id?!?
        res.redirect('/')
        connection.end()
        return
      }

      const newSetID = result[0][0].StackID
      connection.query('CALL getStackContents(?)', setID, function (error, result, fields) {
        if (error) throw error

        var card
        for (var i = 0; i < result[0].length; i++) {
          card = result[0][i]
          connection.query('CALL addCard(?,?,?)', [ newSetID, card.Term, card.Definition ], function (error, result, feilds) {
            if (error) throw error
          })
        }

        res.redirect('/set/?setID=' + newSetID)
        connection.end()
      })
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
