require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Unavailable at this time.");
});

app.listen(3000, () => {
  console.log("Hosted at port 3000");
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag + ".")
})

client.login(process.env.token);
