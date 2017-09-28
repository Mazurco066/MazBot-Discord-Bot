exports.run = (bot, message, args) => {

    const Discord = require('discord.js');  //Para a criação do Embeed
    var embed = new Discord.RichEmbed() //Embed é uma caixa muito legal que da pra por mensagens mto fodas aaaaaaaaaaaaa
    .setColor('#ffa726') //Essa cor é um azul calcinha
    .addField("ping", "Retorna seu ping")  //o true é pra ficar na msm linha que o proximo campo
    .addField("rolldice", "joga um dado de 6, 10 ou 20 faces (parametros: d10/d20/vazio)")
    .addField("ask", "faça uma pergunta e o bot retorna uma resposta aleatoria (parametros: pergunta)")
    .addField("play", "toca uma musica com base na url do youtube enviada (parametros: URL Youtube)")
    .addField("skip", "pula a musica atual")
    .addField("stop", "para a fila de musicas tocando no bot")
    .addField("ban", "bane um membro (parametros: @membro)")
    .addField("kick", "kicka um membro (parametros: @membro)")  
    .setFooter("Esses são os comandos desse BOT!")  //Aqui é o conteúdo do rodapé do meu fucking foda embed
  message.channel.sendEmbed(embed); //Mostrando meu embed na tela

}