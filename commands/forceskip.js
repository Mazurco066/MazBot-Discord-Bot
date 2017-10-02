exports.run = (bot , message, args, servers, play) => {

    var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui
    
    //Verificando se quem chamou pelo comando tem admRole
    if (!message.member.roles.has(admRole.id)) return message.reply("Negative! You dont have permission to use this command!");
    
    var server = servers[message.guild.id];
        
         try{
        
            if (server.dispatcher){ //Verifica se tem musica tocando no momento se tiver
                server.dispatcher.end();  //Finaliza a execução da musica atual
            }
        
        }catch(err){
            console.error("Error: " + err)
        }
    
    }