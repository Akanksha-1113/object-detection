img = "";
status = "";
objectDetector = "";
objects = [];

function preload() {
    img = loadImage('https://m.media-amazon.com/images/I/81UwwWhquFL._AC_SX466_.jpg');
}

function modeLoaded() {
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    objects = results;
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status : detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : object detected";

        fill("#03ecfc");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+ " " + percent + "%", objects[i].x + 15,objects[i].y )
        noFill();
        stroke("#03ecfc");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}