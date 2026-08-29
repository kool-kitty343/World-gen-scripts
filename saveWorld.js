const fs = require('node:fs/promises');
const saveName = SAVENAME;
async function saveRaw(map)
{
    await fs.mkdir('saves/' + saveName, {recursive:true});
    await fs.writeFile(`saves/${saveName}/${map}.txt`, document[map]);
}
async function savePNG(map)
{
    await fs.mkdir('saves/' + saveName, {recursive:true});
    await fs.writeFile(`saves/${saveName}/${map}.PNG`, document[`${map}PNG`]);
}
await save("Noise");
for(const map of document.mapList)
{
    await saveRaw(map);
    await savePNG(map);
}