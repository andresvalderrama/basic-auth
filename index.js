const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const couchbase = require('couchbase')
const bodyParser = require('body-parser')

const cluster = new couchbase.Cluster('couchbase://localhost')
const bucket = cluster.openBucket('travel-sample')

const app = express()
require('./config/passport')()

//Don't use logger for test env
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(compression({
  filter: (req, res) => (/d/.test(res.getHeader('Content-Type'))),
  level: 6
}))
//app.use(favicon(path.join(__dirname, 'app/public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'app/public')))
app.set('views', path.join(__dirname, '../app'))
app.set('view engine', 'ejs')

/*
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({
  secret: '1337',
  store: new mongoStore({
    db: db.connection.db,
    collection: 'sessions'
  })
}));
app.use(flash());
*/

app.use(passport.initialize());
app.use(passport.session());


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

require('./config/routes')(app)

module.exports = app