const { connect, StringCodec } = require("nats");
const config = require("./config");

let nc = null;
const sc = StringCodec();

const connectToNats = async () => {
  try {
    nc = await connect({ servers: config.natsUri });
    console.log(`connected to ${nc.getServer()}`);
  } catch (err) {
    console.error(`error connecting to ${config.natsUri}: ${err}`);
  }
};

const publishAddTodo = async (todo) => {
  try {
    const message = JSON.stringify({ type: "add", todo: todo.todo });
    await nc.publish("todo", sc.encode(message));
    console.log(`published add: ${message}`);
  } catch (err) {
    console.error(`error publishing todo: ${err}`);
  }
};

const publishModifyTodo = async (todo) => {
  try {
    const message = JSON.stringify({ type: "modify", todo: todo.todo });
    await nc.publish("todo", sc.encode(message));
    console.log(`published modify: ${message}`);
  } catch (err) {
    console.error(`error publishing todo: ${err}`);
  }
};

module.exports = {
  connectToNats,
  publishAddTodo,
  publishModifyTodo,
};
