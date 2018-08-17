// get the <canvas> tag from the document
var myCanvas = document.querySelector(".my-canvas");

// get the context object (has all the methods to draw things on the screen)
var ctx = myCanvas.getContext("2d");

// color the next fills orange
ctx.fillStyle = "orange";
// draw a solid rectangle (x, y, width, height)
ctx.fillRect(5, 5, 30, 15);

// change the thickness of the stroke
ctx.lineWidth = 10;
// color the next strokes #aef435
ctx.strokeStyle = "#aef435";
// draw a rectangle outline (x, y, width, height)
ctx.strokeRect(40, 40, 20, 55);

// color the next fills blue
ctx.fillStyle = "rgb(30, 70, 255)";
drawCircle(200, 100, 75);

// when shapes overlap the last one gets drawn on top
var gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'rgb(255, 70, 30)');
ctx.fillStyle = gradient;
drawCircle(200, 100, 35);

// starts a custom drawing
ctx.beginPath();
// draw a semi-circle (x, y, radius, startAngle, endAngle)
ctx.arc(400, 100, 50, 0, toRadians(135));
// stroke the current drawing
ctx.stroke();
// ends the custom drawing
ctx.closePath();


ctx.fillStyle = "black";
ctx.globalAlpha = 0.5;
ctx.fillRect(350, 50, 100, 100);


var princeImg = new Image();
// specify "src" as if it was from the HTML document
princeImg.src = "./images/prince.webp";

princeImg.onload = function () {
  ctx.globalAlpha = 1;
  // draw the image on the screen (image, x, y, width, height)
  ctx.drawImage(princeImg, 700, 200, 300, 214);
};


// -----------------------------------------------------------------------------

function drawCircle (x, y, radius) {
  // starts a custom drawing
  ctx.beginPath();
  // draw a full circle (x, y, radius, startAngle, endAngle);
  ctx.arc(x, y, radius, 0, toRadians(360));
  // fill the current drawing
  ctx.fill();
  // ends the custom drawing
  ctx.closePath();
}

function toRadians (degrees) {
  return degrees * (Math.PI / 180);
}
