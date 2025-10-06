// timer.js
let timerInterval = null;
let timeLeft = 25 * 60; // default 25 minutes in seconds
let isRunning = false;
let currentSession = 'work'; // 'work' | 'break'

// DOM elements
const textDisplay = document.getElementById('text-display');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const popup = document.getElementById('alarm-popup');
const ackBtn = document.getElementById('ack-btn');

// Format seconds to mm:ss
function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Update the timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);

    if (currentSession == 'work') {   
        textDisplay.innerHTML = "WORK";
    } else {
        textDisplay.innerHTML = "BREAK"
    }
}

// Start the timer
function startTimer() {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            playAlarm();
            switchSession();
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = currentSession === 'work' ? 25 * 60 : 5 * 60;
    updateDisplay();
}

// Switch between work/break sessions
function switchSession() {
    currentSession = currentSession === 'work' ? 'break' : 'work';
    timeLeft = currentSession === 'work' ? 25 * 60 : 5 * 60;
    updateDisplay();
    // Optionally auto-start next session:
    // startTimer();
}

let alarm = null;

function playAlarm() {
  alarm = new Audio('assets/sounds/alarm.mp3');
  alarm.loop = true; // keep playing until user stops
  alarm.play();
  showPopup();
}

function showPopup() {
  popup.classList.remove('hidden');
}

function hidePopup() {
  popup.classList.add('hidden');
  if (alarm) {
    alarm.pause();
    alarm.currentTime = 0;
  }
}

ackBtn.addEventListener('click', hidePopup);

// Initialize button listeners
function initTimer() {
    updateDisplay();
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

initTimer();