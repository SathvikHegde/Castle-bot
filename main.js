const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot-free");
const mongoose = require('mongoose');
const level = require("./models/level.js");
let precommand;
let preresponse;
const prefix = '-';

mongoose.connect(process.env.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', async message =>{
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

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

    if(message.channel.id == '799987917065682964' && message.content == '-weeklything'){
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
    }

    if(message.channel.id == '799987917065682964' && message.content == '-resetlevels'){
      level.deleteMany({ serverID: '799971756772818964' }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        message.reply('Sucessfully rested the database.');
      });
    }  

    if(command == 'bonk'){
      let bonker = message.author;
      let target = message.mentions.users.first() || message.author;
      let randomselect = Math.floor((Math.random() * 7) + 1);
      let gif;
      
      if(randomselect == 1){
        gif = 'https://media1.tenor.com/images/347f852d3dfa48502406fa949fcc1449/tenor.gif?itemid=15150394';
      }else if(randomselect == 2){
        gif = 'https://media1.tenor.com/images/c6571c335cd8e56de03ae05f81790efa/tenor.gif?itemid=20294899';
      }else if(randomselect == 3){
        gif = 'https://media1.tenor.com/images/79e0ed5c2ed5397fa79f48fccd6265d1/tenor.gif?itemid=20952854';
      }else if(randomselect == 4){
        gif = 'https://media1.tenor.com/images/dc4329d27745a6707219cb658f5b2c46/tenor.gif?itemid=18191826';
      }else if(randomselect == 5){
        gif = 'https://media1.tenor.com/images/119ca32322ba24e4ffc4f0d84a6839f1/tenor.gif?itemid=17402810';
      }else if(randomselect == 6){
        gif = 'https://media1.tenor.com/images/8cd54ee389b04a2366e85332125c5475/tenor.gif?itemid=20920340';
      }else if(randomselect == 7){
        gif = 'https://media1.tenor.com/images/cf9f90ce4ccca4fe6d82bb445ca4759e/tenor.gif?itemid=8229175';
      }

      const embed = new Discord.MessageEmbed()
      .setDescription(`<@${bonker.id}> bonked <@${target.id}>`)
      .setImage(gif);

      message.channel.send(embed);
    }
 
    

});

client.login(process.env.token);