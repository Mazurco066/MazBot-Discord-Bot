exports.run = (bot, message, args) => {

    var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui
    
          //Verificando se quem chamou pelo comando tem admRole
          if (!message.member.roles.has(admRole.id)) {
            //retorna mensagem de erro pra quem chamou pelo comando
            return message.reply("Você não tem permissão para usar esse comando!");
          }
          //Verificando se o usuário a ser kickado foi mencionado
          if (message.mentions.users.size === 0){
            //retorna mensagem de erro falando que quem chamou não mencionou membro a ser kickado
            return message.reply("Por Favor entre com algum membro para ser kickado!");
          }
          //Definindo o usuário a ser kickado
          var kickMember = message.guild.member(message.mentions.users.first());
          if (!kickMember){ //Verificando se o usuário definido existe
            return message.reply("Esse usuário não é válido!");
          }
          //Verifica se o bot tem a permissão para kickar o usuário
          if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply("Eu não tenho permissão para kickar esse membro!");
          }
          //Finalmente kickando o membro
          kickMember.kick().then(member => {  //kick pode retornar o membro kickado para uso de mensagem de confirmação

            const Discord = require("discord.js");
            const embed = new Discord.RichEmbed()
                .setColor('#ffeb3b')
                .setTimestamp()
                .addField('Ação:', '__***Kick***__')
                .addField('Usuário Kickado:', `${member.user.username}`)
                .addField('Solicitado por:', `${message.author.username}`)
                .setFooter('Mazbot - Mazurco066')
            return message.channel.send({embed}).catch(console.error);

          }).catch(e => { //para ter certeza que bot não vai crashar adicionando tratamento de erro
            console.error("ERRO REGISTRADO" + e);
          });

}