import { createAPIFileRoute } from "@tanstack/start/api";
import { createClerkClient } from "@clerk/backend";
import { json } from "@tanstack/start";

export const APIRoute = createAPIFileRoute('/api/clerk/webhook')({
  POST: async ({ request }) => {
    try {
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY || import.meta.env.CLERK_SECRET_KEY
      });

      const body = await request.json();
      console.log(body, 'request body');

      const isUserCreated = body?.data?.type === 'user.created';
      if (isUserCreated) {
        const userId = body?.data?.id;
        const user = await clerkClient.users.getUser(userId)
        console.log(user, ":::retrieved user");

        // TODO: send welcome email if user is new
        return json({
          success: true,
          data: user
        });

      }
        return json({
          success: true,
          data: null
        });


    } catch (error: any) {
      throw new Error('Failed to process webhook event', { cause: error })
    }
  },
  GET: ({ request }) => {
    console.log(request.url, ":::Get request of webhook");
    return json({
      success: true,
      data: null
    })
  }
})
