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

  connection.connect(function(err) {
    if (err) throw err
    const user = req.user.profile

    if (user.type != 'admin') {
      res.redirect('/')
      return
    }

    connection.query('CALL getAccounts(?)', user.accountID, function (error, result, fields) {
      if (error) throw error

      res.render('account', { data : { accounts : result[0] }})
      connection.end()
    })
  })
})

module.exports = router
