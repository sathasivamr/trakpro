import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import Routes from './routes';
import * as df from 'dateformat';
import * as cors from 'cors';
const winston = require('winston');
import { validationError } from '../middlewares/validation';
import 'reflect-metadata';
import 'es6-shim';
import * as methodOverride from 'method-override';

export class Express {

    public app: express.Express;
    private envFile = 'src/env/.env';

    /*--------  Constructor  --------*/

    constructor() {

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
    private setEnv() {

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
    }

    /**
     * Connect to mongo
     */
  

    /**
     * Set view engine
     */
    private setViewEngine() {

        // Configure ejs as view engine
        this.app.set('views', path.join(__dirname, '../../src/views'));
        this.app.set('view engine', 'ejs');
    }

    /**
     * Set middleware
     */
    private setMiddleware() {

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
            'timestamp': () => {
                return df(new Date(), '[dd-mmm-yyyy HH:MM:ss.l]');
            }, 'colorize': true
        });
        winston.debug('Logging level is set to ::', winston.level);

        // Configure cors
        let corsOptions = {
            'origin': '*',
            'methods': ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
            'allowedHeaders': ['Content-Type', 'Authorization']
        };
        this.app.use(cors(corsOptions));

        // Use only custom overriding handlers and middlewares below this methodOverride line
        // this.app.use(methodOverride());
        // this.app.use(validationError);

        process.on('exit', (code: number) => {
            winston.error(`About to exit with code: ${code}`);
        });

        process.on('unhandledRejection', (reason: any, p: any) => {
            winston.error('Unhandled Rejection at: Promise', p, ' reason: ', reason);
        });

        process.on('uncaughtException', (err: any) => {
            winston.error('Caught Exception', err);
        });
    }

    /**
     * Set static files
     */
    private setStaticFiles() {

        // Set static route for public folder
        this.app.use(express.static(path.join(__dirname, '../../src/public')));
    }

    /**
     * Set routes
     */
    private setRoutes() {

        // Create Routes, and export its configured Express.Router
        new Routes(this.app);
    }
}

export default new Express().app;