//pomodoro

const timeToString = time => time.toString().padStart(2, '0');

//Set Global variables
//let initialTimes.minutes = 25;
const initialTimes = {
    minutes: 25,
    seconds: 0,
};
const initialDisplayTimes = () => {
    return {
        minutes: timeToString(initialTimes.minutes),
        seconds: timeToString(initialTimes.seconds),
    };
};
const timeRemaining = {'seconds': initialTimes.minutes * 60}; // seconds
const currentTimes = {
    minutes: initialTimes.minutes,
    seconds: timeRemaining.seconds, //initialTimes.seconds,
};
const workSession = {'id': null,};

const workDurationDisplay = () => document.getElementById('set-work-duration');
const incrementWorkDurationButton = () => document.getElementById('add-time');
const decrementWorkDurationButton = () => document.getElementById('subtract-time');

const displayMinutes = document.getElementById('display-minutes');
const displaySeconds = document.getElementById('display-seconds');

workDurationDisplay().textContent = initialDisplayTimes().minutes;
displayMinutes.textContent = initialDisplayTimes().minutes;
displaySeconds.textContent = initialDisplayTimes().seconds;


// Timer Buttons
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const START_ICON = '&#9654;';
const PAUSE_ICON = '&#9208;';
const RESET_ICON = '&#8634;';

//currentTimes.seconds = initialTimes.minutes * 60;

startButton.addEventListener('click', () => {
    console.log(currentTimes);
    
    if (workSession.id) {
        // pauseTimer
        // set start icon
        startButton.innerHTML = START_ICON;
        clearInterval(workSession.id);
        workSession.id = null;
    }
    else {
        // startTimer
        // set pause icon
        startButton.innerHTML = PAUSE_ICON;
        console.log('No current session, starting timer: ', workSession
        .id);
        // Run timerCountDown function once before setting interval to avoid 1 s
        timerCountDown();
        workSession.id = setInterval(timerCountDown, 1000);
    }
});


resetButton.addEventListener('click', () => {
    if (workSession.id) {
        clearInterval(workSession.id);
        workSession.id = null;
        
    }

    console.log('initial: ', initialDisplayTimes(), workSession.id);
    currentTimes.minutes = initialTimes.minutes;
    currentTimes.seconds = timeRemaining.seconds; // Todo: Remove possible redundant variable...
    displayMinutes.textContent = initialDisplayTimes().minutes; //timeToString(initialTimes.minutes)//initialDisplayTimes.minutes;
    displaySeconds.textContent = initialDisplayTimes().seconds;
    console.log('reset...');
});


// Todo: Enable 
//increase work time
incrementWorkDurationButton().addEventListener("click", function(){
    initialTimes.minutes += 1;
    if (initialTimes.minutes > 59){ // Todo: Max and Min consts
        initialTimes.minutes = 59;
    };
    workDurationDisplay().textContent = initialTimes.minutes;
}, false);

//decrease work time
decrementWorkDurationButton().addEventListener("click", function(){
    initialTimes.minutes -= 1;
    //workDurationDisplay().innerHTML = workDuration;
    if (initialTimes.minutes < 1){ // Todo: Max of 59
        initialTimes.minutes = 1;
    };
    workDurationDisplay().textContent = initialTimes.minutes;
}, false);





// Todo: ES6, move since arrow functions are not hoisted...
function timerCountDown(){
    let seconds = currentTimes.seconds;
    let minutes = Math.floor(seconds / 60);
//    let hours = Math.floor(seconds / 3600);
//    seconds -= hours * 3600;
    seconds -= minutes * 60;
    //document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) + "時 " + ('00' + minutes).slice(-2) + "分 " + ('00' + seconds).slice(-2)　+ "秒";
    displayMinutes.textContent = timeToString(minutes);
    displaySeconds.textContent = timeToString(seconds);
    console.log('current: ', currentTimes.seconds, workSession.id);
    currentTimes.seconds--;
    console.log('current: ', currentTimes.seconds, workSession.id);
    
    if (currentTimes.seconds < 0) { // Try with less than 1
        clearInterval(workSession.id);
        workSession.id = null;
        displayMinutes.textContent = timeToString(0);
        displaySeconds.textContent = timeToString(0);
    }
    
    console.log('inside workCountdown: ', workSession.id);
}
