const fs = require('node:fs/promises');
const saveName = SAVENAME;
await fs.mkdir('saves/' + saveName, {recursive:true});
async function saveRaw(map)
{
    await fs.writeFile(`saves/${saveName}/${map}.txt`, document[map]);
}
async function savePNG(map)
{
    await fs.writeFile(`saves/${saveName}/${map}.png`, document[`${map}PNG`]);
}
await save("Noise");
for(const map of document.mapList)
{
    await saveRaw(map);
    await savePNG(map);
}