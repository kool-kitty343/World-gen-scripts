const fs = require('node:fs/promises');
const saveName = SAVENAME;
async function save(map)
{
    await fs.mkdir('saves/' + saveName, {recursive:true});
    await fs.writeFile('saves/' + saveName + '/' + map + '.txt', document[map]);
}
for(const map of document.mapList)
{
    save(map);
}