const canvas = document.getElementById("canvas");
const resetButton = document.getElementById("reset");
const colorPicker = document.getElementById("color-picker");
const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");
const eraserButton = document.getElementById("eraser");
const rainbowButton = document.getElementById("rainbow");

let isEraserActive = false;
let isRainbowActive = false;
let isMouseDown = false; // Tracks left mouse button
let isRightMouseDown = false; // Tracks right mouse button
let currentColor = colorPicker.value;

// Prevent default context menu for the canvas
canvas.addEventListener("contextmenu", (e) => e.preventDefault());

// Generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Red (0-255)
  const g = Math.floor(Math.random() * 256); // Green (0-255)
  const b = Math.floor(Math.random() * 256); // Blue (0-255)
  return `rgb(${r}, ${g}, ${b})`;
}

// Create the grid
function createGrid(size) {
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.border = "1px solid rgba(240, 240, 240, 0.5)";

    cell.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        // Left mouse button
        isMouseDown = true;
        applyColor(cell);
      } else if (e.button === 2) {
        // Right mouse button
        isRightMouseDown = true;
        applyColor(cell, true); // Use the right-click behavior
      }
    });

    cell.addEventListener("mouseover", () => {
      if (isMouseDown) {
        applyColor(cell);
      } else if (isRightMouseDown) {
        applyColor(cell, true);
      }
    });

    canvas.appendChild(cell);
  }
}

// Apply color to a cell
function applyColor(cell, isRightClick = false) {
  if (isRightClick) {
    // Right-click behavior
    cell.style.backgroundColor = "#ffffff"; // Erase the cell
  } else {
    // Standard behavior (left-click or hover)
    cell.style.backgroundColor = isEraserActive
      ? "#ffffff"
      : isRainbowActive
      ? getRandomColor()
      : currentColor;
  }
}

// Update grid size
function updateGridSize() {
  const size = gridSizeInput.value;
  gridSizeValue.textContent = size;
  createGrid(size);
}

// Toggle Rainbow Mode
rainbowButton.addEventListener("click", () => {
  isRainbowActive = !isRainbowActive;
  isEraserActive = false; // Disable eraser when rainbow is active
  eraserButton.classList.remove("active");
  rainbowButton.classList.toggle("active", isRainbowActive);
});

// Toggle Eraser Mode
eraserButton.addEventListener("click", () => {
  isEraserActive = !isEraserActive;
  isRainbowActive = false; // Disable rainbow when eraser is active
  rainbowButton.classList.remove("active");
  eraserButton.classList.toggle("active", isEraserActive);
});

// Reset Button
resetButton.addEventListener("click", () => createGrid(gridSizeInput.value));

// Update Color
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  // Disable rainbow and eraser when color is selected
  isEraserActive = false;
  isRainbowActive = false;
  rainbowButton.classList.remove("active");
  eraserButton.classList.remove("active");
});

// Event Listener for Grid Size Change
gridSizeInput.addEventListener("input", updateGridSize);

// Mouse up listener to stop coloring
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  isRightMouseDown = false;
});

// Initialize
createGrid(gridSizeInput.value);
