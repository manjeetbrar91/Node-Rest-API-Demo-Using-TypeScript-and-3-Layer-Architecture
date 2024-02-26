import { logger } from '../../logs';

export const logRequestHandler = (req, res, next) => {
    const requestStart = Date.now();
    logger.info(`${Date.now()}, Request - ${req.method}:${req.url}, RequestBody - ${JSON.stringify(req.body)}`);

    res.on("finish", () => {
        logger.info(`${Date.now()}, ProcessingTime - ${Date.now() - requestStart}, Request - ${req.method}:${req.url}, ResponseStatus - ${res.statusCode}, ResponseMessage - ${res.statusMessage}`);
    });
    next();
}