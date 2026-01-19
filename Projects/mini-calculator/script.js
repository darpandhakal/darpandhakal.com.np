const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function setDisplay(val) {
  display.value = val;
}

function getDisplay() {
  return display.value || "";
}

function clearAll() {
  setDisplay("");
}

function safeAppend(ch) {
  // Basic sanity: prevent double dots in a number chunk
  if (ch === ".") {
    const parts = getDisplay().split(/[\+\-\*\/\%]/);
    const last = parts[parts.length - 1];
    if (last.includes(".")) return;
  }
  setDisplay(getDisplay() + ch);
}

function equals() {
  const expr = getDisplay()
    .replaceAll("÷", "/")
    .replaceAll("×", "*")
    .trim();

  if (!expr) return;

  try {
    // Evaluate (simple calculator). If error -> show Error.
    // Note: in real apps, use a proper parser; for your student project this is OK.
    // eslint-disable-next-line no-eval
    const result = eval(expr);
    setDisplay(String(result));
  } catch {
    setDisplay("Error");
    setTimeout(() => clearAll(), 900);
  }
}

/* Button clicks */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "clear") return clearAll();
    if (action === "equals") return equals();
    if (value) return safeAppend(value);
  });
});

/* Keyboard support */
window.addEventListener("keydown", (e) => {
  const k = e.key;

  if (k === "Escape") return clearAll();
  if (k === "Enter" || k === "=") return equals();
  if (k === "Backspace") {
    setDisplay(getDisplay().slice(0, -1));
    return;
  }

  const allowed = "0123456789.+-*/%";
  if (allowed.includes(k)) safeAppend(k);
});
