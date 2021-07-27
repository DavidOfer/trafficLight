var light_red, light_yellow, light_green;
var lights;
var lightInterval;
var repeatInterval;
var yellowOn = false;
var redDuration;
var greenDuration;
var yellowStart;
var yellowEnd;
var greenStart;
var greenEnd;
var timeOutArray;


function init() {
    light_red = document.getElementById("light_red");
    light_yellow = document.getElementById("light_yellow");
    light_green = document.getElementById("light_green");
    lights = [light_red, light_yellow, light_green];
    redDuration = 3000;
    greenDuration = 3000;
    setTiming();
    isRepeatOn = false;
    timeOutArray = [];
}
function setTiming() {
    yellowStart = redDuration - 1000;
    yellowEnd = yellowStart + 3000;
    greenStart = yellowEnd;
    greenEnd = yellowEnd + greenDuration;

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
    console.log(greenEnd);
    startTrafficLight();
    repeatInterval = setInterval(startTrafficLight, greenEnd);
}
function startTrafficLight() {
    console.log("light started!")
    turnOff();
    redLight();
    yellowLight();
    greenLight();
}
function greenLight() {
    greenStartTimeout = setTimeout(colorOn, greenStart, "greenLight", 2);
    greenEndTimeout = setTimeout(colorOff, greenEnd, "greenLight", 2);
    timeOutArray.push(greenStartTimeout);
    timeOutArray.push(greenEndTimeout);
}
function yellowLight() {
    yellowStartTimeout = setTimeout(colorOn, yellowStart, "yellowLight", 1);
    yellowEndTimeout = setTimeout(colorOff, yellowEnd, "yellowLight", 1);
    timeOutArray.push(yellowStartTimeout);
    timeOutArray.push(yellowEndTimeout);

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