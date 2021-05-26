const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot-free");
let precommand;
let preresponse;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', message =>{
    if(message.author.bot) return;
    
    if(message.channel.id != '834374327620468746' && message.channel.id != '826567367001243708') return;
 
    cleverbot(message.content, [precommand, preresponse]).then(response => {
        message.channel.send(response);
        console.log(precommand);
        console.log(preresponse);
        console.log(message.content);
        console.log(response);
        precommand = message.content;
        preresponse = response;
    });

});

client.login(process.env.token);