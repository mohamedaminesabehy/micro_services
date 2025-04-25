const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Eureka = require('eureka-js-client').Eureka;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const panierRouter = require('./routes/panier'); // Ajout du router panier

const app = express();

// 🔌 Connexion à MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/panierDB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB:', mongoURI))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// 🌐 Configuration Eureka Client
const PORT = process.env.PORT || 9095;
const eurekaHost = process.env.EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE || 'http://localhost:8761/eureka';
const hostName = process.env.HOSTNAME || 'localhost';

// Extract host and port from Eureka URL
const eurekaUrl = new URL(eurekaHost);
const eurekaServerHost = eurekaUrl.hostname;
const eurekaServerPort = eurekaUrl.port ? parseInt(eurekaUrl.port, 10) : 8761;

// Eureka client configuration
const client = new Eureka({
  instance: {
    app: 'PANIER', // This must match lb://PANIER in the Gateway config
    hostName: hostName,
    ipAddr: hostName,
    port: {
      '$': PORT,
      '@enabled': true,
    },
    vipAddress: 'PANIER',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    statusPageUrl: `http://${hostName}:${PORT}/info`,
    healthCheckUrl: `http://${hostName}:${PORT}/health`,
    homePageUrl: `http://${hostName}:${PORT}`,
  },
  eureka: {
    host: eurekaServerHost,
    port: eurekaServerPort,
    servicePath: '/eureka/apps/',
    preferSameZone: false,
    registerWithEureka: true,
    fetchRegistry: true
  }
});

// 🚀 Start Eureka Client
client.start(error => {
  console.log(error || '✅ Enregistré avec Eureka');
});

// 🧠 View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// 🧩 Middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Health and info endpoints for Eureka
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/info', (req, res) => {
  res.json({
    app: 'panier-service',
    version: '1.0.0',
    status: 'running'
  });
});

// 📦 Routes
app.use('/users', usersRouter);

// Remove or comment out this line if present:
// app.use('/panier', panierRouter);

// Mount panierRouter at root:
app.use('/', panierRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// 💥 Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  }

  res.render('error');
});

// Graceful shutdown
process.on('SIGINT', () => {
  client.stop();
  console.log('Désenregistrement d\'Eureka et arrêt de l\'application');
  process.exit();
});

module.exports = app;