const express = require('express')
const router = express.Router()

// const parser = require('body-parser')
// parser.json()
// parser.urlencoded({extended : false})

// var mysql = require('mysql')
// var sensitive = require('../sensitive.json')

router.get('/', (req, res) => {
  // var connection = mysql.createConnection({
  //   host: sensitive.host,
  //   user: sensitive.user,
  //   password: sensitive.password,
  //   database: sensitive.database
  // })

  // connection.connect(function(err) {
  //   if (err) throw err
  //   const user = req.user.profile
  //
  //   connection.query('CALL getStacks(?)', user.accountID, function (error, result, fields) {
  //     if (error) throw error
  //     var setRS = result[0]
  //
  //     connection.query('CALL getSharedStacks(?)', user.accountID, function (error, result, fields) {
  //       if (error) throw error
  //       var sharedSetRS = result[0]
  //
  //       res.render('home', { data :
  //         { firstName : user.firstName,
  //           sets : setRS,
  //           sharedSets : sharedSetRS }})
  //
  //       connection.end()
  //     })
  //   })
  // })

  res.render('account')
})

module.exports = router
