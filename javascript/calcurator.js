let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const resultDisplay = document.querySelector('.result');
const historyDisplay = document.querySelector('.history');

function updateDisplay() {
    resultDisplay.textContent = currentInput;
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (currentInput === '0' && number !== '.') {
        currentInput = '';
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    historyDisplay.textContent = `${previousInput} ${op}`;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
        default: return;
    }
    
    historyDisplay.textContent = `${previousInput} ${operator} ${currentInput} =`;
    currentInput = computation.toString();
    operator = null;
    updateDisplay();
    shouldResetScreen = true;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    historyDisplay.textContent = '';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// ISHA LIVE
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // saa 0 ibe saa 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    document.getElementById('live-time').textContent = `${hours}:${minutes}`;
}

// Tangiza isaha ikajya ivugurura buri munota
updateTime();
setInterval(updateTime, 60000);