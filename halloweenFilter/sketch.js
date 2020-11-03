// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
//let skeleton;

let noseX = 240
let noseY = 320

let saveCanvas;

function preload(){

  bg = loadImage('preloads/bg.png') //https://www.pngegg.com/en/png-oqqjk

  face = loadImage('preloads/face.png')
  pikaEarLeft = loadImage('preloads/pikaEarLeft.png')
  pikaEarRight = loadImage('preloads/pikaEarRight.png')
  
  dogFace = loadImage('preloads/dogFace.png')
  dogEarL = loadImage('preloads/dogEarL.png')
  dogEarR = loadImage('preloads/dogEarR.png')
  
  catFace = loadImage('preloads/catNose.png')
  catEarL = loadImage('preloads/catEarL.png')
  catEarR = loadImage('preloads/catEarR.png')
  
  eyeballsL= loadImage('preloads/eyeballsL.png')
  eyeballsR= loadImage('preloads/eyeballsR.png')
  
}

function setup() {
  createCanvas(640, 570);
  
  video = createCapture(VIDEO);
  video.hide();
  
  // Hook up poseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  
  myButton = new Clickable();
  myButton.resize(60, 40);
  myButton.locate(110, height-70);
  myButton.cornerRadius = 13; 
  myButton.textColor = "#000000"; 
  myButton.textSize = 15;   
  myButton.text = "Pupper";  
  
    myButton.onHover = function () {  
        this.color = "#fae17d"        
  }
  
    myButton.onOutside = function () {
    this.color = "#d47b74";
  }
  
  myButton2 = new Clickable();
  myButton2.resize(60, 40);
  myButton2.locate(30, height-70);
  myButton2.cornerRadius = 13;
  myButton2.textColor = "#000000"; 
  myButton2.textSize = 15;   
  myButton2.text = "Pikachu"; 
  
    myButton2.onHover = function () {  
        this.color = "#fae17d"        
  }
  
    myButton2.onOutside = function () {
    this.color = "#d47b74";
  }
  
  myButton3 = new Clickable();
  myButton3.resize(60, 40);
  myButton3.locate(190, height-70);
  myButton3.cornerRadius = 13; 
  myButton3.textColor = "#000000"; 
  myButton3.textSize = 15;   
  myButton3.text = "Zombie"; 
  
    myButton3.onHover = function () {  
        this.color = "#fae17d"        
  }
  
    myButton3.onOutside = function () {
    this.color = "#d47b74";
  }
  
  myButton4 = new Clickable();
  myButton4.resize(60, 40);
  myButton4.locate(270, height-70);
  myButton4.cornerRadius = 13; 
  myButton4.textColor = "#000000"; 
  myButton4.textSize = 15;   
  myButton4.text = "Kitty"; 
  
    myButton4.onHover = function () {  
        this.color = "#fae17d"        
  }
  
    myButton4.onOutside = function () {
    this.color = "#d47b74";
  }

  
  myButton0 = new Clickable();
  myButton0.resize(60, 40);
  myButton0.locate(width-90, height-70);
  myButton0.cornerRadius = 13;
  myButton0.textColor = "#000000"; 
  myButton0.textSize = 19;   
  myButton0.text = "Save"; //this saves the canvas as a downloaded png
  
    myButton0.onHover = function () {  
        this.color = "#95bcfc"        
  }
  
    myButton0.onOutside = function () {
    this.color = "#d3fc95";
  }
  
  saveCanvas =  createGraphics(width, height-90);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

var flag = 0;
function draw() {
  image(video, 0, 0);
  image(bg,0,0,width,height-100)
  myButton0.draw()
  myButton.draw()
  myButton2.draw()
  myButton3.draw()
  myButton4.draw()
  //drawPika()

    if (flag==1) {
        drawDog();
    }

    if (flag == 2) {
        drawPika();
    }
    if (flag == 3) {
        drawEyes()
    }
    if (flag==4) {
        drawCat();
    }
  
  
  myButton.onRelease = function () {  
        flag = 1;          
  }

  myButton2.onRelease = function(){  
      flag = 2;          
  } //how to switch
  
  myButton3.onRelease = function () {  
        flag = 3;          
  }
    
  myButton4.onRelease = function () {  
        flag = 4;          
  }
  
  myButton0.onRelease = function(){  
      saveToFile()         
  }

// drawPikaFace()
//   if (pose) {
//     print(pose);
//     let eyeR = pose.rightEye;
//     let eyeL = pose.leftEye;
//     let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
//     fill(255, 0, 0);
//     ellipse(pose.nose.x, pose.nose.y, d);
//     //fill(0, 0, 255);
    
//     noseX = (noseX + pose.nose.x)/2
//     noseY = (noseY + pose.nose.y)/2
//    // ellipse(noseX,noseY,30)
//     image(pikaNose, pose.nose.x-45, pose.nose.y-10, 100,60)
//     image(pikaNose, noseX-45, noseY-10, 100,60)
    
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       fill(0, 255, 0);
//       if(pose.keypoints[i].score > 0.55){
//       fill('red')
//       //ellipse(x, y, 16, 16);
//       image(pikaNose, pose.nose.x-45, pose.nose.y-10, 100,60)
//       } //only draw if confidence bigger than 60%
      
//    }//green dots

//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       strokeWeight(2);
//       stroke(255);
//       line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }
//   }
}

function drawPika(){
  if(pose){
    
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    print(pose)
    noseX = (noseX + pose.nose.x)/2
    noseY = (noseY + pose.nose.y)/2

    image(face, noseX-d*2.8, noseY-d*4.3, d*6,d*6)
    image(pikaEarLeft, noseX-2.7*d, noseY-d*3.5, d*5.5,d*4.3)
    image(pikaEarRight, noseX-2.7*d, noseY-d*3.5, d*5.5,d*4.3)

  }
}

function drawDog(){
  if(pose){
        
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    noseX = (noseX + pose.nose.x)/2
    noseY = (noseY + pose.nose.y)/2
    
    image(dogFace, noseX-d*2.3, noseY-d*4.3, d*5,d*6)
    image(dogEarL, noseX-2.3*d, noseY-d*3.5, d*5,d*4.3)
    image(dogEarR, noseX-2.4*d, noseY-d*3.5, d*5,d*4.3)

  }
}

function drawEyes(){
  if(pose){
        
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    noseX = (noseX + pose.nose.x)/2
    noseY = (noseY + pose.nose.y)/2
    
   // image(dogFace, noseX-d*2.3, noseY-d*4.3, d*5,d*6)
    image(eyeballsL, noseX-2.6*d + random()*10, noseY-d*3.8, d*5.5,d*5.5)
    image(eyeballsR, noseX-2.7*d - random()*10, noseY-d*3.82, d*5.5,d*5.5)

  }
}

function drawCat(){
  if(pose){
        
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    noseX = (noseX + pose.nose.x)/2
    noseY = (noseY + pose.nose.y)/2
    
    image(catFace, noseX-d*2.3, noseY-d*4.3, d*4.8,d*6)
    image(catEarL, noseX-2*d, noseY-d*3.5, d*4,d*4.3)
    image(catEarR, noseX-2*d, noseY-d*3.5, d*4,d*4.3)

  }
}


function saveToFile() {
    let c = get(0,0,width, 480);
    saveCanvas.image(c, 0, 0);
    save(saveCanvas, frameCount+".png");
}