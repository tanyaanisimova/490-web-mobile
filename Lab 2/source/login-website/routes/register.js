const express = require('express')
const router = express.Router()

const parser = require('body-parser')
parser.json()
parser.urlencoded({extended : false})

const mysql = require('mysql');
const sensitive = require('../sensitive.json');

router.post('/', (req, res) => {
  const postBody = req.body
  const email = postBody.email
  const password = postBody.password;
  const first = postBody.first
  const last = postBody.last;

  if (password.trim() === 0 | !password.trim() | email.trim() === 0 | !email.trim() | first.trim() === 0 |
      !first.trim() | last.trim() === 0 | !last.trim()) {
    renderView(res, false, true, email, first, last, password)
    return;
  }

  const connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  });

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL checkEmail(?)', [email], function (error, result, fields) {
      if (error) throw error

      if (result[0][0] != null) {
        renderView(res, true, false, email, first, last, password)
        connection.end()
        return
      }

      connection.query('CALL createAccount(?,?,?,?)', [email, first, last, password], function (error, result, fields) {
        if (error) throw error

        if (result[0][0] != null) {
          req.session.user = {name: first + " " + last, userId: result[0][0].AccountID}
          user = req.session.user
          res.redirect('/courses')

        } else {
          show(res, false, false)
        }

        connection.end()
      })
    })
  })
})

router.get('/', (req, res) => {
  show(res, false, false)
})

function show(res, isDuplicate, isInvalid) {
  renderView(res, isDuplicate, isInvalid, null, null, null, null)
}

function renderView(res, isDuplicate, isInvalid, email, first, last, password) {
  res.render('register', { data :
        { isDuplicate : isDuplicate , isInvalid: isInvalid,
          email: email, first: first,
          last: last, password: password
        }})
}

module.exports = router
