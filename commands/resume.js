exports.run = (bot , message, args, servers, play) => {
    
        var server = servers[message.guild.id];
        
          try{
        
            if (server.dispatcher){ //Verifica se tem musica tocando no momento se tiver
              server.dispatcher.resume();  //retoma a execução da musica atual
              console.log("MUSIC RESUMED by " + message.author.username);
            }
        
          }catch(err){
              console.error("Error: " + err)
          }
    
    }