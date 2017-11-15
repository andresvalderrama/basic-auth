// CORE NODE
const path = require('path')

// NPM LIBS
const dotenv = require('dotenv')
const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const passport = require('passport')
const hbs = require('express-hbs')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const i18n = require('i18n')
const i18nConfig = require('./config/i18n')

// ROUTES
const routes = require('./config/routes')
const amnesiaRouter = require('./app/amnesia/router')

const app = express()
dotenv.config()
require('./config/passport')()

// Don't use logger for test env
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

app.use(compression({
  filter: (req, res) => (/json|text|javascript|css/.test(res.getHeader('Content-Type'))),
  level: 6
}))
// app.use(favicon(path.join(__dirname, 'app/_public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '_public')))

app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'app/partials'),
  layoutsDir: path.join(__dirname, 'app/layouts'),
  beautify: true,
  i18n: i18n
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'app'))

i18n.configure(i18nConfig)

app.use(cookieParser('4Fhl5#jkqhFlj%$3fhZj%&qaTEnblrnb'))
app.use(session({
  secret: '^Uncg8m$GWy55s`GiIK%zGfTy;{>4,=E"1>SklslKz_bj\8k@{=GjLkNnT+%',
  resave: false,
  saveUninitialized: false
  /* store: new mongoStore({
    db: db.connection.db,
    collection: 'sessions'
  }) */
}))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
/*
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(flash());
*/

app.use(i18n.init)
app.use('/', routes)
app.use('/', amnesiaRouter)

app.use((req, res, next) => {
  req.isMobile = /mobile/i.test(req.header('user-agent'))

  console.log(res.render)

  next()
})

// ERROR HANDLERS
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next()
  }
  res.send('403')
  res.send('from tampered with')
})
/*
var fs = require('fs')
app.use((err, req, res, next) => {
  res._render = res.render
  req.isMobile = /mobile/i.test(req.header('user-agent'))

  if (req.isMobile) {
    res.render = function (view, optioins, callback) {

    }
    res._render('home.mobile.ejs', {}, callback)
  }

  res.render = function (template, options, callback) {
    var view = template + '.mobile.' + req.app.get('view engine')
    var file = req.app.get('views') + '/' + view

    if (/mobile/i.test(ua) && fs.existsSync(file)) {
      res._render(view, locals, cb)
    } else {
      res._render(template, locals, cb)
    }
  }
  next()
})
*/

module.exports = app
