/***************CANVAS SETUP************************/
var canvas = document.querySelector('canvas');
//Canvas Dimension
var cnvW = 500+20;
var cnvH = 500+20;
//Setting Canvas Dimensions
canvas.width = cnvW;
canvas.height = cnvH;
//Context variable
var c = canvas.getContext('2d');
/***************************************************/
//Array of the objects
//var board [11][11];
/***************************************************/
//RENDER DOTS
var dotX =0;
var dotY =0;
var dotHeight = 20;
var dotWidth = 20;
//DOT COLOR
c.fillStyle = 'rgba(27, 71, 142,0.75)';
//Loop to render the dots
for (var i = dotX; i < 6; i++) {
  for (var j = dotY; j < 6; j++) {
    c.fillRect(i*100,j*100,dotWidth,dotHeight);
  }
}
/***************************************************/
//RENDER H-LINES
var hLineX = 20;
var hLineY = 0;
var hLineW = 80;
var hLineH = 20;
//H LINE COLOR
c.fillStyle = 'rgba(250, 144, 33,0.7)';
//Lopp to render H-lines
for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 6; j++) {
    c.fillRect((i*100)+hLineX,(j*100)+hLineY,hLineW,hLineH);
  }
}
/***************************************************/
//RENDER V-LINES
var vLineX = 0;
var vLineY = 20;
var vLineW = 20;
var vLineH = 80;
//V LINE COLOR
c.fillStyle = 'rgba(250, 144, 33,0.7)';
//Lopp to render V-lines
for (var i = 0; i < 6; i++) {
  for (var j = 0; j < 5; j++) {
    c.fillRect((i*100)+vLineX,(j*100)+vLineY,vLineW,vLineH);
  }
}
/***************************************************/

/*
c.fillRect(dotX+100,dotY+100,dotWidth,dotHeight);
c.fillStyle = 'rgba(255, 255, 140, 0.9)';
c.fillRect(dotX+500,dotY+500,dotWidth,dotHeight);
c.fillStyle = 'rgba(255, 255, 140, 0.9)';
c.fillRect(dotX+200,dotY+400,dotWidth,dotHeight);
console.log("Print Done");
*/
/***************************************************/
