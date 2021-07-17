const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
require('dotenv').config();

const mongoose = require('mongoose');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

mongoose.connect(process.env.MongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.Token);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(20406);