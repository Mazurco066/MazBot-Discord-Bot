exports.run = (bot, message, args) => {

        message.channel.send("Ping?").then(msg => {
             msg.edit(`Latency between ${message.author} and Discord Server is: ${msg.createdTimestamp - message.createdTimestamp}ms.\nLatency between ${bot.user} and Discord API is: ${Math.round(bot.ping)}ms`);
        });
        
}