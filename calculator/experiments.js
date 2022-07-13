let runningtotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function rerender() {
  screen.innerText = buffer;
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      runningtotal = 0;
      buffer = "0";
      previousOperator = null;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningtotal;
      runningtotal = 0;
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = "" + value;
  } else {
    buffer += value;
  }
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningtotal += intBuffer;
  } else if (previousOperator === "-") {
    runningtotal -= intBuffer;
  } else if (previousOperator === "✕") {
    runningtotal *= intBuffer;
  } else {
    runningtotal /= intBuffer;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningtotal === 0) {
    runningtotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}
