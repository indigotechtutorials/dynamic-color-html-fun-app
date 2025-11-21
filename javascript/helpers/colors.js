const convertHSLToRGB = (hsl) => {
  const tempEl = document.createElement("div")
  tempEl.style.display = "none"
  tempEl.style.color = hsl
  document.body.appendChild(tempEl)
  const colorValue = window.getComputedStyle(tempEl).color
  tempEl.remove()
  return colorValue
}

const convertHEXToRGB = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const convertRGBToHex = (r, g, b) =>{
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const extractRGBValues = (color) => {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    context.fillStyle = color
    context.fillRect(0,0,1,1)
    return [context.getImageData(0,0,1,1).data[0],
           context.getImageData(0,0,1,1).data[1],
           context.getImageData(0,0,1,1).data[2]]
}


const convertRGBToHSL = (r,g,b) => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta === 0)
    h = 0;
  // Red is max
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}


const getColor = (name) => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(name);
}

const setColor = (name, value) => {
  document.documentElement.style.setProperty(name, value);
}