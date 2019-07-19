const express = require('express')
const router = express.Router()

// const parser = require('body-parser')
// parser.json()
// parser.urlencoded({extended : false})

var mysql = require('mysql')
var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  const connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  });

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL getCourseHistory(?)', user.userId, function (error, result, fields) {
      if (error) throw error

      result[0].forEach(function(row) {
        if (row.CourseStatus == 'enrolled') {
          row.CourseStatus = 'Enrolled'

        } else if (row.CourseStatus == 'passed') {
          row.CourseStatus = 'Passed'

        }
      })
      res.render('account', { data : { name: user.name, courses: result[0]}})
      connection.end()
    })
  })
})

module.exports = router
