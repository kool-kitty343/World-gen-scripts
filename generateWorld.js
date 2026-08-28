const canvas = document.createElement('canvas');
canvas.width = 1600;
canvas.height = 900;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(1600,900);
const buffer = imgData.data;
{
	const noise = new Uint8Array(1600 * 900)
	for(let index = 0; index < 1600 * 900; index++)
	{
		noise[index] = parseInt(NOISE_DATA[index].substring(1,3),16);
	}
	document.Noise = noise;
}
const NOISE = document.Noise;
{
	for(let index = 0; index < 1600 * 900; index++)
	{
		const col = index % 1600;
		const row = Math.floor(index / 1600);

		const upIdx = Math.max(0, row - 1) * 1600 + col;
		const downIdx = Math.min(899, row + 1) * 1600 + col;
		const leftIdx = row * 1600 + Math.max(0, col - 1);
		const rightIdx = row * 1600 + Math.min(1599, col + 1);
		
		let up = NOISE[upIdx];
		let down = NOISE[downIdx];
		let left = NOISE[leftIdx];
		let right = NOISE[rightIdx];
		
		let vertical = up - down;
		let horizontal = right - left;
		let magnitude = Math.round(Math.sqrt((horizontal * horizontal) + (vertical * vertical)));
		let direction = Math.round((Math.atan2(vertical,horizontal)/3.14159)*180)+180;
		let dirHex = direction.toString(16).padStart(3,'0');
		let magHex = magnitude.toString(16).padStart(3,'0');
		let hex = dirHex + magHex;
		
		const pixel = index * 4;
		buffer[pixel] = parseInt(hex.substring(0,2),16);
		buffer[pixel + 1] = parseInt(hex.substring(2,4),16);
		buffer[pixel + 2] = parseInt(hex.substring(4,6),16);
		buffer[pixel + 3] = 255;
	}
	document.NoiseDerivative = buffer.slice();
	ctx.putImageData(imgData, 0, 0);
	document.NoiseDerivativePNG = canvas.toDataURL('image/png');
	
}
// fish
{
	for(let index = 0; index < 1600 * 900; index++)
	{
		let hex = '000000';
		if(NOISE[index] < 110)
		{
			let amount = Math.max(Math.min(Math.round((NOISE[index] - 86) / 2),13),1) * 600;
			let quality = Math.round((amount / 600) * (10/14));
			hex = quality.toString(16) + amount.toString(16).padStart(5,'0');
		}
		const pixel = index * 4;
		buffer[pixel] = parseInt(hex.substring(0,2),16) || 0;
		buffer[pixel + 1] = parseInt(hex.substring(2,4),16) || 0;
		buffer[pixel + 2] = parseInt(hex.substring(4,6),16) || 0;
		buffer[pixel + 3] = ((hex == 0) ? 0 : 255);
	}
	document.Fish = buffer.slice();
	ctx.putImageData(imgData, 0, 0);
	document.FishPNG = canvas.toDataURL('image/png');
}
// fertile land
{
	let amount = [];
	for(let i = 111; i <= 140; i++)
	{
		amount.push(Math.max(0, Math.round((140 - i) * 8)));
	}
	for(let index = 0; index < 1600 * 900; index++)
	{
		let elevation = NOISE[index];
		let maxFertility = (elevation > 110 && elevation <= 140) ? amount[elevation - 111] : 0;
		const pixel = index * 4;
		buffer[pixel] = 0; // quality
		buffer[pixel + 1] = maxFertility; // max fertility
		buffer[pixel + 2] = maxFertility; // current fertility
		buffer[pixel + 3] = ((maxFertility == 0) ? 0 : 255);
	}
	document.Fertile = buffer.slice();
	ctx.putImageData(imgData, 0, 0);
	document.FertilePNG = canvas.toDataURL('image/png');
}
// trees
{
	let amount = [];
	for(let i = 111; i <= 140; i++)
	{
		amount.push(Math.max(0, Math.round((130 - i) * 10)));
	}
	for(let index = 0; index < 1600 * 900; index++)
	{
		let elevation = NOISE[index];
		const pixel = index * 4;
		if(elevation > 110 && elevation <= 140)
		{
			buffer[pixel] = 0;
			buffer[pixel + 1] = amount[elevation - 111];
			buffer[pixel + 2] = 00; //age?  size?  pollution absorbed?
			buffer[pixel + 3] = 255;
		}
	}
	document.Trees = buffer.slice();
	ctx.putImageData(imgData, 0, 0);
	document.TreesPNG = canvas.toDataURL('image/png');
}
// salt
{
	for(let index = 0; index < 1600 * 900; index++)
	{
		let amount = 0;
		let quality = 0;
		if(NOISE[index] == 145)
		{
			amount = (60000);
		}
		const pixel = index * 4;
		buffer[pixel] = quality;
		buffer[pixel + 1] = (amount >> 8) & 0xFF;
		buffer[pixel + 2] = amount & 0xFF;
		buffer[pixel + 3] = ((amount + quality == 0) ? 0 : 255);
	}
	document.Salt = buffer.slice();
	ctx.putImageData(imgData, 0, 0);
	document.SaltPNG = canvas.toDataURL('image/png');
}

// wind
// pollution
// land value
// salt
// iron
// copper
