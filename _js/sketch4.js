let points = [];
let triangles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i][0], points[i][1], 5, 5);
  }
  for (let i = 0; i < triangles.length; i += 3) {
    beginShape();
    fill(255-(i / triangles.length)*255, 0, 128);
    vertex(points[triangles[i]][0], points[triangles[i]][1]);
    vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
	  vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
    endShape(CLOSE);
  }
}

function mousePressed() {
  points.push([mouseX, mouseY]);
  triangles = Delaunay.triangulate(points);
}
