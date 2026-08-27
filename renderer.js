const canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(1600,900);
const buffer = imgData.data;
let heightMap = document.Noise
for(let index = 0; index < 1600 * 900; index++)
{
  let latitude = Math.floor(index / 1600);
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
    
  }
}
