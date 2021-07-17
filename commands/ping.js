module.exports = {
    name: 'ping',
    alias: ['pong','pi'],
    description: "this is a ping command!",
    execute(message, args, cmd, client, Discord){
        message.channel.send(`My Latency: ${Date.now() - message.createdTimestamp}ms.\nDiscord API Latency: ${client.ws.ping}ms.`);
    }
}