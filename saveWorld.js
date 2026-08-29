const fs = require('fs');
//const saveName = SAVENAME;
//fs.mkdirSync('saves/' + saveName, {recursive:true});
await fs.writeFile('saves/' + 'saveName' + '/noise.txt', "document.Noise");
