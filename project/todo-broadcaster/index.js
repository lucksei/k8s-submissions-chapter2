const { connect, StringCodec } = require("nats");
const { WebhookClient, EmbedBuilder, inlineCode } = require("discord.js");

require("dotenv").config();

const config = {
  // port: process.env.PORT || 3002, // TODO: For adding a health check later...
  natsUri: process.env.NATS_URI || "",
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || "",
  forwardsToDiscord:
    process.env.FORWARDS_TO_DISCORD === "true" ? true : false || false,
};

// Discord webhook connection
const webhookClient = new WebhookClient({ url: config.discordWebhookUrl });

const main = async () => {
  const sc = StringCodec();
  try {
    // Connect to the NATS server
    const nc = await connect({ servers: config.natsUri });
    console.log(`connected to ${nc.getServer()}`);

    // Subscribe to the 'todo' subject and print messages to console
    const sub = nc.subscribe("todo", { queue: "todo-broadcaster" });
    console.log("Subscribed to todo. Waiting for messages...");

    for await (const m of sub) {
      const message = JSON.parse(sc.decode(m.data));
      console.log(`[${sub.getProcessed()}]: ${message.todo.todo}`);

      if (config.forwardsToDiscord) {
        // Create an embed
        const customEmbed = new EmbedBuilder(message);
        customEmbed.addFields({
          name: "Json content",
          value: `\`\`\`json\n${JSON.stringify(message, null, 2)}\n\`\`\``,
          inline: true,
        });
        switch (message.type) {
          case "add":
            customEmbed.setColor(0x00ff00);
            customEmbed.setTitle("Added todo");
            break;
          case "modify":
            customEmbed.setColor(0xffff00);
            customEmbed.setTitle("Modified todo");
            break;
        }

        // Send a message to Discord
        webhookClient.send({
          content: `Todo: '${message.todo.todo}'`,
          username: "Todo NATS Broadcaster",
          embeds: [customEmbed],
        });
      }
    }
  } catch (err) {
    console.error(`error connecting to ${config.natsUri}: ${err}`);
  }
};

main();
