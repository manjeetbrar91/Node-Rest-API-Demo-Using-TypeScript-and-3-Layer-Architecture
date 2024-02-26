import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { logger } from '../../logs';

@Middleware({ type: "after" })
export class LoggingErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err?: any) => any) {
        logger.error("Caught error while processing request error: %j stack trace:%s", error, error.stack);
        next();
    }

}