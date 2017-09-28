# MazBot-Discord-Bot
Bot feito em javascript para meu server discord pessoal

## Objetivo
Desenvolver um bot para meu server Discord pessoal.

## Desenvolvedor
* **Gabriel Mazurco Ribeiro**

## Metodologia
Organizado em 2 diretórios:
  * [Commands](commands) - diretório onde é armazenado cada arquivo de comandos individualmente.
  * [Events](events) - diretório onde é armazenado arquivos de eventos definidos que o bot deve capturar

Para configurar prefixo do bot e seu token se informa os dados no [Config](config.json)

## Recursos/Comandos

* **ping** Retorna seu ping

* **rolldice** joga um dado de 6, 10 ou 20 faces (parametros: d10/d20/vazio)

* **ask** faça uma pergunta e o bot retorna uma resposta aleatoria (parametros: pergunta)

* **play** toca uma musica com base na url do youtube enviada (parametros: URL Youtube)

* **skip** pula a musica atual

* **stop** para a fila de musicas tocando no bot

* **kick** kicka um membro (parametros: @membro)

* **ban** bane um membro (parametros: @membro)

## Requisitos

Requer **node.js**: https://nodejs.org/en/

e **FFmpeg**: https://ffmpeg.zeranoe.com/builds/

## Instalação
Para usar esse bot em seu server Discord siga os seguintes passos:

## License

Esse projeto esta protegido pela licença MIT - veja [LICENSE](LICENSE) para mais detalhes
