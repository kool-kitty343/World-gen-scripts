const canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(1600,900);
const buffer = imgData.data;
let heightMap = document.Noise;
for(let index = 0; index < 1600 * 900; index++)
{
  let latitude = Math.floor(index / 1600);
  let pixel = index * 4;
  buffer[pixel + 3] = 255; // set apha to max (no transparency)
  if(heightMap[index] > 170) // snowy peaks
  {
    
  }
  else if(170 >= heightMap[index] && heightMap[index] > 140) // rocky hills
  {
    
  }
  else if(140 >= heightMap[index] && heightMap[index] > 110) // plains
  {
    
  }
  else if(110 >= heightMap[index]) // ocean
  {
    buffer[pixel + 1] = Math.round((heightMap[index] + 20) / 20);
    buffer[pixel + 2] = 255;
  }
}
const map = new Image();
const sprite = vm.runtime.getEditingTarget();
map.onload = () => {
  if(sprite.map)
  {
    vm.runtime.renderer.updateResizableSkin(sprite.map, map);
  }
  else
  {
    sprite.map = vm.runtime.renderer.createResizableSkin(map);
  }
  vm.runtime.renderer.setDrawableSkinId(,sprite.drawableID, sprite.map);
  vm.runtime.requestRedraw();
}
map.src = canvas.toDataURL('image/png');
