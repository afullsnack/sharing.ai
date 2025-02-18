import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start';
import { Schema } from '@effect/schema';
import { getRequestHeaders, setHeaders } from '@tanstack/start/server';
import { loggerMiddleware } from '@/middleware/logger';
import { getWebRequest } from 'vinxi/http';
import { getAuth } from '@clerk/tanstack-start/server';


const FunctionInput = Schema.Struct({
  name: Schema.String,
  age: Schema.Number,
});
type IFunctionInput = typeof FunctionInput.Type;


const validate = createServerFn({ method: 'POST' })
  .middleware([loggerMiddleware])
  .handler(async () => {
    const {userId} = await getAuth(getWebRequest());
    if(!userId) {
      throw redirect({ to: '/' })
    }
    console.log(userId, ":::users id");
    return {
      userId,
    }
  })

// TODO: implement route guards
export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => validate(),
  loader: async ({context}) => {
    return {
      userId: context.userId
    }
  },
  errorComponent: ({ error }) => {
    if(error.message === 'Not authenticated') {
      return (
        <div className="flex items-center justify-center p-12">
          <pre>{JSON.stringify(error, null, 3)}</pre>
        </div>
      )
    }
    throw error;
  }
})
