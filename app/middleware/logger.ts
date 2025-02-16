import { createMiddleware } from "@tanstack/start"

const loggerMiddleware = createMiddleware()
  .server(async ({ next, data, context }) => {
    console.log('[INFO]', JSON.stringify(
      data,
      null,
      3
    ));

    return next({
      context,
    });
  });

export {
  loggerMiddleware
}
