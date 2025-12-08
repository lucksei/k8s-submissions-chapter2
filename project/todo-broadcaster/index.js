const { connect, StringCodec } = require("nats");
require("dotenv").config();

const config = {
  // port: process.env.PORT || 3002, // TODO: For adding a health check later...
  natsUri: process.env.NATS_URI || "",
};

const main = async () => {
  const sc = StringCodec();
  try {
    // Connect to the NATS server
    const nc = await connect({ servers: config.natsUri });
    console.log(`connected to ${nc.getServer()}`);

    // Subscribe to the 'todo' subject and print messages to console
    const sub = nc.subscribe("todo", {});
    console.log("Subscribed to todo. Waiting for messages...");

    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
  } catch (err) {
    console.error(`error connecting to ${config.natsUri}: ${err}`);
  }
};

main();
