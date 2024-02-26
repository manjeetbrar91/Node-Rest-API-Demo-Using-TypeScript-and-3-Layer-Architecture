# Development Guidelines

## How to use logger

```TypeScript
import { logger } from "./logs";
logger.info("Express server listening on port %s", port);
logger.warn("name: %s order %j", "name", SomeOrderObject); -> %j will call JSON.stringfy() automatically
```

Read more about formats here <https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args>

## Visual Studio Code Extensions

See _Visual Studio Code Extensions_ section <https://dev.azure.com/Dedemo/Dedemo/_git/demo-environment?path=%2FDevelopment-Guidelines.md&version=GBmaster>
