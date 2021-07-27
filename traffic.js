var light_red, light_yellow, light_green;
var lights;
var lightInterval;
var repeatInterval;
var yellowOn = false;
var redDuration;
var greenDuration;
var yellowStart;
var yellowEnd;
var secondYellowStart;
var secondYellowEnd;
var greenStart;
var greenEnd;
var timeOutArray;
var repeat;


function init() {
    light_red = document.getElementById("light_red");
    light_yellow = document.getElementById("light_yellow");
    light_green = document.getElementById("light_green");
    lights = [light_red, light_yellow, light_green];
    redDuration = 4000;
    greenDuration = 4000;
    setTiming();
    timeOutArray = [];
}
function setTiming() {
    yellowStart = redDuration - 1000;
    yellowEnd = yellowStart + 3000;
    greenStart = yellowEnd;
    greenEnd = yellowEnd + greenDuration;
    secondYellowStart=greenEnd - 1000;
    secondYellowEnd = secondYellowStart+3000;
}

function turnOff() {
    clearInterval(lightInterval);
    clearInterval(repeatInterval);
    timeOutArray.forEach(item => { clearTimeout(item) });
    lights.forEach(element => {
        element.className = "lightBox";
        element.classList.add("lightOff");
    });
}

function startYellowBlink() {
    turnOff();
    lightInterval = setInterval(yellow_blink, 1000);
}
function yellow_blink() {
    if (yellowOn) {
        light_yellow.classList.remove("yellowLight");
        light_yellow.classList.add("lightOff")
    } else {
        light_yellow.classList.remove("lightOff");
        light_yellow.classList.add("yellowLight")
    }
    yellowOn = !yellowOn;
}
function repeatStart() {
    console.log(secondYellowEnd);
    RepeatTrafficLight();
    repeatInterval = setInterval(RepeatTrafficLight, secondYellowEnd);
}
function RepeatTrafficLight()
{
    startTrafficLight();
    yellowLight(secondYellowStart,secondYellowEnd);
}
function startTrafficLight() {
    console.log("light started!")
    redLight();
    yellowLight(yellowStart,yellowEnd);
    greenLight();
}
function greenLight() {
    console.log("green is on");
    greenStartTimeout = setTimeout(colorOn, greenStart, "greenLight", 2);
    greenEndTimeout = setTimeout(colorOff, greenEnd, "greenLight", 2);
    timeOutArray.push(greenStartTimeout);
    timeOutArray.push(greenEndTimeout);
}
function yellowLight(start,end) {
    timeOutArray.push(setTimeout(colorOn, start, "yellowLight", 1));
    timeOutArray.push(setTimeout(colorOff, end, "yellowLight", 1));
}
function redLight() {
    colorOn("redLight", 0);
    redEndTimeout = setTimeout(colorOff, redDuration, "redLight", 0);
    timeOutArray.push(redEndTimeout);
}
function colorOff(color, index) {
    lights[index].classList.remove(color);
    lights[index].classList.add("lightOff");
}
function colorOn(color, index) {
    lights[index].classList.remove("lightOff");
    lights[index].classList.add(color);
}