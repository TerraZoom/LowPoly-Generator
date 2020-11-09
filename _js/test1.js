let points = [];
let triangles = [];
let slider;
let num_triangles = 100; // default number of triangles
let spot = {x:0, y:0,};
let sVal;

function setup() {
  cnv = createCanvas(600, 600);
  cnv.position(10,40);
  // draw the numTriangles slider
  slider = createSlider(0, 3000, 500, 50);
  slider.position(10,10);
  slider.style('width', '400px');

  // add corner points to points array
  points.push([0,0],[width,0],[width,height],[0,height]);

}

function draw() {
  background(240);
  fill(0);
  noStroke();
    sVal = 100; // slider.value();

  for (i=0; i < sVal; i++) {
    spot.x = random(0, width);
    spot.y = random(0, height);
    points.push([spot.x,spot.y]);
    ellipse(points[i][0], points[i][1], 2, 2);

    triangles = Delaunator.from(points);
    // triangles = Delaunay.triangulate(points);
  }
  for (let i = 0; i < triangles.length; i += 3) {
    beginShape();
    fill(255-(i / triangles.length)*255, 128, 0);
    vertex(points[triangles[i]][0], points[triangles[i]][1]);
    vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
	  vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
    endShape(CLOSE);
  }

  console.log(sVal);
}
