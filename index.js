const Discord = require('discord.js');  //definindo conexão com discord padrão
const YTDL = require('ytdl-core');      //Incluindo biblioteca de baixar musicas do youtube
const bot = new Discord.Client();       //definindo o bot como um novo client
const TOKEN = "MzQ5NTgwNjYxOTk0MTYwMTI4.DH3j9Q.9VXLInRmwlrB_M1UJW8xxQr3zjs";  //token de acesso
const PREFIXO = "->";

//Funções para usos gerais
function play(connection, message){

  var server = servers[message.guild.id]; //Pega a conexão com o server discord atual
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));  //Estabelece conexão com API

  server.queue.shift(); //Retira da fila a musica que esta em andamento

  server.dispatcher.on('end', function(){ //Quando acabar a transmissão da musica executar esse trecho

    if (server.queue[0]){ //Verifica se tem outra musica na fila
      play(connection, message);  //Se sim toca a proxima musica
    }
    else{
      connection.disconnect();  //se não fecha a transmissao
    }
  });
}
//Funções para usos gerais

//Variáveis para usos gerais
var respostas = [ //para respostas aleatórias no comando ask
  "sim",
  "não",
  "talvez",
  "vai se fuder"
];
var servers = {}; //para enfileirar musicas no comando play
//Variáveis para usos gerais

/*
  LINKS PARA VALIDAÇÃO DO BOT NO DISCORD
  para importar pacote do BOT DISCORD: npm install discord.js --save
  para importar pacote do youtube: npm install --save ytdl-core opusscript
  para iniciar o bot usar comando: node .
  https://discordapp.com/developers/docs/intro  -> para registrar o bot e recuperar id e token
  https://discordapi.com/permissions.html -> para definir permissoes do bot e adiciona-lo ao server
*/

bot.on('ready', () => { //evento de inicialização do bot
  console.log('Bot iniciado com sucesso!'); //se tudo ocorrer bem retornara mensagem no console
  bot.user.setStatus("status");
});

bot.on('guildMemberAdd', function(member) { //função para atribuir role padrão para novos usuarios

  var guild = member.guild; //Variável para armaazenar a guilda

  guild.defaultChannel.sendMessage('Bem Vindo' + member.user.username + ', seu Burgues Safado!');  //´´String misturada com variáveis

  //Definindo Role padrão para novo membro
  var memberRole = guild.roles.find("name", "Membro");  //Variável para armazenar role padrão para novatos
  if (!memberRole) return;  //Se não existir esse Role
  member.addRole(memberRole); //Adiciona o membro novo ao role membro

});

bot.on('message', function(message) {  //evento de uma mensagem ser digitada

  if (message.author.equals(bot.user)) return;  //Validação basica para que bot n se auto responda
  if (!message.content.startsWith(PREFIXO)) return; //Verifica se a mensagem começa com o prefixo indicado
  var args = message.content.substring(PREFIXO.lenght).split(" "); //gera um array list com argumentos a mais dos comandos

  switch (args[0].toLowerCase()) {  //Estrutura para identidicar comando

    //args[0] é o primeiro comando passado atravez de mensagem após o prefixo

    case PREFIXO + "help":  //comando help

      var embed = new Discord.RichEmbed() //Embed é uma caixa muito legal que da pra por mensagens mto fodas aaaaaaaaaaaaa
        .setColor(0x00FFFF) //Essa cor é um azul calcinha
        .addField("ping", "Retorna seu ping")  //o true é pra ficar na msm linha que o proximo campo
        .addField("rolldice", "joga um dado de 6, 10 ou 20 faces (parametros: d10/d20/vazio)")
        .addField("ask", "faça uma pergunta e o bot retorna uma resposta aleatoria (parametros: pergunta)")
        .addField("play", "toca uma musica com base na url do youtube enviada (parametros: URL Youtube)")
        .addField("skip", "pula a musica atual")
        .addField("stop", "para a fila de musicas tocando no bot")
        .addField("ban", "bane um membro (parametros: @membro)")
        .addField("kick", "kicka um membro (parametros: @membro)")  
        .setFooter("Esses são os comandos desse BOT!")  //Aqui é o conteúdo do rodapé do meu fucking foda embed
      message.channel.sendEmbed(embed); //Mostrando meu embed na tela

    break;

    //COMANDOS PARA DIVERSÃO <>

    //Comando de rolar um dado
    case PREFIXO + "rolldice":

      if (args[1]){

        switch (args[1].toLowerCase()) {

          case "d20": //Dado de 20 faces
            var number = Math.floor(Math.random() * 20) + 1; //randomiza um numero entre 1 a 20
            message.reply("D20: Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
          break;

          case "d10": //Dado de 10 faces
            var number = Math.floor(Math.random() * 10) + 1; //randomiza um numero entre 1 a 6
            message.reply("D10: Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
          break;

          default:  //Dado não programado nesse bot
            message.channel.sendMessage('Esse tipo dado não existe nesse bot!');
          break;

        }

      }
      else{ //Dado padrão = 6 faces

        var number = Math.floor(Math.random() * 6) + 1; //randomiza um numero entre 1 a 6
        message.reply("Você tirou o número: " + number);  //Responde mencionando o usuário que chamou pelo comando
      }

    break;

    //Comando de fazer pergunta e receber resposta aleatoria
    case PREFIXO + "ask":

      if (args[1]){
        message.channel.sendMessage(respostas[Math.floor(Math.random() * respostas.length)]);
      }
      else{
        message.channel.sendMessage('Faça alguma pergunta!');
      }

    break;

    //COMANDOS PARA DIVERSÃO </>

    //COMANDOS BASICOS <>

    //Comando de retornar ping
    case PREFIXO + "ping":

      var ping = `${Date.now() - message.createdTimestamp}`;  //Recupera o ping subtraindo momendo atual pelo tempo de mensagem

      var embed = new Discord.RichEmbed() //Embed é uma caixa muito legal que da pra por mensagens mto fodas aaaaaaaaaaaaa
        .setColor(0x00FFFF) //Essa cor é um azul calcinha
        .addField("Ping", ping, true)  //o true é pra ficar na msm linha que o proximo campo
        .addField("Value", "ms", true)  //msm coisa aqui
        .setFooter("This is your ping!")  //Aqui é o conteúdo do rodapé do meu fucking foda embed
      message.channel.sendEmbed(embed); //Mostrando meu embed na tela

    break;

    //COMANDOS BASICOS </>

    //MUSIC FEATURES <>
    //toca uma musica por url do youtube
    case PREFIXO + "play":

      if (!args[1]){  //Verifica se o parametro foi passado corretamente
        message.channel.sendMessage("Por Favor insira um link ao usar esse comando!");
        return;
      }

      if (!message.member.voiceChannel){  //Verifica se o bot esta em um canal de voz
        message.channel.sendMessage("o bot DEVE estar em um canal de voz para usar esse recurso!");
        return;
      }

      if (!servers[message.guild.id]) servers[message.guild.id] = { //Verifica se ja existe um server de musicas definido
        queue: [] //Senão cria um agr
      };

      var server = servers[message.guild.id];
      server.queue.push(args[1]); //coloca a musica na fila

      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
        play(connection, message);
      });

    break;

    //pula a musica atual
    case PREFIXO + "skip":

      var server = servers[message.guild.id];

      try{

        if (server.dispatcher){ //Verifica se tem musica tocando no momento se tiver
          server.dispatcher.end();  //Finaliza a execução da musica atual
        }

      }catch(err){
        console.error("Erro registrado: " + err)
      }

    break;

    //Para de tocar a fila de execuxão
    case PREFIXO + "stop":

      var server = servers[message.guild.id];

      try{

        if (message.guild.voiceConnection){ //Se o bot estiver em algum canal de voz ele ira sair do canal
          message.guild.voiceConnection.disconnect(); //Desconecta do canal de voz
        }

      }catch(err){
        console.error("Erro Registrado: " + err);
      }

    break;
    //MUSIC FEATURES </>

    //COMANDOS ADMINISTRATIVOS <>
    case PREFIXO + "kick":  //Comando para kickar membro do servidor

      var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui

      //Verificando se quem chamou pelo comando tem admRole
      if (!message.member.roles.has(admRole.id)) {
        //retorna mensagem de erro pra quem chamou pelo comando
        return message.reply("Você não tem permissão para usar esse comando!");
      }
      //Verificando se o usuário a ser kickado foi mencionado
      if (message.mentions.users.size === 0){
        //retorna mensagem de erro falando que quem chamou não mencionou membro a ser kickado
        return message.reply("Por Favor entre com algum membro para ser kickado!");
      }
      //Definindo o usuário a ser kickado
      var kickMember = message.guild.member(message.mentions.users.first());
      if (!kickMember){ //Verificando se o usuário definido existe
        return message.reply("Esse usuário não é válido!");
      }
      //Verifica se o bot tem a permissão para kickar o usuário
      if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
        return message.reply("Eu não tenho permissão para kickar esse membro!");
      }
      //Finalmente kickando o membro
      kickMember.kick().then(member => {  //kick pode retornar o membro kickado para uso de mensagem de confirmação
        message.reply(member.user.username + " se fudeu!");
      }).catch(e => { //para ter certeza que bot não vai crashar adicionando tratamento de erro
        console.error("ERRO REGISTRADO" + e);
      });

    break;

    case PREFIXO + "ban":

      var admRole = message.guild.roles.find("name", "Pika Das Galaxias");  //Coloque nome da role de adm aqui

      //Verificando se quem chamou pelo comando tem admRole
      if (!message.member.roles.has(admRole.id)) {
        //retorna mensagem de erro pra quem chamou pelo comando
        return message.reply("Você não tem permissão para usar esse comando!");
      }
      //Verificando se o usuário a ser kickado foi mencionado
      if (message.mentions.users.size === 0){
        //retorna mensagem de erro falando que quem chamou não mencionou membro a ser banido
        return message.reply("Por Favor entre com algum membro para ser banido!");
      }
      //Definindo o usuário a ser banido
      var banMember = message.guild.member(message.mentions.users.first());
      if (!banMember){ //Verificando se o usuário definido existe
        return message.reply("Esse usuário não é válido!");
      }
      //Verifica se o bot tem a permissão para banir o usuário
      if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")){
        return message.reply("Eu não tenho permissão para banir esse membro!");
      }
      //Finalmente banindo o membro
      banMember.ban().then(member => {  //kick pode retornar o membro kickado para uso de mensagem de confirmação
        message.reply(member.user.username + " se fudeu bonito!");
      }).catch(e => { //para ter certeza que bot não vai crashar adicionando tratamento de erro
        console.error("ERRO REGISTRADO" + e);
      });

    break;
    //COMANDOS ADMINISTRATIVOS </>

    //Saída quando nada acontece
    default:
      message.channel.sendMessage('Comando Inválido');
    break;

  }

});

bot.login(TOKEN); //token de login do bot registrado no discord
