exports.run = (bot , message, args, servers, play, YTDL, matchYoutubeUrl, search) => {

  try{

      if (!args[1]){  //Verifica se o parametro foi passado corretamente
          message.channel.send("Por Favor insira um link ao usar esse comando!");
          return;
      }

      if (!matchYoutubeUrl(args[1])){ //Verifica se uma URL do youtube é válida

        //Se não for válida usará a API youtube-search para buscar pelo nome do video informado
        message.channel.send("Por Favor insira uma URL válida!");
        return; //Por enquanto vamos deixar assim mesmo

      }
      else{ //Usa a API YTDL para tocar a música pela URL passada

        //Verifica se ja existe um server de musicas definido
        if (!servers[message.guild.id]) servers[message.guild.id] = {
          queue: [] //Senão cria um agr
        };

        var server = servers[message.guild.id];

        //Para confirmar Música desejaca com usuário imprime essa confirmação na tela
        message.channel.send("Música Adicionada a Fila de Reprodução!");
        const Discord = require('discord.js');  //Para criação do Embeed

        YTDL.getInfo(args[1], function(err, info) {
          const title = info.title;
          const duration = info.length_seconds;
          const URL = info.video_url;
          const uploader = info.author.name;
          const thumb = info.thumbnail_url;
          console.log(`[${message.author.username}], Added to Queue: '${title}.'`);
          const embed = new Discord.RichEmbed()
          .setColor('#8bc34a')
          .setTimestamp()
          .setTitle(title)
          .setThumbnail(thumb)
          .addField('Uploaded by:', uploader, true)
          .addField('Duration:', duration + ' seconds', true)
          .addField('Requested by:', message.author.username, true)
          .addField('Queue position:', server.queue.length, true)
          .addField('URL:', URL, true)
          .setFooter('Mazbot - Mazurco066')
          message.channel.send({embed}).catch(console.error);
        });
        
        server.queue.push(args[1]); //coloca a musica na fila

        //Se tudo ocorreu corretamente até agora ele ira chamar o método que reproduziar a música 
        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
          play(connection, message); 
        });

      } //Fim do Else

    }
    catch (err){
      console.error("Erro registrado: " + err);
    }
}