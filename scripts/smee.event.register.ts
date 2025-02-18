import SmeeClient from "smee-client";

const smee = new SmeeClient({
  source: 'https://smee.io/T1FDZ00d0O5yoSBZ',
  target: 'http://localhost:3000/api/clerk/webhook',
  logger: console
});

const events = smee.events();
process.on("SIGINT", () => {
  events.close();
})
