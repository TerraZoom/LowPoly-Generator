//source https://observablehq.com/d/e98821f1fc998c9e
let img;
var points;
var delaunay, voronoi

function preload() {
  img = loadImage('_images/vader-main.webp');
}


function setup() {
  createCanvas(800, 800);
  img.loadPixels();
  createPoints()
}

function prepareImg() {
  let data = new Float64Array(img.width * img.height);
  let rgba = img.pixels
  let n = rgba.length / 4
  for (let i = 0; i < n; ++i) {
    data[i] = Math.max(0, 1 - rgba[i * 4] / 254);
  }
  n = Math.round(img.width * img.height / 40)
  console.log('n:',n,'h:',img.height,'w:',img.width)
  return {
    data,
    n
  }
}

function createPoints() {
  const {
    data,
    n
  } = prepareImg()
  points = new Float64Array(n * 2);
  const c = new Float64Array(n * 2);
  const s = new Float64Array(n);

  // Initialize the points using rejection sampling.
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < 30; ++j) {
      const x = points[i * 2] = Math.floor(Math.random() * img.width);
      const y = points[i * 2 + 1] = Math.floor(Math.random() * img.height);
      if (Math.random() < data[y * img.width + x]) break;
    }
  }

  delaunay = new d3.Delaunay(points);
  voronoi = delaunay.voronoi([0, 0, img.width, img.height]);

  for (let k = 0; k < 80; ++k) {

    // Compute the weighted centroid for each Voronoi cell.
    c.fill(0);
    s.fill(0);
    for (let y = 0, i = 0; y < img.height; ++y) {
      for (let x = 0; x < img.width; ++x) {
        const w = data[y * img.width + x];
        i = delaunay.find(x + 0.5, y + 0.5, i);
        s[i] += w;
        c[i * 2] += w * (x + 0.5);
        c[i * 2 + 1] += w * (y + 0.5);
      }
    }

    // Relax the diagram by moving points to the weighted centroid.
    // Wiggle the points a little bit so they don’t get stuck.
    const w = Math.pow(k + 1, -0.8) * 10;
    for (let i = 0; i < n; ++i) {
      const x0 = points[i * 2],
        y0 = points[i * 2 + 1];
      const x1 = s[i] ? c[i * 2] / s[i] : x0,
        y1 = s[i] ? c[i * 2 + 1] / s[i] : y0;
      points[i * 2] = x0 + (x1 - x0) * 1.8 + (Math.random() - 0.5) * w;
      points[i * 2 + 1] = y0 + (y1 - y0) * 1.8 + (Math.random() - 0.5) * w;
    }
    voronoi.update();
  }
}

function getPoints() {
  const _points = []
  const {
    points,
    halfedges,
    triangles
  } = delaunay;

  let n = halfedges.length
  for (let i = 0; i < n; ++i) {
    const j = halfedges[i];
    if (j < i) continue;
    const ti = triangles[i];
    const tj = triangles[j];
    _points.push([points[ti * 2], points[ti * 2 + 1]])
    _points.push([points[tj * 2], points[tj * 2 + 1]])
  }
  return _points;
}

function drawPoints() {
  const points = getPoints();
  points.forEach(tuple => point(tuple[0], tuple[1]))
}

function drawTriangles(){
  const points = getPoints();
  for(let i=0; i<points.length-1;i+=2){
    line(points[i][0],points[i][1],points[i+1][0],points[i+1][1])
  }
}


function draw() {
  background(220);
  image(img, 0, 0, 50, 50)
  drawPoints();
  console.log(delaunay.points.length)
  drawTriangles()
  noLoop();
}
