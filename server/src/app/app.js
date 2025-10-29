const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const { default: helmet } = require('helmet');
const { mysqlConnect } = require('../databases/mysql/mysqlConnect');
const { mongodbConnect } = require('../databases/mongodb/mongodbConnect');
const router = require('../routes/route');
const errorHandler = require('../middlewares/errorHandler');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
// test


// config
require("dotenv").config();
require('express-async-handler');
require('../middlewares/passport');
// init middlewares
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:8000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(passport.initialize());
app.use(cookieParser());
app.use(useragent.express());

// init database
mysqlConnect();
mongodbConnect();

// init routers
app.use('/',router);

// init error handler
app.use(errorHandler);


module.exports = app;