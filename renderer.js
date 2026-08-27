const canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(1600,900);
const buffer = imgData.data;
