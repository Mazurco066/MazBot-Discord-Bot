exports.run = (bot , message, args, servers, play) => {

    var server = servers[message.guild.id];
    
          try{
    
            if (message.guild.voiceConnection){ //Se o bot estiver em algum canal de voz ele ira sair do canal
              message.guild.voiceConnection.disconnect(); //Desconecta do canal de voz
            }
    
          }catch(err){
            console.error("Erro Registrado: " + err);
          }
          
}