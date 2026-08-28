const fs = require('fs');
const saveName = SAVENAME;
fs.mkdirSync('saves/' + saveName, {recursive:true});
fs.writeFileSync('saves/' + saveName + '/noise.txt', "document.Noise");
