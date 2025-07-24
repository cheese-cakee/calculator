
let currentNumber = "0";
let previousNumber = "";
let operator = "";
let shouldResetScreen = false;

const screen = document.getElementById("screen");
const moodDisplay = document.getElementById("moodDisplay");

const moods = ["😊", "🤔", "😎", "🤓", "😄", "🧐", "😇"];
let currentMoodIndex = 0;

// Update the screen
function updateScreen() {
    screen.textContent = currentNumber;
    
    
    if (currentNumber.length > 10) {
        screen.style.fontSize = "24px";
    } else if (currentNumber.length > 8) {
        screen.style.fontSize = "28px";
    } else {
        screen.style.fontSize = "32px";
    }
}


function addNumber(num) {
    
    addClickEffect();
    
    if (currentNumber === "0" || shouldResetScreen) {
        currentNumber = num;
        shouldResetScreen = false;
    } else {
        currentNumber += num;
    }
    
    updateScreen();
    changeMood();
}

// Set operator
function setOperator(op) {
    addClickEffect();
    
    if (operator !== "" && !shouldResetScreen) {
        calculate();
    }
    
    operator = op;
    previousNumber = currentNumber;
    shouldResetScreen = true;
    
    
    moodDisplay.textContent = "🤔";
}

// Calculate result
function calculate() {
    addClickEffect();
    
    if (operator === "" || shouldResetScreen) {
        return;
    }
    
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    
    if (operator === "/" && current === 0) {
        showError();
        return;
    }
    
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point issues
    result = Math.round(result * 100000000) / 100000000;
    
    currentNumber = result.toString();
    operator = "";
    previousNumber = "";
    shouldResetScreen = true;
    
    updateScreen();
    
    // Happy mood after calculation
    moodDisplay.textContent = "😄";
    setTimeout(() => {
        moodDisplay.textContent = "😊";
    }, 1000);
}

// Clear everything
function clearAll() {
    addClickEffect();
    
    currentNumber = "0";
    previousNumber = "";
    operator = "";
    shouldResetScreen = false;
    
    updateScreen();
    
    moodDisplay.textContent = "😊";
}

// Backspace function
function backspace() {
    addClickEffect();
    
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = "0";
    }
    
    updateScreen();
}

// Percentage function
function percentage() {
    addClickEffect();
    
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateScreen();
    
    // Nerdy mood for percentage
    moodDisplay.textContent = "🤓";
    setTimeout(() => {
        moodDisplay.textContent = "😊";
    }, 1000);
}



function toggleSign() {
    addClickEffect();
    
    if (currentNumber !== "0") {
        if (currentNumber.charAt(0) === "-") {
            currentNumber = currentNumber.slice(1);
        } else {
            currentNumber = "-" + currentNumber;
        }
    }
    
    updateScreen();
}


//  error
function showError() {
    screen.classList.add("error");
    screen.textContent = "Error!";
    moodDisplay.textContent = "😵";
    
    setTimeout(() => {
        screen.classList.remove("error");
        clearAll();
    }, 2000);
}

// Add click effect to buttons
function addClickEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

// Change mood randomly
function changeMood() {
    if (Math.random() > 0.9) { 
        currentMoodIndex = (currentMoodIndex + 1) % moods.length;
        moodDisplay.textContent = moods[currentMoodIndex];
        
        setTimeout(() => {
            moodDisplay.textContent = "😊";
        }, 2000);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        addNumber(key);
    } else if (key === '.') {
        if (!currentNumber.includes('.')) {
            addNumber(key);
        }
    } else if (key === '+') {
        setOperator('+');
    } else if (key === '-') {
        setOperator('-');
    } else if (key === '*') {
        setOperator('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        setOperator('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    }
});

// Initialize
updateScreen();

// random stuff
setInterval(() => {
    if (Math.random() > 0.98) { // Very rare
        const originalMood = moodDisplay.textContent;
        moodDisplay.textContent = "😜";
        setTimeout(() => {
            moodDisplay.textContent = originalMood;
        }, 500);
    }
}, 1000);

console.log("hii are you a dev too?let me know!");