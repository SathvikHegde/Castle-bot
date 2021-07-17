const mongoose = require('mongoose');
const level = require('../models/level.js');

module.exports = {
    name: 'leaderboard',
    alias: ['lb','top'],
    description: "view the current weekly leaderboard",
    async execute(message, args, cmd, client, Discord){

        let embed = new Discord.MessageEmbed()
            .setTitle("**Current Weekly Leaderboard**")
            .setFooter(`Requested by ${message.author.username}`);

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
    
                message.channel.send(embed);
              })
    }
}