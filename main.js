song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");

    peterpan = song2.isPlaying();
    console.log(peterpan);
    harrypotter = song1.isPlaying();
    console.log(harrypotter);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(peterpan == false){
            song2.play();
            console.log("Song Name: Peter Pan Theme");
            document.getElementById("name").innerHTML = "Song Name: Peter Pan";
        }
}
if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristX,20);
    song2.stop();
    if(harrypotter == false){
        song1.play();
        console.log("Song Name: Harry Potter Theme Song");
        document.getElementById("name").innerHTML = "Song Name: Harry Potter Theme Song";
    }
}
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y; 
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;        
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}