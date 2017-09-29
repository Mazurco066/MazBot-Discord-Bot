exports.run = (bot , message, args, servers, play, position, incrementPosition, YTDL) => {

  try{

    if (!args[1]){  //Verifica se o parametro foi passado corretamente
        message.channel.sendMessage("Por Favor insira um link ao usar esse comando!");
        return;
      }

      if (!servers[message.guild.id]) servers[message.guild.id] = { //Verifica se ja existe um server de musicas definido
        queue: [] //Senão cria um agr
      };

      var server = servers[message.guild.id];
      server.queue.push(args[1]); //coloca a musica na fila
      incrementPosition();

      message.channel.send("Música Adicionada a Fila de Reprodução!");
      
      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
  
        play(connection, message); 
      });

    }
    catch (err){
      console.error("Erro registrado: " + err);
    }
}