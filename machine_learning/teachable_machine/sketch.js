let video;
let label = "waiting for model to load";  
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/XXyhg0ga0/';
let classImg1;
let classImg2;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  classImg1 = loadImage("hand.png");
  classImg2 = loadImage("dai.png");
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(155);
  image(video, 0, 0);
  
//das Bild wird geladen, wenn das Label über eine bestimmte Confidence kommt
  
  if (label == "hand" && confidence > 0.7) {
    image(classImg1, 0, 0, width, video.height);
  } else if (label == "face" && confidence > 0.7) {
    image(classImg2, 0, 0, width, video.height);
  }  else if (label == "nothing") {
  }
  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
  
}
