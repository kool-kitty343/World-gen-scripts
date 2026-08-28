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
  buffer[pixel + 3] = 255; // set alpha to max (no transparency)
  if(heightMap[index] > 170) // snowy peaks
  {
    buffer[pixel] = 245;
    buffer[pixel + 1] = 245;
    buffer[pixel + 2] = 245;
  }
  else if(170 >= heightMap[index] && heightMap[index] > 145) // rocky hills
  {
    buffer[pixel] = heightMap[index];
    buffer[pixel + 1] = heightMap[index];
    buffer[pixel + 2] = heightMap[index];
  }
  else if(145 >= heightMap[index] && heightMap[index] > 110) // plains
  {
    let fertility = document.Fertile[(index * 4) + 2];
    let trees = document.Trees[(index * 4) + 1];
    if(trees > 10)
    {
      buffer[pixel + 1] = Math.max(175 - trees, 100);
    }
    else if(fertility > 10 && trees <= 10)
    {
      buffer[pixel] = fertility / 2;
      buffer[pixel + 1] = Math.min(175 + (fertility / 4), 255);
      buffer[pixel + 2] = fertility / 2;
    }
    else
    {
      buffer[pixel + 1] = 175;
    }
  }
  else if(110 >= heightMap[index]) // ocean
  {
    buffer[pixel + 1] = (heightMap[index] > 70) ? (heightMap[index] - 70) * 3 : 0;
    buffer[pixel + 2] = 255;
  }
}
ctx.putImageData(imgData, 0, 0);
const map = new Image();
const sprite = vm.runtime.getEditingTarget();
map.onload = () => {
  if(sprite.map)
  {
    vm.runtime.renderer.updateBitmapSkin(sprite.map, map);
  }
  else
  {
    sprite.map = vm.runtime.renderer.createBitmapSkin(map);
  }
  vm.runtime.renderer.updateDrawableProperties(sprite.drawableID,{skinId : sprite.map})
  vm.runtime.requestRedraw();
}
map.src = canvas.toDataURL('image/png');
