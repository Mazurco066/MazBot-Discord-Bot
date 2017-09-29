exports.run = (bot , message, args, servers, play) => {

    var server = servers[message.guild.id];
    
          try{  //Método para Tirar todas musicas pendentes da fila

            if (message.guild.voiceConnection){

                for (var i = server.queue.length - 1; i >= 0; i--) {

                    server.queue.splice(i, 1);
                }
                server.dispatcher.end();
                console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
            }
    
          }catch(err){
            console.error("Erro Registrado: " + err);
          }
          
}