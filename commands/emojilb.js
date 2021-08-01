const mongoose = require('mongoose');
const emoji = require('../models/emoji.js');

module.exports = {
    name: 'emojileaderboard',
    alias: ['emojilb','emotelb','emoteleaderboard'],
    description: "view the emote leaderboard",
    execute(message, args, cmd, client, Discord){
        let embed = new Discord.MessageEmbed()
            .setTitle("**Most used Emotes**")
            .setFooter(`Requested by ${message.author.username}`);

            emoji.find({
                serverID: message.guild.id
              }).sort([
                ["usage", "descending"]
              ]).exec((err, res) => {
                if(err) console.log(err);
            
                if(!res){
                  message.channel.send('No emotes here')
                }else if(res.length < 10){
                  embed.setColor("BLURPLE");
                  for (i = 0; i < res.length; i++) {
                    embed.addField(`${i + 1}. ${res[i].displaystring} ${res[i].emojiname}`, `**Usage**: ${res[i].usage}`);
                  }
                }else{
                  embed.setColor("BLURPLE");
                  for (i = 0; i < 10; i++) {
                    embed.addField(`${i + 1}. ${res[i].displaystring} ${res[i].emojiname}`, `**Usage**: ${res[i].usage}`);
                  }
                }
                embed.setTimestamp();
    
                message.channel.send(embed);
              })
    }
}