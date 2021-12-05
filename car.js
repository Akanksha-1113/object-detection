img = "";
status = "";
objectDetector = "";
objects = [];

function preload() {
    img = loadImage('https://media.istockphoto.com/photos/aerial-view-of-cars-in-traffic-picture-id159406920?k=20&m=159406920&s=612x612&w=0&h=Td8cfJU5jLDvz1hAlxQqxcThWKrNVq4RTnm69o4Cbxc=');
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