exports.run = (bot, message, args) => {
    
    //var ping = `${Date.now() - message.createdTimestamp}`;  //Recupera o ping subtraindo momendo atual pelo tempo de mensagem
    var ping = bot.ping;
    
    //var ping = await message.channel.send("Ping?");
    //ping.edit(`Pong! Latency is ${ping.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);

    const Discord = require('discord.js');  //Para se construir um embed
        var embed = new Discord.RichEmbed() //Embed é uma caixa muito legal que da pra por mensagens mto fodas aaaaaaaaaaaaa
            .setColor(0x00FFFF) //Essa cor é um azul calcinha
            .addField("Bot Ping", ping, true)  //o true é pra ficar na msm linha que o proximo campo
            .addField("Value", "ms", true)  //msm coisa aqui
            .setFooter("This is your ping!")  //Aqui é o conteúdo do rodapé do meu fucking foda embed
        message.channel.send({embed}); //Mostrando meu embed na tela

}