const fs = require('fs');
const saveName = SAVENAME;
fs.mkdirSync('saves/' + saveName, {recursive:true});
fs.writeFile('saves/' + saveName + '/noise.txt', "document.Noise");
