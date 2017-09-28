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
      position++;

      const Discord = require('discord.js');
      if (position > 1){

        YTDL.getInfo(server.queue[0], function(err, info) {
          const title = info.title;
          const duration = info.length_seconds;
          const URL = info.video_url;
          const uploader = info.author.name;
          const thumb = info.thumbnail_url;
          console.log(`${message.author.username}, Tocando a Musica: '${title}.'`);
          //Trocar essa porra aqui por um Embeed
          const embed = new Discord.RichEmbed()
            .setColor('#8bc34a')
            .setTimestamp()
            .setTitle(title)
            .setThumbnail(thumb)
            .addField('Uploaded by:', uploader, true)
            .addField('Duration:', duration + ' seconds', true)
            .addField('Requested by:', message.author.username, true)
            .addField('Queue position:', position, true)
            .addField('URL:', URL, true)
            .setFooter('Mazbot - Mazurco066')
          message.channel.sendEmbed(embed).catch(console.error);
          });
      }
      
      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
  
        play(connection, message); 
      });

    }
    catch (err){
      console.error("Erro registrado: " + err);
    }
}