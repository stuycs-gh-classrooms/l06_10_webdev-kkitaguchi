//Kano Kitaguchi 10-16-2021
var hours;
var minutes;
var seconds;
var colors;

function setup() {
  createCanvas(800, 800);
  background('#F5F2E1');
  updateTime();
  colorful(); 
}

function draw() {
  background('#F5F2E1');
  clockFace();
  drawHand("hour");
  drawHand("minute");
  drawHand("second");
  digitalClock();
}

function timeToAngle( time, t) {
  var interval;
  if (t == "hour") {
    interval = 360/12;
    time = radians(time * interval - 90);
  } else if (t == "minute") {
    interval = 360/60;
    time = radians(time * interval - 90);
  } else if (t == "second") {
    interval = 360/60;
    time = radians(time * interval - 90);
  }
  return time;
}

function drawHand(t) {
  updateTime();
  var theta = 0;
  var cx;
  var cy;
  var handLen = 0;
  stroke(0);
  if (t == "hour") {
    theta = timeToAngle(hours, t);
    handLen = 120;
    strokeWeight(6);
  } else if (t == "minute") {
    theta = timeToAngle(minutes, t);
    handLen = 220;
    strokeWeight(3);
  } else if (t == "second") {
    theta = timeToAngle(seconds, t);
    handLen = 90;
    strokeWeight(2);
    stroke('#FF0000');
  }
  cx = newX(handLen, width/2, theta);
  cy = newY(handLen, height/2, theta);
  //to generate a pointer for hour/min hand
  line(width/2, height/2, cx, cy);
}

function clockFace() {
  var centX = width/2;
  var centY = height/2;
  var degree = 270;
  var x2;
  var y2;
  var colorNum = 0;
  for (i=0; i<=12; i++){
    x2 = newX(260, width/2, radians(degree));
    y2 = newY(260, height/2, radians(degree));
    stroke('#B9AA69');
    strokeWeight(4);
    line(centX, centY, x2, y2);
    noStroke();
    fill(color(colors[colorNum]));
    circle(x2, y2, 60);
    degree += 30;
    if (colorNum < 4) {
      colorNum += 1;
    } else {
      colorNum = 0;
    }
  }
  fill('#EFEFEF');
  circle(centX, centY, 200);
  for (var i=0; i<=60; i++){
    x2 = newX(90, width/2, radians(degree));
    y2 = newY(90, height/2, radians(degree));
    noStroke();
    fill(100);
    circle(x2, y2, 2);
    degree += 6;
  }
}

function updateTime() {
  hours = hour();
  minutes = minute();
  seconds = second();
  if (hours > 12){
    hours -= 12;
  }
  print("Hours: " + hours + " Minutes: "+ minutes + " Seconds: " + seconds);
}

function newY(amplitude, offset, t) {
  var y = sin(t);
  y = amplitude * y +offset;
  return y;
}

function newX(amplitude, offset, t) {
  var x = cos(t);
  x = amplitude * x +offset;
  return x;
}

function colorful() {
  colors = new Array(5);
  colors[0] = (color('#688906'));
  colors[1] = (color('#428287'));
  colors[2] = (color('#71B8B9'));
  colors[3] = (color('#F15803'));
  colors[4] = (color('#393835'));
}

function digitalClock(){
  updateTime();
  textSize(20);
  fill('#393835');
  text(hours, 330, 780);
  text(minutes, 390, 780);
  text(seconds, 450, 780);
  noStroke();
  circle(375, 770, 2);
  circle(375, 775, 2);
  circle(435, 770, 2);
  circle(435, 775, 2);
}
