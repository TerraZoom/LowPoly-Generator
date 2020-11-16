var hue;
let points = [];
let triangles = [];
let num_triangles = 500; // default number of triangles
let spot = {x:0, y:0,};

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  hue = random(360);
  // delaunayTriangulation = new DelaunayTriangulation();
  var points = [];
  points.push([0,0],[width,0],[width,height],[0,height]);

  background(240);
  fill(0);
  noStroke();
  for (i=0; i < num_triangles; i++) {
    spot.x = random(0, width);
    spot.y = random(0, height);
    points.push([spot.x,spot.y]);
    ellipse(points[i][0], points[i][1], 2, 2);

    triangles = Delaunay.triangulate(points);
  }
  for (let i = 0; i < triangles.length; i += 3) {
    beginShape();
    fill(255-(i / triangles.length)*255, 20, 200);
    vertex(points[triangles[i]][0], points[triangles[i]][1]);
    vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
	  vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
    endShape(CLOSE);
  }
}

function drawTriangles() {
  background(0, 0, 100);
  var triangles = delaunayTriangulation.getTriangles();
  for (var ti = 0; ti < triangles.length; ti++) {
    var t = triangles[ti];
    var sat = 0;
    var bri = 0;
    for(var vi = 0; vi < 3; vi++) {
      var v = t.vertices[vi];
      sat += v.sat;
      bri += v.bri;
    }
    sat /= 3;
    bri /= 3;
    fill(hue, sat, bri);
    stroke(hue, sat, bri);
    t.render();
  }
}

function draw() {

}
