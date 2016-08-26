var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');

// Load environment variables from .env file
dotenv.config({ path: `${__dirname}/.env` });

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models
const User = require('./models/User');

// Controllers
const userController = require('./controllers/user');
const contactController = require('./controllers/contact');
const bookController = require('./controllers/book');
const tradeController = require('./controllers/trade');

// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/store/configureStore').default;

var app = express();

var compiler = webpack(config);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    const token =
    (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated();
    new User({ id: payload.sub })
      .fetch()
      .then((user) => {
        req.user = user;
        next();
      });
  } else {
    next();
  }
});

if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/auth/github', userController.authGithub);
app.get('/auth/github/callback', userController.authGithubCallback);

// API routes
// Books
app.get('/api/book', bookController.index);
app.get('/api/book/available', bookController.indexAvailable);
app.get('/api/book/me', userController.ensureAuthenticated, bookController.indexOwned);
app.get('/api/book/:id', bookController.show);
app.post('/api/book', bookController.create);
app.put('/api/book/:id', bookController.update);
app.delete('/api/book', bookController.remove);

// Trade
app.get('/api/trade', tradeController.index);
app.get('/api/trade/pending', userController.ensureAuthenticated, tradeController.showPending);
app.get('/api/trade/requests', userController.ensureAuthenticated, tradeController.showRequests);
app.get('/api/trade/completed', userController.ensureAuthenticated, tradeController.showCompleted);
app.get('/api/trade/:id', tradeController.show);
app.post('/api/trade', tradeController.create);
app.post('/api/trade/:tradeId/select-book/:bookId', tradeController.selectBook);
app.post('/api/trade/:id/approve', tradeController.approve);
app.put('/api/trade/:id', tradeController.update);
app.delete('/api/trade', tradeController.remove);


// React server rendering
app.use((req, res) => {
  const initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {},
  };

  const store = configureStore(initialState);

  Router.match({
    routes: routes.default(store),
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = ReactDOM.renderToString(React.createElement(Provider, { store },
        React.createElement(Router.RouterContext, renderProps)
      ));
      res.render('layout', {
        html,
        initialState: store.getState(),
      });
    } else {
      res.sendStatus(404);
    }
  });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// Set random port for concurrent tests.
if (app.get('env') === 'test') {
  app.set('port', null)
}

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
