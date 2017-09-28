exports.run = (bot, message, args) => {

    var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui
    
          //Verificando se quem chamou pelo comando tem admRole
          if (!message.member.roles.has(admRole.id)) {
            //retorna mensagem de erro pra quem chamou pelo comando
            return message.reply("Você não tem permissão para usar esse comando!");
          }
          //Verificando se o usuário a ser kickado foi mencionado
          if (message.mentions.users.size === 0){
            //retorna mensagem de erro falando que quem chamou não mencionou membro a ser banido
            return message.reply("Por Favor entre com algum membro para ser banido!");
          }
          //Definindo o usuário a ser banido
          var banMember = message.guild.member(message.mentions.users.first());
          if (!banMember){ //Verificando se o usuário definido existe
            return message.reply("Esse usuário não é válido!");
          }
          //Verifica se o bot tem a permissão para banir o usuário
          if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")){
            return message.reply("Eu não tenho permissão para banir esse membro!");
          }
          //Finalmente banindo o membro
          banMember.ban().then(member => {  //kick pode retornar o membro kickado para uso de mensagem de confirmação
            message.reply(member.user.username + " se fudeu bonito!");
          }).catch(e => { //para ter certeza que bot não vai crashar adicionando tratamento de erro
            console.error("ERRO REGISTRADO" + e);
          });
}