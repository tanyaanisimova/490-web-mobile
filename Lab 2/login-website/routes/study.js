const express = require('express')
const router = express.Router()
const path = require('path')
var appuser = require('../app')

var mysql = require('mysql')
var sensitive = require('../sensitive.json')
var notecard_height = 462
var notecard_width = 284
var studying = false

router.get('/', (req, res) => {
    const setID = validateInput(req.query.setID)
    if (setID == null) {
      res.redirect('/')
      return
    }

    const accountID = req.user.profile.accountID

    if (!studying) {
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
                result[0] = result[0].sort((a,b)=>{return Math.random()-0.5})

                res.render('study', { data: { cards: result[0], setID: setID } })
                connection.end()
            })
        })
    }
})

router.post('/', (req, res) => {
  const postBody = req.body
  const setID = postBody.setID
  const total = parseInt(postBody.total)

  var connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  })

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL updateStatistic(?,?,?)', [ req.user.profile.accountID, setID, total ], function (error, result, feilds) {
      if (error) throw error
      res.redirect('/set/?setID=' + setID)
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

module.exports.router = router
