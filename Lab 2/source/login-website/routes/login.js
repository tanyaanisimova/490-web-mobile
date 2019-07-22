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

  // check for invalid inputs
  if (password.trim() === 0 | !password.trim() | email.trim() === 0 | !email.trim()) {
    show(res, true)
    return;
  }

  //sensitive db connection details stored outside source code
  const connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  });

  connection.connect(function(err) {
    if (err) throw err

    // stored procedures for safety
    connection.query('CALL getAccount(?,?)', [email, password], function (error, result, fields) {
      if (error) throw error

      if (result[0][0] != null) {
        // store user information in session
        req.session.user = {name: result[0][0].FirstName + " " + result[0][0].LastName , userId: result[0][0].AccountID}
        user = req.session.user
        res.redirect('/courses')

      } else { //incorrect login information given
        show(res, true)
      }

      connection.end()
    })
  })
})

router.get('/', (req, res) => {
  show(res, false)
})

function show(res, isInvalid) {
  res.render('login', { data : { isInvalid : isInvalid }})
}

module.exports = router
