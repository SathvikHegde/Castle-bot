const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot-free");
 
const prefix = '-';

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const slicemessage = message.content.slice(prefix.length).split();
    const command = slicemessage.shift().toLowerCase();
 
    if(command){
        cleverbot(command).then(response => message.channel.send(response));
    } 
});

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});

server.listen(3000);
 
client.login(process.env.token);