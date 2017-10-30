//CORE NODE
const path = require('path')

//NPM LIBS
const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const couchbase = require('couchbase')
const bodyParser = require('body-parser')
const passport = require('passport')
const hbs = require('express-hbs')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const i18n = require('i18n')

const cluster = new couchbase.Cluster('couchbase://localhost')
const bucket = cluster.openBucket('travel-sample')

//PROYECT FILES
const routes = require('./config/routes')



const app = express()
require('./config/passport')()

//Don't use logger for test env
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(compression({
  filter: (req, res) => (/json|text|javascript|css/.test(res.getHeader('Content-Type'))),
  level: 6
}))
//app.use(favicon(path.join(__dirname, 'app/_public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '_public')))

app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'app/partials'),
  layoutsDir: path.join(__dirname, 'app/layouts'),
  beautify: true
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'app'))

// register hbs helpers in res.locals' context which provides this.locale
hbs.registerHelper('__', function () {
  return i18n.__.apply(this, arguments);
});
hbs.registerHelper('__n', function () {
  return i18n.__n.apply(this, arguments);
});

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['es', 'en'],

  // you may alter a site wide default locale
  defaultLocale: 'es',

  // sets a custom cookie name to parse locale settings from
  cookie: 'locale',

  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
  queryParameter: 'locale',

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locale'
});

app.use(cookieParser('4Fhl5#jkqhFlj%$3fhZj%&qaTEnblrnb'));
app.use(session({
  secret: '^Uncg8m$GWy55s`GiIK%zGfTy;{>4,=E"1>SklslKz_bj\8k@{=GjLkNnT+%',
  resave: false,
  saveUninitialized: false
  /* store: new mongoStore({
    db: db.connection.db,
    collection: 'sessions'
  }) */
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
/*
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(flash());
*/

app.use(i18n.init);
app.use('/', routes)


app.use((req, res, next) => {
  req.isMobile = /mobile/i.test(req.header('user-agent'))

  console.log(res.render)

  next()
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