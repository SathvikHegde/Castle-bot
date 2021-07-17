const mongoose = require('mongoose');
const level = require('../models/level.js');

module.exports = {
    name: 'level',
    alias: ['lvl','points','pts','point'],
    description: "view your current weekly points or view somebody else's points",
    execute(message, args, cmd, client, Discord){
        let target = message.mentions.users.first() || message.author;
        level.findOne({
            userID: target.id,
        }, (err, res) => {
            if(err) console.log(err);
            if(!res){
                message.channel.send(`Hey! It looks like ${target.username} hasn't talked in this server before.`)
            }else{
                const embed = new Discord.MessageEmbed()
                .setDescription(`**${target.username}'s** has ${res.points} points.`)
                .setColor('BLURPLE')
                message.channel.send(embed);
            }
      })
    }
}