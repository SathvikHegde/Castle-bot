const mongoose = require('mongoose');
const level = require('../models/level.js')

module.exports = {
    name: 'resetlevels',
    alias: ['resetpoints'],
    description: "reset everyone's points",
    execute(message, args, cmd, client, Discord){
        if(message.channel.id == '799987917065682964'){
            level.deleteMany({ serverID: '799971756772818964' }, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
              message.reply('Sucessfully rested the database.');
            });
        } else {
            return message.reply('You dont have the permission to do this');
        }     
    }
}