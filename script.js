const timer = document.querySelector('#pomodoro-time');
const btnStart = document.querySelector('#start');

let timerId = null;
let isRunning = false;
btnStart.addEventListener('click', function startTimer() {
    if (isRunning) {
        stopTimer();
        return;
    }
    timerId = setInterval(runTimer, 0);
    isRunning = !isRunning;
    btnStart.textContent(isRunning) ? 'stop' : 'start';
})

function stopTimer() {
    clearInterval(timerId);
    isRunning = false;
    btnStart.textContent = 'start';
}

function runTimer() {
    const time = timer.textContent.split(':');
    let minutes = +time[0];
    let seconds = +time[1];
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }
    if (minutes >= 0 && seconds >= 0) {
        timer.textContent = `${format(minutes)}:${format(seconds)}`
    }
    if (minutes === 0 && seconds === 0) {
        stopTimer();
        timer.textContent = '25:00';
    }
}

function format(value) {
    if (value < 10) {
        return `0${value}`;
    }
    return value;
}