import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start';
import { Schema } from '@effect/schema';
import { getRequestHeaders, setHeaders } from '@tanstack/start/server';
import { loggerMiddleware } from '@/middleware/logger';


const FunctionInput = Schema.Struct({
  name: Schema.String,
  age: Schema.Number,
});
type IFunctionInput = typeof FunctionInput.Type;

const login = createServerFn({ method: "POST" })
  .validator(Schema.decodeSync(FunctionInput))
  .handler(async ({ data, method }) => {
    return data;
  });


const validate = createServerFn({ method: 'POST' })
  .validator((data: {name:string}) => data)
  .middleware([loggerMiddleware])
  .handler(async () => {
    const headers = getRequestHeaders();
    throw redirect({ to: '/' })
  })

// TODO: implement route guards
export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => validate({data: {name: 'Jef'}}),
  // loader: async () => await login({
  //   data: {
  //     name: 'afullsnack',
  //     age: 10,
  //   }
  // })
})
