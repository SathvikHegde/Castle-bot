const Canvas = require("canvas");
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');

    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
};

module.exports = async (Discord, client, member) =>{
    const canvas = Canvas.createCanvas(700, 250);
	    const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://i2.wp.com/zeevector.com/wp-content/uploads/2021/02/black-grey-gradient-background.jpg?resize=600%2C450&ssl=1');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = '35px sans-serif';
	    context.fillStyle = '#ffffff';
	    context.fillText('Welcome to the server!', canvas.width / 2.5, canvas.height / 3.1);

        context.font = applyText(canvas, member.displayName);
        context.fillStyle = '#ffffff';
        context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.5);

        context.strokeStyle = '#74037b';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage('https://cdn.discordapp.com/icons/799971756772818964/a_367c68c46121c6f6d181d55c55631433.jpg');
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcomeimage.png');

        const embed = new Discord.MessageEmbed()
        .setDescription(`**Welcome <@${member.id}>**\n \n• <#799985973554315295> Be sure to read through all the rules!\n• Head over to <#799977380600872970> to tell us a bit about you!\n• Finally, grab some fun roles in <#799981510735953940> :sunglasses:`)
        .attachFiles(attachment);

        client.channels.cache.get('843041767216906282').send(embed);
}