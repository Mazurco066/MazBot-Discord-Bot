exports.run = (bot, message, args) => {

    const Discord = require('discord.js');  //Para a criação do Embeed
    var embed = new Discord.RichEmbed() //Embed é uma caixa muito legal que da pra por mensagens mto fodas aaaaaaaaaaaaa
    .setTitle("Avaliable Commands")
    .setColor('#80deea') //Essa cor é um azul calcinha
    .addField("ping", "Returns your ping;")  //o true é pra ficar na msm linha que o proximo campo
    .addField("rolldice", "Roll a dice of 6, 10 or 20 faces (parameters: d10/d20/empty);")
    .addField("ask", "Ask a question and the bot will answers randomly. (parameters: question);")
    .addField("play", "Plays a music or video (Audio only) from Youtube. (parameters: Youtube URL or Search String);")
    .addField("pause", "Pause the atual music reproduction;")
    .addField("resume", "Resume the reproduction of a paused music;")
    .addField("skip", "Skip a song;")
    .addField("forceskip", "Skip a song without votes (Admin needed)")
    .addField("stop", "Stop the music's queue in progress;")
    .addField("ban", "Ban a member. (parameters: @member);")
    .addField("kick", "Kick a member. (parameters: @member);")  
    .setFooter("Those are the avaliable commands for this BOT!")  //Aqui é o conteúdo do rodapé do meu fucking foda embed
    message.author.send({embed}); //Mostrando meu embed para o chat privado com o membro que solicitou

    message.reply("The command list was sent by Direct Message!");

}