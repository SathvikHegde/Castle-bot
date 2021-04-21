const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("./cleverbot-free-master/index.js");

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', message =>{
    if(message.author.bot) return;

    if(message.channel.id != '834374327620468746') return;
 
        cleverbot(message.content).then(response => message.channel.send(response));
});

client.login(process.env.token);