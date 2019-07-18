const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const session = require('express-session')
//var mysql = require('mysql')

const homeRouter = require('./routes/home')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const coursesRouter = require('./routes/courses')
const accountRouter = require('./routes/account')
// const accountRouter = require('./routes/account')
// const publicRouter = require('./routes/public')
// const usersRouter = require('./routes/users')
// const setRouter = require('./routes/set')

const app = express()

let user;

const sensitive = require('./sensitive.json');

// var connection = mysql.createConnection({
//   host: sensitive.host,
//   user: sensitive.user,
//   password: sensitive.password,
//   database: sensitive.database
// })
//
// connection.connect(function(err) {
//   if (err) throw err
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: sensitive.secret,
  resave: true,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  if (!req.userContext) {
    return next()
  }

  // oktaClient.getUser(req.userContext.userinfo.sub)
  //   .then(user => {
  //     req.user = user
  //     res.locals.user = user
  //     if (user) {
  //       connection.query('CALL createAccount(?,?,?)', [ user.profile.email, user.profile.lastName, user.profile.firstName ], function (error) {
  //         if (error) throw error
  //
  //         connection.query('CALL getAccount(?)', [ user.profile.email ], function (error, result) {
  //           if (error) throw error
  //           var str = JSON.stringify(result[0])
  //           var json = JSON.parse(str)
  //           user.profile.accountID = json[0].AccountID
  //           user.profile.type = json[0].AccountType
  //           user.profile.status = json[0].AccountStatus
  //
  //           user.data = {}
  //           module.exports.user = user
  //           next()
  //         })
  //       })
  //     }
  //   }).catch(err => {
  //     next(err)
  //   })
})

// function loginRequired(req, res, next) {
//   if (!req.userContext) {
//     return res.status(401).render('unauthenticated')
//   }
//
//   if (req.user.profile.status.localeCompare('enabled') != 0) {
//     return res.status(401).render('disabled')
//   }
//
//   next()
// }

const auth = function (req, res, next) {
  if (req.session && req.session.user)
    return next();
  else
    return res.status(401).render('unauthenticated')
};

app.get('/test', (req, res) => {
  res.json({ profile: req.user ? req.user.profile : null })
})

app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/courses', auth, coursesRouter)
app.use('/account', auth, accountRouter)
// app.use('/account', auth, accountRouter)
// app.use('/users', auth, usersRouter)
// app.use('/set', auth, setRouter)

// app.use(express.static(path.join(__dirname, 'assets')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports.app = app
