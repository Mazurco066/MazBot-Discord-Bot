exports.run = (bot , message, args, servers, play) => {

    var server = servers[message.guild.id];
    
          try{
    
            if (server.dispatcher){ //Verifica se tem musica tocando no momento se tiver
              server.dispatcher.end();  //Finaliza a execução da musica atual
            }
    
          }catch(err){
            console.error("Error: " + err)
          }

}