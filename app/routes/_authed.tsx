import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start';
import { Schema } from '@effect/schema';


const FunctionInput = Schema.Struct({
  name: Schema.String,
  age: Schema.Number,
});
type IFunctionInput = typeof FunctionInput.Type;

const login = createServerFn({ method: "POST" })
  .validator(Schema.decodeSync(FunctionInput))
  .handler(async ({data, method}) => {
    return data;
  });

// TODO: implement route guards
export const Route = createFileRoute('/_authed')({
  beforeLoad: () => {
    const isFalse = Math.random() * 100
    if (isFalse) {
      console.log('You are unauthorized to access this page');
      throw redirect({ to: '/' })
    }
  },
  loader: async () => await login({
    data: {
      name: 'afullsnack',
      age: 10,
    }
  })
})
