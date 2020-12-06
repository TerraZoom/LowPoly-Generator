let img;
let num_triangles = 50; // default number of triangles
let spot = {x:0, y:0,};
let sVal;
let points = [];
let triangles = [];
let pointButton;
let sprayButton;
let drawPointsState = false;
let sprayPointsState = false;
let sprayDensity = 10;
let random;


function preload() {
    img = loadImage('_images/sunrise_800.jpg');
}

function setup() {
  img.resize(img.width, img.height)
   createCanvas(img.width, img.height);

   background(255);
   pixelDensity(1)
   img.loadPixels();
   // loadPixels()

   // connecting corners
   points.push([0,0]);
   points.push([0,img.height]);
   points.push([img.width,img.height]);
   points.push([img.width,0]);

   updateTriangles(img,num_triangles);

   pointButton = createButton('points');
   pointButton.position(20,620);
   pointButton.mouseClicked(drawPoints);

   sprayButton = createButton('spray');
   sprayButton.position(80,620);
   sprayButton.mouseClicked(sprayPoints);


};

function draw() {
    delaunay = Delaunator.from(points);
    for (let triangle_id = 0; triangle_id < delaunay.triangles.length / 3; triangle_id++) {
      triangle_points = []
        for (var i = 0; i < 3; i++) {
            let halfedge_id = 3*triangle_id + i;
            let point_id = delaunay.triangles[halfedge_id];
            triangle_points.push(points[point_id]);
        }

      var center_x = (triangle_points[0][0] + triangle_points[1][0] + triangle_points[2][0]) / 3;
      var center_y = (triangle_points[0][1] + triangle_points[1][1] + triangle_points[2][1]) / 3;
      var index = (floor(center_x) + floor(center_y) * img.width) * 4;
      // console.log("index: " + index);
      var r = img.pixels[index];
      var b = img.pixels[index + 1];
      var g = img.pixels[index + 2];
      var a = img.pixels[index + 3];
      // console.log("red: " + r);
      fill(r,b,g,a);
      stroke(r,b,g,a);
      strokeWeight(1);
      beginShape();
        vertex(triangle_points[0][0],triangle_points[0][1]);
        vertex(triangle_points[1][0],triangle_points[1][1]);
        vertex(triangle_points[2][0],triangle_points[2][1]);
      endShape();
  }

  if (sprayPointsState == true) {
      drawPointsState = false;

      // let's show a circle
      strokeWeight(2);
      let sprayX = 200;
      let sprayY = 200;
      let sprayRadius = 150;
      noFill();
      stroke(200, 200, 200);
      ellipse(mouseX, mouseY, sprayRadius * 2, sprayRadius * 2);

      // console.log(mouseX + "|" + mouseY);


    }
}

function updateTriangles() {
  // if slider changes, change value in text box
  triangularize(img,num_triangles);
}

function triangularize(image, numTriangles) {
  console.log("triangle me");

  for (var i=0; i < numTriangles; i++) {
    points.push([Math.random()*img.width, Math.random()*img.height]);
  }

  img = image;
  print(img);
  img.loadPixels();
}

function mousePressed() {

  console.log("mousePressed: " + mouseX + "|" + mouseY);
  console.log("points: " + points.length + " - " + points);

  if (sprayPointsState == true) {

  sprayDensity = 10;
  sprayRadius = 100;
  for (var i=0; i < sprayDensity; i++) {

    // random angle
    var ra = Math.random() * 2 * PI; // random angle within circle
    var rr = sprayRadius * sqrt(Math.random()); //random radius within circle
    // circleX mouse click X of circle
    // circleY mouse click Y of circle

    var newX = sprayRadius * cos(rr) + mouseX;
    var newY = sprayRadius * sin(rr) + mouseY;


    // console.log('x: ' + newX + " | y: " + newY);

    points.push([mouseX, mouseY]);
    triangles = Delaunator.from(points);

    // ellipse(points[i][0], points[i][1], 5, 5);
}
  }

}

function drawPoints() {
  drawPointsState = !drawPointsState;
  if (drawPointsState == true ) {
    sprayPointsState = false;
    console.log('drawing my points');
    console.log('spray points state is ' + sprayPointsState);
  }
  console.log('draw points status: ' + drawPointsState);
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i][0], points[i][1], 5, 5);
  }
}

function sprayPoints() {
  sprayPointsState = !sprayPointsState;
      console.log('spraying my points');
      console.log('draw points state is ' + drawPointsState);
  console.log('spray points status: ' + sprayPointsState);
  updateTriangles();


}
