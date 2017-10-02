exports.run = (bot, message, args) => {

        message.channel.send("Ping?").then(msg => {
             msg.edit(`A latência entre ${message.author} e o servidor é de ${msg.createdTimestamp - message.createdTimestamp}ms. A latência entre ${bot.user} e a API do Discord é de ${Math.round(bot.ping)}ms`);
        });
        

}