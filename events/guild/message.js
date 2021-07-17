const mongoose = require('mongoose');
const level = require("../../models/level.js");
let precommand;
let preresponse;

module.exports = (Discord, client, message) => {
    const prefix = '-';

    if(message.author.bot || message.channel.type == 'dm') return;

    if(message.channel.id != '799979133693067315' && message.channel.id != '821781384934457384'){
        let points;
        if(message.content.length <= 50) points = 1;
        if(message.content.length > 50) points = 2;
        if(message.content.length > 100) points = 5;
        if(message.content.length > 200) points = 10;
        if(message.content.length > 500) points = 20;
        
        level.findOne({
          userID: message.author.id,
          userName: message.author.username
        }, (err, res) => {
          if(err) console.log(err);
  
          if(!res){
            const newDoc = new level({
              userID: message.author.id,
              userName: message.author.username,
              serverID: message.guild.id,
              points: 0
            })
            newDoc.save().catch(err => console.log(err));
          }else{
            res.points = res.points + points;
            res.save().catch(err => console.log(err))
          }
        });
    }

    if(message.channel.id == '834374327620468746' || message.channel.id == '826567367001243708') {
        cleverbot(message.content, [precommand, preresponse]).then(response => {
            message.channel.send(response);
            console.log(precommand);
            console.log(preresponse);
            console.log(message.content);
            console.log(response);
            precommand = message.content;
            preresponse = response;
        });
    }

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.alias && a.alias.includes(cmd));

    try{
        if(command) command.execute(message, args, cmd, client, Discord);
    } catch (err){
        message.reply("ERROR! Something went wrong. Tell <@531358468989517856> to fix his code.");
        console.log(err);
    }

}
