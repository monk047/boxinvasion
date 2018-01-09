console.log("Hello");
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//var color = 'rgb(16, 20, 28,0.5)';
var c = canvas.getContext('2d');
/*******************************/

var x = Math.round(Math.random()*1300);
var y = Math.round(Math.random()*400);

function drawBox() {
  c.fillStyle = 'rgba(255, 255, 140, 0.6)';
  var x = Math.round(Math.random()*1300);
  var y = Math.round(Math.random()*400);
  var width = 10;
  var height = 10;
  c.fillRect(x,y,width,height);
}
/******************************/

//Line
c.beginPath();
c.moveTo(x, y);
c.lineTo(650,300);
var x = Math.round(Math.random()*1300);
var y = Math.round(Math.random()*400);
c.lineTo(x,y);
c.strokeStyle = 'pink';
c.stroke();

/******************************/
//var randDrawInterval = setInterval(drawBox, 500);
/*
c.fillRect(200,200,10,10);
c.fillRect(300,300,20,10);
*/
//8FVa!cpJ
