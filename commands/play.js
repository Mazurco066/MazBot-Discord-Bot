exports.run = (bot , message, args, servers, play, position, incrementPosition, YTDL, matchYoutubeUrl) => {

  try{

    if (!args[1]){  //Verifica se o parametro foi passado corretamente
        message.channel.send("Por Favor insira um link ao usar esse comando!");
        return;
      }

    if (!matchYoutubeUrl(args[1])){ //Verifica se uma URL do youtube é válida
      message.channel.send("Por Favor insira uma URL válida!");
      return;
    }

      if (!servers[message.guild.id]) servers[message.guild.id] = { //Verifica se ja existe um server de musicas definido
        queue: [] //Senão cria um agr
      };

      var server = servers[message.guild.id];
      server.queue.push(args[1]); //coloca a musica na fila

      incrementPosition();  //Incremantando no index.js
      position++; //Incremantando posição pois o incrementa funcionasomente para a do index.js

      if (position > 1){
        message.channel.send("Música Adicionada a Fila de Reprodução!");
        const Discord = require('discord.js');  //Para criação do Embeed
        YTDL.getInfo(args[1], function(err, info) {
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