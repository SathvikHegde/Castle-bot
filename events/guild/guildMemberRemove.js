module.exports = (Discord, client, member) =>{
    if(member.guild.id != '799971756772818964') return;
    client.channels.cache.get('818069197598359602').send(`Oh no! <@${member.id}> (${member.displayName}) is leaving us. We hope you come back soon!`);
}
