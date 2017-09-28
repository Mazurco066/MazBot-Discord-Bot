exports.run = (bot, message, args) => {

    if (args[1]){
        
                switch (args[1].toLowerCase()) {
        
                  case "d20": //Dado de 20 faces
                    var number = Math.floor(Math.random() * 20) + 1; //randomiza um numero entre 1 a 20
                    message.reply("D20: Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
                  break;
        
                  case "d10": //Dado de 10 faces
                    var number = Math.floor(Math.random() * 10) + 1; //randomiza um numero entre 1 a 6
                    message.reply("D10: Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
                  break;
        
                  default:  //Dado não programado nesse bot
                    message.channel.sendMessage('Esse tipo dado não existe nesse bot!');
                  break;
        
                }
        
              }
              else{ //Dado padrão = 6 faces
        
                var number = Math.floor(Math.random() * 6) + 1; //randomiza um numero entre 1 a 6
                message.reply("Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
              }
              
}