module.exports = (Discord, client, member) =>{
    if(member.guild.id != '799971756772818964') return;
    client.channels.cache.get('843041767216906282').send(`Oh no! <@${member.id}> (${member.displayName}) is leaving us. We hope you come back soon!`);
}