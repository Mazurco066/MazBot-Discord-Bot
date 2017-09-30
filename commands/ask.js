exports.run = (bot, message, args) => {

    if (args[1]){

        var respostas = [ //para respostas aleatórias no comando ask
            "Yes",
            "No",
            "Maybe",
            "Fuck You"
        ];

        message.channel.send(respostas[Math.floor(Math.random() * respostas.length)]);
      }
      else{
        message.channel.send('Ask something!');
      }
}