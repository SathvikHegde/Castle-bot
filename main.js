const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot-free");
const mongoose = require('mongoose');
const level = require("./models/level.js");
let precommand;
let preresponse;

mongoose.connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', async message =>{
    if(message.author.bot) return;

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
            messages: 0
          })
          newDoc.save().catch(err => console.log(err));
        }else{
          res.messages = res.messages + 1;
          res.save().catch(err => console.log(err))
        }
      });
    
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

    if(message.channel.id == '799987917065682964' && message.content == '-weeklything'){
        let embed = new Discord.MessageEmbed()
        .setTitle("**Weekly Leaderboard**");

        level.find({
            serverID: message.guild.id
          }).sort([
            ["messages", "descending"]
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
                    embed.addField(`:star2: ${i + 1}. ${member}`, `**Messages**: ${res[i].messages}`);
                  } else {
                    embed.addField(`:star2: ${i + 1}. ${res[i].userName}`, `**Messages**: ${res[i].messages}`);
                  }
                }else{
                  let member = message.guild.members.fetch(res[i].userID) || "User Left";
                  if (member === "User Left") {
                    embed.addField(`:star: ${i + 1}. ${member}`, `**Messages**: ${res[i].messages}`);
                  } else {
                    embed.addField(`:star: ${i + 1}. ${res[i].userName}`, `**Messages**: ${res[i].messages}`);
                  }
                }
                
              }
            }else{
              embed.setColor("BLURPLE");
              for (i = 0; i < 10; i++) {
                if(i < 3){
                  let member = message.guild.members.fetch(res[i].userID) || "User Left";
                  if (member === "User Left") {
                    embed.addField(`:star2: ${i + 1}. ${member}`, `**Messages**: ${res[i].messages}`);
                  } else {
                    embed.addField(`:star2: ${i + 1}. ${res[i].userName}`, `**Messages**: ${res[i].messages}`);
                  }
                }else{
                  let member = message.guild.members.fetch(res[i].userID) || "User Left";
                  if (member === "User Left") {
                    embed.addField(`:star: ${i + 1}. ${member}`, `**Messages**: ${res[i].messages}`);
                  } else {
                    embed.addField(`:star: ${i + 1}. ${res[i].userName}`, `**Messages**: ${res[i].messages}`);
                  }
                }
                
              }
            }
            embed.setTimestamp();

            client.channels.get("818069197598359602").send(embed);
            client.channels.get("818069197598359602").send('https://static.wikia.nocookie.net/webtoon/images/b/bf/Blades_of_Furry_Banner_3.gif');
        
          })
    }

    if(message.channel.id == '799987917065682964' && message.content == '-resetlevels'){
      ProductModel.deleteMany({ serverID: '799971756772818964' }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        message.reply('Sucessfully rested the database.');
      });
    }  
 
    

});

client.login(process.env.token);