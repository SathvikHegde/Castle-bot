const mongoose = require('mongoose')
const level = require('../models/level.js')

module.exports = {
    name: 'weeklything',
    alias: [],
    description: "The Weekly Thing.....",
    execute(message, args, cmd, client, Discord){
        if(message.channel.id == '799987917065682964'){
            let embed = new Discord.MessageEmbed()
            .setTitle("**Weekly Leaderboard**");
    
            level.find({
                serverID: message.guild.id
              }).sort([
                ["points", "descending"]
              ]).exec((err, res) => {
                if(err) console.log(err);
            
                if(!res){
                  message.channel.send('This isnt supposed to happen. Fix your code PEEPEE!!')
                }else if(res.length < 10){
                  embed.setColor("BLURPLE");
                  for (i = 0; i < res.length; i++) {
                    if(i < 3){
                      let member = message.guild.members.fetch(res[i].userID) || "User Left";
                      if (member === "User Left") {
                        embed.addField(`:star2: ${i + 1}. ${member}`, `**Points**: ${res[i].points}`);
                      } else {
                        embed.addField(`:star2: ${i + 1}. ${res[i].userName}`, `**Points**: ${res[i].points}`);
                      }
                    }else{
                      let member = message.guild.members.fetch(res[i].userID) || "User Left";
                      if (member === "User Left") {
                        embed.addField(`:star: ${i + 1}. ${member}`, `**Points**: ${res[i].points}`);
                      } else {
                        embed.addField(`:star: ${i + 1}. ${res[i].userName}`, `**Points**: ${res[i].points}`);
                      }
                    }
                    
                  }
                }else{
                  embed.setColor("BLURPLE");
                  for (i = 0; i < 10; i++) {
                    if(i < 3){
                      let member = message.guild.members.fetch(res[i].userID) || "User Left";
                      if (member === "User Left") {
                        embed.addField(`:star2: ${i + 1}. ${member}`, `**Points**: ${res[i].points}`);
                      } else {
                        embed.addField(`:star2: ${i + 1}. ${res[i].userName}`, `**Points**: ${res[i].points}`);
                      }
                    }else{
                      let member = message.guild.members.fetch(res[i].userID) || "User Left";
                      if (member === "User Left") {
                        embed.addField(`:star: ${i + 1}. ${member}`, `**Points**: ${res[i].points}`);
                      } else {
                        embed.addField(`:star: ${i + 1}. ${res[i].userName}`, `**Points**: ${res[i].points}`);
                      }
                    }
                    
                  }
                }
                embed.setTimestamp();
    
                client.channels.cache.get("835225151787892766").send(embed);
                client.channels.cache.get("835225151787892766").send('https://static.wikia.nocookie.net/webtoon/images/b/bf/Blades_of_Furry_Banner_3.gif');
            
              })
        }else {
            return message.reply('You dont have the permission to do this')
        }
    
    }
}