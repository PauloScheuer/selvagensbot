var fs = require('fs');
var selvagens = JSON.parse(fs.readFileSync('./selvagens.json', 'utf-8'));

var posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));

//escreve json com todas as frases, com base no selvagens.json;
function getPhrases() {
  var i = 0;
  var numAlb = selvagens.length;
  while (i < numAlb) {
    //acessa os álbuns
    var j = 0;
    var albumObj = selvagens[i];
    var numSong = albumObj['songs'].length;
    while (j < numSong) {
      //acessa as músicas
      var songObj = albumObj['songs'][j];
      var nameSong = Object.keys(songObj)[0];
      var numPhrase = songObj[nameSong].length;
      var k = 0;
      while (k < numPhrase) {
        //acessa as frases
        var content = {};
        var phrase = songObj[nameSong][k];
        content['albumName'] = albumObj['name'];
        content['albumYear'] = albumObj['year'];
        content['nameSong'] = nameSong;
        content['phrase'] = phrase;
        var indexInToCome = posts['toCome'].findIndex(
          (val) => val.phrase == phrase
        );
        var indexInAlready = posts['already'].findIndex(
          (val) => val.phrase == phrase
        );
        if (indexInToCome < 0 && indexInAlready < 0) {
          posts['toCome'].push(content);
        }

        k++;
      }
      j++;
    }
    i++;
  }

  //escreve
  fs.writeFileSync('./posts.json', JSON.stringify(posts));
}
module.exports = getPhrases();
