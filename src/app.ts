import * as bodyParser from "body-parser";
import "class-transformer";
import * as cors from "cors";
// import { MongoDBManager } from "db-layer/implementations/implementations/MongoDBManager";
import * as express from "express";
import * as expressWinston from "express-winston";
import * as expressWs from 'express-ws';
import "reflect-metadata"; // this is required
import { useExpressServer } from "routing-controllers";
import * as winston from "winston";
import { Config } from "./config/Config";
import { DBManagerFactory } from "./db-layer/DataAccessLayerFactory";

import { MongoBusinessUserDBManager } from "db-layer/implementations/MongoBusinessCustomersDBManager";
import { MongoDBManager } from "./db-layer/implementations/MongoDBManager";
import { logger } from './logs';
import { ServiceFactory } from "./service-layer/ServiceFactory";
import { BusinessUsersService } from "./service-layer/implementations/BusinessUsersService";
import { AuthorizationChecker } from "./web-layer/middlewares/AuthorizationChecker";

import { logRequestHandler } from "./web-layer/middlewares/LoggingRequestHandler";


var multer = require('multer');
var forms = multer();

const upload = multer({ dest: 'uploads/xx/' }).single('avatar')


var compression = require('compression')

export class App {

  public app: express.Application;
  public appWs: expressWs.Instance;

  public mongoUrl: string;
  private routingControllersOptions = {};
  private publicRoutingControllersOptions = {};

  constructor() {
    logger.info('Loading server using configurations: %j', Config.getInstance());
    this.app = express();
    this.appWs = expressWs(this.app);
    this.mongoUrl = Config.getInstance().getMongoUrl();
    this.setup();
    // Once all services initialization done then bind on HTTP interface
    this.config();
  }

  private config(): void {

    // compress all responses
    this.app.use(compression())
    this.app.use(cors());
    this.app.options('*', cors());

    // support application/json type post data
    // this.app.use(multer);
    // this.app.use(forms.array());
    this.app.use(bodyParser.json());
    // this.app.use(upload);

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: true }));


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    const upload = multer({ storage })


    this.app.post('/profile', upload.single('avatar'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any

      console.log(req.file);

      res.json({ a: "a" })
    })

    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    if (Config.getInstance().isDevelopment()) {
      //winston HTTP Logger
      var requestLoggingFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' })
      );
      var requestLoggingTransport = new winston.transports.Console({
        format: requestLoggingFormat,
        handleExceptions: false,
      });

      // add logger to app
      this.app.use(expressWinston.logger({
        transports: [
          requestLoggingTransport
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
      }));

    }
    this.app.use(logRequestHandler);
    //API routers
    this.routingControllersOptions = {
      development: false,
      classTransformer: false,
      validation: {
        skipMissingProperties: false,
        whitelist: true
      },
      cors: true,
      routePrefix: "/",
      authorizationChecker: new AuthorizationChecker().check,
      currentUserChecker: new AuthorizationChecker().getCurrentUserClaims,
      defaults:
      {

        //with this option, null will return 404 by default
        nullResultCode: 404,

        //with this option, void or Promise<void> will return 204 by default 
        undefinedResultCode: 204,

        paramOptions: {
          //with this option, argument will be required by default
          required: true
        }
      },

      controllers: [__dirname + "/web-layer/controllers/*.ts"],
      middlewares: [__dirname + "/web-layer/middlewares/*.ts"]

    }
    useExpressServer(this.app, this.routingControllersOptions);


  }

  public getRoutingControllersOptions() {
    return this.routingControllersOptions;
  }

  private setup(): void {

    // create singleton instance of db and connect to database before starting app
    const dbManager: MongoDBManager = new MongoDBManager(this.mongoUrl);
    dbManager.connect();

    DBManagerFactory.setBusinessUsersDBManager(new MongoBusinessUserDBManager())

    ServiceFactory.setBusinessUsersService(new BusinessUsersService());

  }
}
