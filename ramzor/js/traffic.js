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
    redInputDuration = document.getElementById("redInput");
    greenInputDuration = document.getElementById("greenInput");
    lights = [light_red, light_yellow, light_green];
    redDuration = 4000;
    greenDuration = 4000;
    setTiming();
    timeOutArray = [];
}
function setTiming() {
    yellowStart = redDuration-2000;
    yellowEnd = redDuration;
    greenStart = yellowEnd;
    greenEnd = yellowEnd + greenDuration;
    secondYellowStart=greenEnd;
    secondYellowEnd = secondYellowStart+3000;
}
function setDurations()
{
    redDuration=Number(redInputDuration.value)*1000;
    greenDuration=Number(greenInputDuration.value)*1000;
    setTiming();
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
    
    console.log("red duration: "+redDuration);
    console.log("green duration :" +greenDuration);
    RepeatTrafficLight();
    repeatInterval = setInterval(RepeatTrafficLight, secondYellowEnd);
}
function RepeatTrafficLight()
{
    startTrafficLight();
    lightStart("yellowLight",secondYellowStart,secondYellowEnd,1);
}
function startTrafficLight() {
    console.log("light started!");
    lightStart("redLight",0,redDuration,0);
    lightStart("yellowLight",yellowStart,yellowEnd,1);
    lightStart("greenLight",greenStart,greenEnd,2);
}
function lightStart(className,start,end,index)
{
    timeOutArray.push(setTimeout(colorOn, start, className, index));
    timeOutArray.push(setTimeout(colorOff, end, className, index));
}
function colorOff(color, index) {
    lights[index].classList.remove(color);
    lights[index].classList.add("lightOff");
}
function colorOn(color, index) {
    lights[index].classList.remove("lightOff");
    lights[index].classList.add(color);
}