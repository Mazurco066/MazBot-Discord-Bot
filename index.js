const Discord = require('discord.js');  //definindo conexão com discord padrão
const YTDL = require('ytdl-core');      //Incluindo API de baixar musicas do youtube
const search = require('youtube-search'); //Incluindo API de procurar musicas do youtube
const config = require('./config.json');  //Recuperando dados do arquivo de configuração
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const bot = new Discord.Client();       //definindo o bot como um novo client

/*
  LINKS PARA VALIDAÇÃO DO BOT NO DISCORD
  para importar pacote do BOT DISCORD: npm install discord.js --save
  para importar pacote do youtube: npm install --save ytdl-core opusscript
  para iniciar o bot usar comando: node .
  https://discordapp.com/developers/docs/intro  -> para registrar o bot e recuperar id e token
  https://discordapi.com/permissions.html -> para definir permissoes do bot e adiciona-lo ao server
*/

var servers = {}; //para enfileirar musicas no comando play
var opts = {  //Para uso da api de pesquisa no youtube
  maxResults: parseInt(config.max.toString()),
  key: config.key
};

/**
 * Javascript method that queue and play a song from Youtube
 * 
 * @param {*} connection
 *  - receive the API connection object 
 * @param {*} message 
 *  - receive the message used to call this command
 */
function play(connection, message){

  try{

    var server = servers[message.guild.id];
  
      let stream = YTDL(server.queue[0], {audioonly: true});

      message.channel.send("Reproduzindo Agora!");
      YTDL.getInfo(server.queue[0], function(err, info) {
        const title = info.title;
        const duration = info.length_seconds;
        const URL = info.video_url;
        const uploader = info.author.name;
        const thumb = info.thumbnail_url;
        console.log(`MUSIC ACTION Requested by: [${message.author.username}], Playing the requested music: '${title}.'`);
        const embed = new Discord.RichEmbed()
          .setColor('#8bc34a')
          .setTimestamp()
          .setTitle(title)
          .setThumbnail(thumb)
          .addField('Uploaded by:', uploader, true)
          .addField('Duration:', duration + ' seconds', true)
          .addField('Requested by:', message.author.username, true)
          .addField('Queue position:', 'Now Playing', true)
          .addField('URL:', URL, true)
          .setFooter('Mazbot - Mazurco066')
        message.channel.send({embed}).catch(console.error);
        });
      
      server.dispatcher = connection.playStream(stream);
      server.queue.shift();
      
      //Evento de quando acaba a musica atual
      server.dispatcher.on('end', function(){ //Quando acabar a transmissão da musica executar esse trecho

          if (server.queue[0]){ //Verifica se tem outra musica na fila
            play(connection, message);  //Se sim toca a proxima musica
          }
          else{
            connection.disconnect();  //se não fecha a transmissao
          }
      });
  }
  catch (err){

    console.error("Error: " + err);
  }

}

/**
 * Javascript method that validates a Youtube URL 
 * 
 * @param {*} url
 *  - receive a string to validate 
 * @return
 *  - if isValid it returns the video ID ifNot returns false 
 */
function matchYoutubeUrl(url) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(url.match(p)){
      return url.match(p)[1];
  }
  return false;
}


//Método para inicializar Eventos Definidos em Arquivos na pasta events.
fs.readdir("./events/", (err, files) =>{

  if (err) return console.error(err);

  files.forEach(file =>{

    //Definindo Eventos
    var eventFunction = require(`./events/${file}`);
    var eventName = file.split(".")[0];

    //Detectando os Eventos Capturados
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));

  });
});

bot.on('message', function(message) {  //evento de uma mensagem ser digitada

  if (message.author.equals(bot.user)) return;  //Validação basica para que bot n se auto responda
  if (!message.content.startsWith(config.prefix)) return; //Verifica se a mensagem começa com o prefixo indicado
  
  var pr = config.prefix.toString();
  pr = parseInt(pr.length);
  var args = message.content.substring(pr).split(" "); //gera um array list com argumentos a mais dos comandos

  var command = message.content.split(" ")[0];
  command = command.slice(pr);

  console.log(`COMMAND ${command} requested by [${message.author.username}]`);

  try {
    var commandFile = require(`./commands/${command}.js`);
    //Mandando os parametros server[array] e play[function] para uso de recursos musicais no BOT
    //Mandando os parametros YTDL[API], search[API] e mathYoutubeUrl[function] para buscas de música no youtube
    commandFile.run(bot, message, args, servers, play, YTDL, matchYoutubeUrl, search, opts);
    //message.delete(1);
    
  }
  catch (err){
    console.error("Error: " + err);
  }

});

bot.login(config.token); //token de login do bot registrado no discord
