//pomodoro

const timeToString = time => time.toString().padStart(2, '0');

//Set Global variables
const initialTimes = {
    minutes: 5,
    seconds: 0,
};
const secondsRemaining = (minutes=initialTimes.seconds) => ({'seconds': minutes * 60});

const currentTimes = {};
const setCurrentTimes = (minutes, seconds) => {
    currentTimes.minutes = minutes;
    currentTimes.seconds = seconds;
};

setCurrentTimes(initialTimes.minutes, initialTimes.seconds);

const workSession = {id: null,};
const workDurationDisplay = document.getElementById('work-duration');
const incrementWorkDurationButton = document.getElementById(
    'add-time'
);
const decrementWorkDurationButton = document.getElementById(
    'subtract-time'
);
const durationLimit = {
    max: 59,
    min: 1,
};

const setWorkDurationDisplay = minutes => {
    workDurationDisplay.textContent = timeToString(minutes);
};

// Config Work Duration
setWorkDurationDisplay(initialTimes.minutes);

// Increment Work Duration
incrementWorkDurationButton.addEventListener("click", () => {
    initialTimes.minutes += 1;

    if (initialTimes.minutes > durationLimit.max){
        initialTimes.minutes = durationLimit.max;
    };

    setWorkDurationDisplay(initialTimes.minutes);
});


// Decrement Work Duration
decrementWorkDurationButton.addEventListener("click", () => {
    initialTimes.minutes -= 1;

    if (initialTimes.minutes < durationLimit.min){
        initialTimes.minutes = durationLimit.min;
    };

    setWorkDurationDisplay(initialTimes.minutes);
});

const displayMinutes = document.getElementById('display-minutes');
const displaySeconds = document.getElementById('display-seconds');

const setTimerDisplay = (minutes, seconds) => {
    displayMinutes.textContent = timeToString(minutes);
    displaySeconds.textContent = timeToString(seconds);
}

setTimerDisplay(initialTimes.minutes, initialTimes.seconds);

const resetTimer = () => {
    if (workSession.id) {
        setStartIcon();
        clearTimerSession();
    }
    setCurrentTimes(
        initialTimes.minutes,
        secondsRemaining(initialTimes.minutes).seconds
    );
    setTimerDisplay(initialTimes.minutes, initialTimes.seconds);
};


const timerCountDown = () => {
    let seconds = currentTimes.seconds;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    setTimerDisplay(minutes, seconds);
    currentTimes.seconds--;

    if (currentTimes.seconds < 0) {
        setTimeout(resetTimer, 1000);
    }
};


// Timer Buttons
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const ICON = {
    start: '&#9654;',
    pause: '&#9208;',
    reset: '&#8634;',
};

const setStartIcon = () => { startButton.innerHTML = ICON.start; };
const setPauseIcon = () => { startButton.innerHTML = ICON.pause; };


const clearTimerSession = () => {
    clearInterval(workSession.id);
    workSession.id = null;
};

const pauseTimer = () => {
    setStartIcon();
    clearTimerSession();
};

const startTimer = () => {
    setPauseIcon();
    timerCountDown();
    workSession.id = setInterval(timerCountDown, 1000);
};


startButton.addEventListener('click', () => {
    workSession.id ? pauseTimer() : startTimer();
});


resetButton.addEventListener('click', () => {
    resetTimer();
});
