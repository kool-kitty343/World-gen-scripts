const fs = require('node:fs/promises');
//const saveName = SAVENAME;
async function save()
{
    await fs.mkdir('saves/' + 'saveName', {recursive:true});
    await fs.writeFile('saves/' + 'saveName' + '/noise.txt', "document.Noise");
}
save();