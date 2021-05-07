
let r = 70;
let scale1 = 0.99;
let scale2 = 0.1;
var diaNoise = 0;

let displayedMask = null;

function displayMask(mask, x, y) {
  displayedMask = {
    mask,
    x,
    y
  };
}

const regionsOfInterest = [{
  x: 700,
  y: 300,
  masks: [],
  folder: 'Africa',
  numberOfImages: 15,
},
{
  x: 1125,
  y: 350,
  masks: [],
  folder: 'AusOcean',
  numberOfImages: 8,
},
{
  x: 650,
  y: 100,
  masks: [],
  folder: 'Europe',
  numberOfImages: 13,
},
{
  x: 425,
  y: 400,
  masks: [],
  folder: 'SouthAmerica',
  numberOfImages: 7,
}];



function preload() {
  mapimg = loadImage('map.png');
  for (var j = 0; j < regionsOfInterest.length; j++) {
    for (var i = 0; i < regionsOfInterest[j].numberOfImages; i++) {

      regionsOfInterest[j].masks[i] = loadImage(regionsOfInterest[j].folder + '/seed' + i + '.png');
    }

  }

}

function isCloseToRegion(region) {
  let d = dist(mouseX, mouseY, region.x, region.y);
  return (d < r / 4);
}


function setup() {
  createCanvas(1300, 1000);


}

function draw() {
  image(mapimg, 0, 0, scale1 * width, scale1 * mapimg.height * width / mapimg.width);

  noStroke();
  fill(100, 0, 0, 100);
  let r = map(noise(diaNoise), 0, 1, 10, 30);
  diaNoise += 0.03;
  for (let i = 0; i < regionsOfInterest.length; i++) {

    ellipse(regionsOfInterest[i].x, regionsOfInterest[i].y, r, r);
  }

  if (displayedMask !== null) {

    // const {mask,x,y}= displayedMask;
    const mask = displayedMask.mask;
    const x = displayedMask.x;
    const y = displayedMask.y;
    image(mask, x, y, scale2 * width, scale2 * mask.height * width / mask.width);
  }

  let isCloseToAnyRegion = false;

  for (let i = 0; i < regionsOfInterest.length; i++) {
    if (isCloseToRegion(regionsOfInterest[i])) {
      isCloseToAnyRegion = true;
    }
  }
  if (!isCloseToAnyRegion) {
    displayedMask = null;
  }

}


function mousePressed() {


  for (let i = 0; i < regionsOfInterest.length; i++) {
    if (isCloseToRegion(regionsOfInterest[i])) {

      console.log("clicked on bubble");
      let mask = random(regionsOfInterest[i].masks);
      displayMask(mask, mouseX, mouseY);
    }
  }

}



