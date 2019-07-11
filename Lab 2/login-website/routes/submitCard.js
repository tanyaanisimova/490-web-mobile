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

  const cardID = validateInput(req.query.cardID)

  const accountID = req.user.profile.accountID

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkOwnerPermissions(?,?)', [ accountID, setID ], function (error, result, fields) {
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

        if (cardID == null) {
          res.render('submitCard', { data : { setID: setID, setName: setName }})
          connection.end()
          return
        }

        connection.query('CALL getCardContents(?)', cardID, function (error, result, fields) {
          if (error) throw error

          if (result[0][0] == null) { // no contents?!?
            res.redirect('/')
            connection.end()
            return
          }

          res.render('submitCard', { data :
            { setID: setID, cardID: cardID, setName: setName,
              term: result[0][0].Term, definition: result[0][0].Definition }})
          connection.end()
        })
      })
    })
  })
})

router.post('/', (req, res) => {
  const postBody = req.body
  const setID = postBody.setID
  var cardID = postBody.cardID
  if (cardID.trim() === 0 | !cardID.trim()) {
    cardID = null
  }
  const setName = postBody.setName
  const term = postBody.term.trim()
  const definition = postBody.definition.trim()

  var isTermEmpty = (term.trim() === 0 | !term.trim())
  var isDefinitionEmpty = (definition.trim() === 0 | !definition.trim())

  if (isTermEmpty || isDefinitionEmpty) {
    if (cardID == null) {
      res.render('submitCard', { data :
        { setID: setID, setName: setName,
          isTermEmpty: isTermEmpty, isDefinitionEmpty: isDefinitionEmpty,
          term: term, definition: definition }})

    } else {
      res.render('submitCard', { data :
        { setID: setID, cardID: cardID, setName: setName,
          isTermEmpty: isTermEmpty, isDefinitionEmpty: isDefinitionEmpty,
          term: term, definition: definition }})
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

    connection.query('CALL getCardID(?,?)', [ term, setID ], function (error, result, feilds) {
      if (error) throw error

      if (cardID == null) {
        if (result[0][0] != null) { // TODO: when not matching ids
          res.render('submitCard', { data :
            { setID: setID, setName: setName,
              isDuplicate: true,
              term: term, definition: definition }})
          connection.end()
          return
        }

        connection.query('CALL addCard(?,?,?)', [ setID, term, definition ], function (error, result, feilds) {
          if (error) throw error

          res.redirect('/set/?setID=' + setID)
        })

      } else {
        if (result[0][0] != null) {
          if (result[0][0].CardID != cardID) {
            res.render('submitCard', { data :
              { setID: setID, cardID: cardID,
                setName: setName, isDuplicate: true,
                term: term, definition: definition }})
            connection.end()
            return
          }
        }

        connection.query('CALL updateCard(?,?,?)', [ cardID, term, definition ], function (error, result, feilds) {
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
