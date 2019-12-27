//pomodoro

//Set Global variables
let workClicks = 25;
const workDisplay = document.getElementById("set-minutes");
let count = 0;
let workSession;

//increase work time
const increaseWork = document.getElementById("add-time");
increaseWork.addEventListener("click", function(){
    workClicks += 1;
    workDisplay.innerHTML = workClicks;
}, false);

//decrease work time
const decreaseWork = document.getElementById("subtract-time");
decreaseWork.addEventListener("click", function(){
    workClicks -= 1;
    workDisplay.innerHTML = workClicks;
    if (workClicks < 1){
        workClicks = 1;
        workDisplay.innerHTML = workClicks;
    };
}, false);


//start button
function start(){
    count = workClicks * 60;
    workSession = setInterval(workCountDown, 1000);//count down function
}

//workCountDown()

function workCountDown(){
    debugger;
    let seconds = count;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    seconds -= minutes * 60; 
    document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) + "時 " + ('00' + minutes).slice(-2) + "分 " + ('00' + seconds).slice(-2)　+ "秒";
    count--;

    if (count < 0){
        clearInterval(workSession);
        workSession = null;
        document.getElementById("showtime").innerHTML = "00時 00分 00秒";
    }

}


//pause button
function pause(){
    clearInterval(workSession);
    workSession = null;
}


//resume button
function resume(){
    workSession = setInterval(workCountDown, 1000);
}


//reset button
function reset(){
    if(workSession){
        clearInterval(workSession);
        workSession = null;
    } 

    document.getElementById("showtime").innerHTML = "00時 00分 00秒";
    document.getElementById("pause").disabled = false;
    document.getElementById("resume").disabled = false;
}

