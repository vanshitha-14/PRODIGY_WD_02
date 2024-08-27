let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

function startStopwatch() {
    if (isRunning) return;
    isRunning = true;
    let startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateStopwatch();
    }, 10);
}

function stopStopwatch() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    laps = [];
    updateStopwatch();
    updateLaps();
}

function lapStopwatch() {
    if (!isRunning) return;
    laps.push(elapsedTime);
    updateLaps();
}

function updateStopwatch() {
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    document.getElementById('stopwatch').innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function updateLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const time = new Date(lapTime);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        const lapElement = document.createElement('div');
        lapElement.innerText = `Lap ${index + 1}: ${minutes}:${seconds}:${milliseconds}`;
        lapsContainer.appendChild(lapElement);
    });
}
