let img;
let num_triangles = 150; // default number of triangles
let spot = {x:0, y:0,};
let sVal;
let text;
let input;
let numTriangles;
let numTrianglesDisplay;
var slider;
let imgNeedsTriangles = false;

function preload() {
    // img = loadImage('_images/sunrise_800.jpg');
}

function setup() {
  // slider
  slider = createSlider(0,5000,150,50);
  slider.position(10,120);
  slider.style('width', '250px');
  slider.input(updateTriangles);
  numTriangles = slider.value();
  // slider value text
  numTrianglesDisplay = createP(slider.value());
  numTrianglesDisplay.position(280,105);
  // create file input so user can upload own image
  input = createFileInput(handleFile);
  input.position(20,70);
  // resize canvas to the size of any image we halfedge_id
  // a bit more flexible when we start adding our own images
  // can be portrait or landscape
  // img.resize(img.width, img.height);
  // cnv = createCanvas(img.width, img.height);
  // cnv = createCanvas(800,600);
  cnv = createCanvas(windowWidth*.8, windowHeight*.8);
  cnv.position(0,150);
  // original createCanvas function...setting a particular size
  // createCanvas(800, 600);
  background(255);
  pixelDensity(1);
  // call initial delaunator function to create art based on initial settings
  // triangularize(numTriangles);
};
function draw() {
  // if(img && img.width) image(img, 0, 0);
  if(imgNeedsTriangles && img && img.width > 10) {
    // img.resize(800,600);

    // scale introduces method to scale width with height of canvas no matter orientation
    var scale = canvas.height / img.height;
    // console.log("scale: " + scale);
    // console.log("width: " + canvas.width + " * " + scale);
    // console.log("height: " + img.height);
    img.resize( (img.width * scale) * 0.9, canvas.height * 0.9 );
    triangularize(img,slider.value());
    imgNeedsTriangles = false;
  }
}
function updateTriangles() {
  // if slider changes, change value in text box
  numTrianglesDisplay.html(slider.value());
  triangularize(img,slider.value());
  // console.log(slider.value());
}
function triangularize(image, numTriangles) {
  // image(img,0,0,width,height);
  img = image;
  print(img);
  img.loadPixels();
  var points = [];
  // for (var i=0; i < num_triangles; i++) {
  for (var i=0; i < numTriangles; i++) {
    points.push([Math.random()*img.width, Math.random()*img.height]);
  }
  // connecting corners
  points.push([0,0]);
  points.push([0,img.height]);
  points.push([img.width,img.height]);
  points.push([img.width,0]);
  delaunay = Delaunator.from(points);
  let triangle_points = []
  for (let triangle_id = 0; triangle_id < delaunay.triangles.length / 3; triangle_id++) {
    triangle_points = []
      for (var i = 0; i < 3; i++) {
          let halfedge_id = 3*triangle_id + i;
          let point_id = delaunay.triangles[halfedge_id];
          triangle_points.push(points[point_id]);
      }
/* I can't remmber why I wrote this originally. commented out just in case I can use it.
for (let i = 0; i < triangles.length; i += 3) {
  beginShape();
  strokeWeight(4);
  stroke(255,204,0);
  vertex(points[triangles[i]][0], points[triangles[i]][1]);
  vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
  vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
  endShape(CLOSE);
}
*/
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
}
function handleFile(file) {
  console.log("image: " + file.name);
  print(file);
  if (file.type === 'image') {
    // img = createImg(file.data, '');
    img = loadImage(file.data);
    imgNeedsTriangles = true;
  } else {
    img = null;
  }
}

function placePoints() {
  console.log("place points");
}

function sprayPoints() {
  console.log("spray points");
}

function erasePoints() {
  console.log("erase points");
}

function saveAsPNG() {
  console.log("save PNG");
}

function saveAsSVG() {
  console.log("save SVG");
}

function showHideImage() {

}

function showHideTriangles() {

}

function showHideColors() {

}

function showHidePoints() {

}

function mousePressed() {
  points.push([mouseX, mouseY]);
  triangles = Delaunay.triangulate(points);
  console.log("mousePressed");
}
