const timer = document.querySelector('#pomodoro-time');
const btnStart = document.querySelector('#start');
const btnBreak = document.querySelector('#break');
const btnPomodoro = document.querySelector('#pomodoro');
const btnReset = document.querySelector('#reset')

//глобальные переменные всегда выносим наверх и глобальные выборки тоже
let timerId = null;
let isRunning = false; //режим запущен или не запущен
let mode = 'pomodoro';

btnPomodoro.addEventListener('click', () => {
    mode = 'pomodoro';
    timer.textContent = '25:00';
    btnBreak.classList.remove('active');
    btnPomodoro.classList.add('active');
    stopTimer();
})

btnBreak.addEventListener('click', () => {
    mode = 'break'
    timer.textContent = '05:00';
    btnPomodoro.classList.remove('active');
    btnBreak.classList.add('active');
    stopTimer();
})

btnReset.addEventListener('click', () => {
    resetFunc()
})

btnStart.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        return;
    }

    timerId = setInterval(runTimer, 0);
    //код запущен или не запущен
    isRunning = !isRunning;
    //меняем текст на кнопке, если запущен, то стоп, иначе старт
    btnStart.textContent = isRunning ? 'stop' : 'start';
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
    if (!minutes && !seconds) {
        resetFunc();
    }
}

function format(value) {
    if (value < 10) {
        return `0${value}`;
    }
    return value;
}

function resetFunc() {
    stopTimer();
    if (mode === 'pomodoro') {
        timer.textContent = '25:00';
    } else {
        timer.textContent = '05:00';
    }
}