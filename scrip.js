// Obtener los elementos del DOM para los botones y la pantalla de la calculadora
const display = document.getElementById('result');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const decimalBtn = document.getElementById('decimal');

// Variables de la calculadora
let currentValue = '0';
let firstValue = null;
let operator = null;
let decimal = false;

// Función para actualizar la pantalla de la calculadora
function updateDisplay() {
  display.textContent = currentValue;
}

// Función para agregar dígitos al valor actual
function addDigit(digit) {
  if (currentValue === '0') {
    currentValue = digit;
  } else {
    currentValue += digit;
  }
}

// Función para realizar una operación
function doOperation() {
  const secondValue = parseFloat(currentValue);

  switch (operator) {
    case '+':
      currentValue = firstValue + secondValue;
      break;
    case '-':
      currentValue = firstValue - secondValue;
      break;
    case '*':
      currentValue = firstValue * secondValue;
      break;
    case '/':
      currentValue = firstValue / secondValue;
      break;
  }

  firstValue = null;
  operator = null;
  decimal = false;
}

// Event listeners para los botones de la calculadora
clearBtn.addEventListener('click', () => {
  currentValue = '0';
  firstValue = null;
  operator = null;
  decimal = false;
  updateDisplay();
});

equalsBtn.addEventListener('click', () => {
  if (operator && firstValue) {
    doOperation();
    updateDisplay();
  }
});

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (operator && firstValue) {
      doOperation();
    }

    firstValue = parseFloat(currentValue);
    operator = btn.textContent;
    currentValue = '0';
    decimal = false;
  });
});

numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    addDigit(btn.textContent);
    updateDisplay();
  });
});

decimalBtn.addEventListener('click', () => {
  if (!decimal) {
    decimal = true;
    addDigit('.');
    updateDisplay();
  }
});