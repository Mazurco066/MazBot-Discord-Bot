exports.run = (bot, message, args) => {

    var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui
    
          //Verificando se quem chamou pelo comando tem admRole
          if (!message.member.roles.has(admRole.id)) {
            //retorna mensagem de erro pra quem chamou pelo comando
            return message.reply("Negative! You dont have permission to use this command!");
          }
          //Verificando se o usuário a ser kickado foi mencionado
          if (message.mentions.users.size === 0){
            //retorna mensagem de erro falando que quem chamou não mencionou membro a ser kickado
            return message.reply("Please mention a member to be kicked!");
          }
          //Definindo o usuário a ser kickado
          var kickMember = message.guild.member(message.mentions.users.first());
          if (!kickMember){ //Verificando se o usuário definido existe
            return message.reply("Invalid Member!");
          }
          //Verifica se o bot tem a permissão para kickar o usuário
          if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply("Sorry... I dont have the permission to kick this member!");
          }
          //Finalmente kickando o membro
          kickMember.kick().then(member => {  //kick pode retornar o membro kickado para uso de mensagem de confirmação

            const Discord = require("discord.js");
            const embed = new Discord.RichEmbed()
                .setColor('#ffeb3b')
                .setTimestamp()
                .addField('Action:', '__***Kick***__')
                .addField('Kicked Member:', `${member.user.username}`)
                .addField('Requested by:', `${message.author.username}`)
                .setFooter('Mazbot - Mazurco066')
            return message.channel.send({embed}).catch(console.error);

          }).catch(e => { //para ter certeza que bot não vai crashar adicionando tratamento de erro
            console.error("Error" + e);
          });

}