import { createAPIFileRoute } from "@tanstack/start/api";
import { createClerkClient } from "@clerk/backend";
import { json } from "@tanstack/start";

export const APIRoute = createAPIFileRoute('/api/clerk/webhook')({
  POST: async ({ request }) => {
    try {
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY || import.meta.env.CLERK_SECRET_KEY
      });


      console.log(request.body, 'request body');

      // const user = clerkClient.users.getUser()

      return json({
        success: true,
        data: {}
      });

    } catch (error: any) {
      throw new Error('Failed to process webhook event', {cause: error})
    }
  },
  GET: ({request}) => {
    console.log(request.url, ":::Get request of webhook");
    return json({
      success: true,
      data: null
    })
  }
})
