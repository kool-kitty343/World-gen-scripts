const fs = require('node:fs/promises');
const maps = document.mapList;
const saveName = SAVENAME;
await fs.mkdir('./saves/' + saveName, {recursive:true});
async function saveRaw(map)
{
    await fs.writeFile(`./saves/${saveName}/${map}.txt`, document[map]);
}
async function savePNG(map)
{
    await fs.writeFile(`./saves/${saveName}/${map}.png`, document[`${map}PNG`]);
}
await saveRaw("Noise");
for(const map of maps)
{
    await saveRaw(map);
    await savePNG(map);
}