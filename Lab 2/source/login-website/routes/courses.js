const express = require('express')
const router = express.Router()

// const parser = require('body-parser')
// parser.json()
// parser.urlencoded({extended : false})

const mysql = require('mysql');
const sensitive = require('../sensitive.json');

router.get('/', (req, res) => {
  const connection = mysql.createConnection({
    host: sensitive.host,
    user: sensitive.user,
    password: sensitive.password,
    database: sensitive.database
  });

  connection.connect(function(err) {
    if (err) throw err

    connection.query('CALL getCourses()', function (error, result, fields) {
      if (error) throw error

      courses = result[0]

      connection.query('CALL getCourseHistory(?)', user.userId, function (error, result, fields) {
        if (error) throw error

        let courseData = []

        courses.forEach(function(course) {
          courseData.push({CourseID: course.CourseID, Name: course.Name, CourseStatus: 'None'})
        })

        let resultData = courseData
        let index = 0
        courseData.forEach(function(course) {
          result[0].forEach(function(history) {
            if (history.CourseID === course.CourseID) {
              if (history.CourseStatus == 'enrolled') {
                history.CourseStatus = 'Enrolled'

              } else if (history.CourseStatus == 'passed') {
                history.CourseStatus = 'Passed'

              } else {
                history.CourseStatus = 'None'
              }
              resultData[index] = {CourseID: course.CourseID, Name: course.Name, CourseStatus: history.CourseStatus}
            }
          })
          index++
        })

        res.render('courses', { data : { courses: resultData}})
        connection.end()

      })
    })
  })
})

module.exports = router
