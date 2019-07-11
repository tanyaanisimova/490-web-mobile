const express = require('express')
const router = express.Router()

const parser = require('body-parser')
parser.json()
parser.urlencoded({extended : true})

var mysql = require('mysql')
var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  const setID = validateInput(req.query.setID)
  if (setID == null) {
    res.render('submitSet', {data : { isDuplicate : false }})
    return
  }

  const userID = req.user.profile.accountID

  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkOwner(?,?)', [ userID, setID ], function (error, result, fields) {
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

        res.render('submitSet', { data : { setID : setID, setName : setName }})
        connection.end()
      })
    })
  })
})

router.post('/', (req, res) => {
  const postBody = req.body
  var setID = postBody.setID
  if (setID.trim() === 0 | !setID.trim()) {
    setID = null
  }
  const setName = postBody.setName
  if (setName.trim() === 0 | !setName.trim()) {
    if (setID == null) {
      res.render('submitSet', { data : {isEmpty : true }})
    } else {
      res.render('submitSet', { data : {isEmpty : true, setID: setID }})
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

    const userID = req.user.profile.accountID
    connection.query('CALL getStackID(?,?)', [ userID, setName ], function (error, result, feilds) {
      if (error) throw error

      if (setID == null) {
        if (result[0][0] != null) { // retured a result -> duplicate
          res.render('submitSet', {data : { isDuplicate : true, setName : setName }})
          connection.end()
          return
        }

        connection.query('CALL addStack(?,?)', [ userID, setName ], function (error, result, feilds) {
          if (error) throw error

          res.redirect('/set/?setID=' + result[0][0].StackID)
        })

      } else {
        if (result[0][0] != null) {
          if (result[0][0].StackID != setID) {
            res.render('submitSet', {data :
              { isDuplicate : true, setName : setName, setID : setID }})
            connection.end()
            return
          }
        }

        connection.query('CALL updateStackName(?,?)', [ setID, setName ], function (error, result, feilds) {
          if (error) throw error
          res.redirect('/set/?setID=' + setID)
        })
      }
      connection.end()
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
