import { createServerFn } from "@tanstack/start";
export type WaitlistProps = {
  email: string;
  name: string;
};
export type TrackResponse = {
  success: boolean;
  contact: string;
  event: string;
  timestamp: string;
};
async function _joinWaitlist({email, name}: WaitlistProps): Promise<TrackResponse> {
  const TRACK_EVENT_URL = `${process.env.PLUNK_API_URL}/track`
  try {
    const response = await fetch(TRACK_EVENT_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.PLUNK_API_SK}`,
      },
      body: JSON.stringify({
        event: "join-waitlist",
        email: email,
        subscribed: true,
        data: {
          name,
        }
      }),
    });

    if (response.ok) {
      return (await response.json()) as TrackResponse;
    }

    // Something went wrong with the request
    // TODO: implement a re-try mechanism with effect/platform
    throw new Error("Request could not be completed");
  } catch (err: any) {
    console.log(err.message, ":::error_subscribeEmail");
    throw new Error(err.message ?? err.toString());
  }
}


export const joinWaitlist = createServerFn("POST", async ({name, email}:WaitlistProps) => {
  "use server"
  await _joinWaitlist({name, email});
});


