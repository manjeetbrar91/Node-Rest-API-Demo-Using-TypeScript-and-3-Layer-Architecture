import 'reflect-metadata';
import { App } from './app';
import { Config } from "./config/Config";
import { logger } from "./logs";

const port = Config.getInstance().getPort();

try {
    const demoApp = new App();
    const app = demoApp.app;
    app.listen(port, () => {
        logger.info("Express server listening on port %s", port);
    });

} catch (error) {
    logger.error(error, "caught exception while starting app message: %s", error.message);
    throw error;
}


