# selvagensbot
Bot que posta frases de músicas | Bot that posts some phrases from musics

Programa em node.js que utiliza a API do Twitter para, uma vez por dia, postar tweets na conta @selvagensbot em homenagem a banda Selvagens à Procura de Lei. 

A premissa do sistema é, através do JSON autoral selvagens.json (que contém os álbuns da banda), criar outro JSON (posts.json) onde existe um objeto "toCome", cujo valor é um array de objetos com todos os trechos a serem postados. A cada vez que o bot é executado, ele tira o objeto com o trecho postado de dentro do objeto "toCome" e o põe no objeto "already", evitando que hajam posts repetidos. Após serem postados todos os trechos cadastrados, o bot posta uma mensagem final de agradecimento e encerra.

Caso deseje usar, faça o download dos arquivos e substitua os exemplos no .env para os tokens da sua conta.

*Todo o contéudo postado pertence à banda.
