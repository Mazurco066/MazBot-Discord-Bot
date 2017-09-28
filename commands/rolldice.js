exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    if (args[1]){
        
                switch (args[1].toLowerCase()) {
        
                  case "d20": //Dado de 20 faces
                    var number = Math.floor(Math.random() * 20) + 1; //randomiza um numero entre 1 a 20
                    //Cria um Embed para retornar informações para usuário
                    const embedd20 = new Discord.RichEmbed()
                        .setColor('#8bc34a')
                        .setTimestamp()
                        .addField('Ação:', '__***RollDice D20***__')
                        .addField('Retirou número: ', `${number}`)
                        .addField('Solicitado por:', `${message.author.username}`)
                        .setFooter('Mazbot - Mazurco066')
                    return message.channel.sendEmbed(embedd20).catch(console.error);
                  break;
        
                  case "d10": //Dado de 10 faces
                    var number = Math.floor(Math.random() * 10) + 1; //randomiza um numero entre 1 a 6
                    //Cria um Embed para retornar informações para usuário
                    const embedd10 = new Discord.RichEmbed()
                        .setColor('#8bc34a')
                        .setTimestamp()
                        .addField('Ação:', '__***RollDice D10***__')
                        .addField('Retirou número: ', `${number}`)
                        .addField('Solicitado por:', `${message.author.username}`)
                        .setFooter('Mazbot - Mazurco066')
                    return message.channel.sendEmbed(embedd10).catch(console.error);
                  break;
        
                  default:  //Dado não programado nesse bot
                    message.channel.send('Esse tipo dado não existe nesse bot!');
                  break;
        
                }
        
              }
              else{ //Dado padrão = 6 faces
        
                var number = Math.floor(Math.random() * 6) + 1; //randomiza um numero entre 1 a 6
                //Cria um Embed para retornar informações para usuário
                const embed = new Discord.RichEmbed()
                    .setColor('#8bc34a')
                    .setTimestamp()
                    .addField('Ação:', '__***RollDice***__')
                    .addField('Retirou número: ', `${number}`)
                    .addField('Solicitado por:', `${message.author.username}`)
                    .setFooter('Mazbot - Mazurco066')
                return message.channel.sendEmbed(embed).catch(console.error);
              }
              
}