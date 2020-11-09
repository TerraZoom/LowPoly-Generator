let points = [];
let triangles = [];
let slider;
let num_triangles = 500; // default number of triangles
let spot = {x:0, y:0,};
let sVal;

function setup() {
  cnv = createCanvas(600, 600);
  background(240);
  cnv.position(10,40);
  // draw the numTriangles slider
  slider = createSlider(0, 3000, 500, 50);
  slider.position(10,10);
  slider.style('width', '400px');
  // number of triangles textSize
  const sVal = slider.value();
  // text('Number of Triangles', slider.x * 2 + slider.width, 0);

    console.log(sVal);


  generatePoints();

}

function generatePoints() {

}

function draw() {
  for (let i = 0; i < sVal; i++) {
      spot.x = random(0, width);
      spot.y = random(0, height);
      points.push([spot.x,spot.y]);
      ellipse(points[i][0], points[i][1], 5, 5);
    }

}
