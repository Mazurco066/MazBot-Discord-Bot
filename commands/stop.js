exports.run = (bot , message, args, servers, play, position) => {

    var server = servers[message.guild.id];
    
          try{  //Método para Tirar todas musicas pendentes da fila

            for (var i = 0; i <= position; i++){
              //Para cada musica pendente acabalas
              server.dispatcher.end();
            }
    
          }catch(err){
            console.error("Erro Registrado: " + err);
          }
          
}