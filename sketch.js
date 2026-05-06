var mode = 0;
var splash;

let C, D, Eb, F, G, Ab, B, Cc;
let circles = [];

function preload(){
  soundFormats('mp3');

  C  = loadSound("Files/C.mp3");
  D  = loadSound("Files/D.mp3");
  Eb = loadSound("Files/Eb.mp3");
  F  = loadSound("Files/F.mp3");
  G  = loadSound("Files/G.mp3");
  Ab = loadSound("Files/Ab.mp3");
B  = loadSound("Files/B.mp3");
Cc = loadSound("Files/Cc.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
}

function draw() {

  if (mode == 0) {
    splash.show();

    if (mouseIsPressed && splash.update()) {
      mode = 1;
    }
  }

  if (mode == 1) {
    splash.hide();

    background(0);

    for (let i = 0; i < circles.length; i++) {
  let c = circles[i];

  push();
  translate(c.x, c.y);
  rotate(c.angle);

  noStroke();
  fill(c.col);

  beginShape();

for (let j = 0; j < 10; j++) {
  let angle = map(j, 0, 10, 0, TWO_PI);

  let radius = c.size + sin(frameCount * 0.05 + c.offset + j) * 20;

  let x = cos(angle) * radius;
  let y = sin(angle) * radius;

  vertex(x, y);
}

endShape(CLOSE);

  pop();

  // movement
  c.x += c.speedX + noise(c.x * 0.01, c.y * 0.01) - 0.5;
  c.y += c.speedY + noise(c.y * 0.01, c.x * 0.01) - 0.5;

  c.angle += c.rotSpeed;

 
  if (c.x < -50 || c.x > width + 50 || c.y < -50 || c.y > height + 50) {
    circles.splice(i, 1);
    i--;
  }
}
  }
}

function mousePressed() {
  userStartAudio();
}

function playSound(sound) {
  if (sound && sound.isLoaded()) {
    sound.play();
  }
}

function addShape(col) {
  circles.push({
    x: random(width),
    y: random(height),
    size: random(50, 120),
    col: col,
    angle: random(TWO_PI),
    speedX: random(-3, 3),
    speedY: random(-3, 3),
    rotSpeed: random(-0.08, 0.08),
    offset: random(1000)
  });
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    playSound(C);
    addShape(color(255, 180, 200));
  } 
  else if (key === 's' || key === 'S') {
    playSound(D);
    addShape(color(180, 220, 255));
  } 
  else if (key === 'd' || key === 'D') {
    playSound(Eb);
    addShape(color(255, 200, 140));
  } 
  else if (key === 'f' || key === 'F') {
    playSound(F);
    addShape(color(255, 245, 180));
  } 
  else if (key === 'g' || key === 'G') {
    playSound(G);
    addShape(color(170, 240, 230));
  }
  else if (key === 'h' || key === 'H') {
  playSound(Ab);
  addShape(color(210, 180, 255));
}
else if (key === 'j' || key === 'J') {
  playSound(B);
  addShape(color(255, 170, 220));
}
else if (key === 'k' || key === 'K') {
  playSound(Cc);
  addShape(color(180, 255, 210));
}
}