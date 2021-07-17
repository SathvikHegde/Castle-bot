module.exports = {
    name: 'bonk',
    alias: [],
    description: "bonk somebody or yourself",
    execute(message, args, cmd, client, Discord){
        const bonkgifs = [
            'https://media1.tenor.com/images/347f852d3dfa48502406fa949fcc1449/tenor.gif?itemid=15150394',
            'https://media1.tenor.com/images/c6571c335cd8e56de03ae05f81790efa/tenor.gif?itemid=20294899',
            'https://media1.tenor.com/images/79e0ed5c2ed5397fa79f48fccd6265d1/tenor.gif?itemid=20952854',
            'https://media1.tenor.com/images/dc4329d27745a6707219cb658f5b2c46/tenor.gif?itemid=18191826',
            'https://media1.tenor.com/images/119ca32322ba24e4ffc4f0d84a6839f1/tenor.gif?itemid=17402810',
            'https://media1.tenor.com/images/8cd54ee389b04a2366e85332125c5475/tenor.gif?itemid=20920340',
            'https://media1.tenor.com/images/cf9f90ce4ccca4fe6d82bb445ca4759e/tenor.gif?itemid=8229175'
        ];

        let gif = bonkgifs[Math.floor((Math.random() * bonkgifs.length))];

        let bonker = message.author;
        let target = message.mentions.users.first() || message.author;

        const embed = new Discord.MessageEmbed()
        .setDescription(`<@${bonker.id}> bonked <@${target.id}>`)
        .setImage(gif);

        message.channel.send(embed);

    }
}