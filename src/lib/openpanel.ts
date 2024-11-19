import { OpenPanel } from "@openpanel/sdk";

const op = new OpenPanel({
  clientId: process.env.OPENPANEL_CLIENT_ID!,
  clientSecret: process.env.OPENPANEL_CLIENT_SECRET!,
});

op.setGlobalProperties({
  app_version: "0.0.5",
  environment: process.env.NODE_ENV ?? process.env.VERCEL_ENV ?? 'production',
});

export  { op };
