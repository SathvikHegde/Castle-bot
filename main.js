const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot-free");

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', message =>{
    if(message.author.bot) return;

    if(!message.channel.id == '834374327620468746') return;
 
    if(message.content){
        cleverbot(message.content).then(response => message.channel.send(response));
    } 
});

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});

server.listen(3000);
 
client.login(process.env.token);