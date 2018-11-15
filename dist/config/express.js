"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var routes_1 = require("./routes");
var df = require("dateformat");
var cors = require("cors");
var winston = require('winston');
require("reflect-metadata");
require("es6-shim");
var Express = (function () {
    /*--------  Constructor  --------*/
    function Express() {
        this.envFile = 'src/env/.env';
        // ENV
        this.setEnv();
        // Mongo
        // Start App
        this.app = express();
        // Set view engine
        this.setViewEngine();
        // Middleware
        this.setMiddleware();
        // Set static files
        this.setStaticFiles();
        // Routes
        this.setRoutes();
        winston.debug('*****   Server Started and Ready to go.   *****');
    }
    /*--------  Methods  --------*/
    /**
     * Set env
     * Set env from .env or .env.${NODE_ENV} file using dotenv
     */
    Express.prototype.setEnv = function () {
        // Add NODE_ENV to path if is not production
        switch (process.env.NODE_ENV) {
            case 'local':
                this.envFile += '.local';
                break;
            case 'development':
                this.envFile += '.dev';
                break;
            case 'production':
                this.envFile += '.prod';
                break;
            default:
                this.envFile += '.local';
                break;
        }
        console.log('NODE_ENV: ' + process.env.NODE_ENV);
        // Set env from file
        dotenv.config({ path: this.envFile });
    };
    /**
     * Connect to mongo
     */
    /**
     * Set view engine
     */
    Express.prototype.setViewEngine = function () {
        // Configure ejs as view engine
        this.app.set('views', path.join(__dirname, '../../src/views'));
        this.app.set('view engine', 'ejs');
    };
    /**
     * Set middleware
     */
    Express.prototype.setMiddleware = function () {
        // Add logging
        // Since logger only returns a UTC version of date, I'm defining my own date format
        logger.format('mydate', function () {
            return df(new Date(), 'dd-mmm-yyyy HH:MM:ss.l');
        });
        this.app.use(logger('[:mydate] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));
        // Add body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Add cookie parser
        this.app.use(cookieParser());
        // Configure the winston logger
        winston.level = process.env.WINSTON_LOGGING_LEVEL || 'debug';
        winston.remove(winston.transports.Console);
        winston.add(winston.transports.Console, {
            'timestamp': function () {
                return df(new Date(), '[dd-mmm-yyyy HH:MM:ss.l]');
            }, 'colorize': true
        });
        winston.debug('Logging level is set to ::', winston.level);
        // Configure cors
        var corsOptions = {
            'origin': '*',
            'methods': ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
            'allowedHeaders': ['Content-Type', 'Authorization']
        };
        this.app.use(cors(corsOptions));
        // Use only custom overriding handlers and middlewares below this methodOverride line
        // this.app.use(methodOverride());
        // this.app.use(validationError);
        process.on('exit', function (code) {
            winston.error("About to exit with code: " + code);
        });
        process.on('unhandledRejection', function (reason, p) {
            winston.error('Unhandled Rejection at: Promise', p, ' reason: ', reason);
        });
        process.on('uncaughtException', function (err) {
            winston.error('Caught Exception', err);
        });
    };
    /**
     * Set static files
     */
    Express.prototype.setStaticFiles = function () {
        // Set static route for public folder
        this.app.use(express.static(path.join(__dirname, '../../src/public')));
    };
    /**
     * Set routes
     */
    Express.prototype.setRoutes = function () {
        // Create Routes, and export its configured Express.Router
        new routes_1.default(this.app);
    };
    return Express;
}());
exports.Express = Express;
exports.default = new Express().app;
//# sourceMappingURL=express.js.map