# MazBot
Bot feito em javascript para meu server discord pessoal

## Objetivo
Desenvolver um bot para meu server Discord pessoal.

## Desenvolvedor
* **Gabriel Mazurco Ribeiro**

## Metodologia
Organizado em 2 diretórios:
  * [Commands](commands) - diretório onde é armazenado cada arquivo de comandos individualmente.
  * [Events](events) - diretório onde é armazenado arquivos de eventos definidos que o bot deve capturar

Para configurar prefixo do bot e seu token se informa os dados no [Config.json](config.json)

## Recursos/Comandos

* **ping** Retorna seu ping

* **rolldice** joga um dado de 6, 10 ou 20 faces (parametros: d10/d20/vazio)

* **ask** faça uma pergunta e o bot retorna uma resposta aleatoria (parametros: pergunta)

* **kick** kicka um membro (parametros: @membro)

* **ban** bane um membro (parametros: @membro)

* **play** toca uma musica com base na url do youtube enviada (parametros: URL Youtube)

* **pause** pausa a reprodução da música atual

* **resume** retoma a execução de uma música pausada

* **skip** pula a musica atual

* **stop** para a fila de musicas tocando no bot

## Requisitos

Para hospedar esse bot em seu computador voce precisará ter instalado os seguintes recursos:
* **node.js**: https://nodejs.org/en/

* **FFmpeg**: https://ffmpeg.zeranoe.com/builds/

## Instalação
Para usar esse bot em seu server Discord siga os seguintes passos:

1. **Clone o repositório pelo Client GUI ou via Linha de Comando:**

```bash
$ git clone https://github.com/Mazurco066/Mazbot.git
```

2. **Navegue até o repositório clonado.**

```bash
$ cd Mazbot
```

3. **Instale as dependencias.**

```bash
$ npm install
```

4. **Configure a aplicação para seu servidor Discord atravez do arquivo config do Json**

```bash
"token": "Insira o token do seu bot aqui",
"prefix": "Mantenha o que esta caso deseje utilizar prefixo padrão --, caso contrario modifique a seu gosto",
"admin": "Coloque o nome do role administrativo presente em seu server Discord",
"member": "Coloque o nome do role de membro presente em seu server Discord"
```

5. **Gere os arquivos statics.**

```bash
$ npm index build
```

## License

Esse projeto esta protegido pela licença MIT - veja [LICENSE](LICENSE) para mais detalhes
