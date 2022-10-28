(function () {
  // Cache DOM
  const gridSizeInput = document.getElementById("grid-size");
  const gridSizeDisplay = document.getElementById("grid-size-display");
  const colorInput = document.getElementById("color");
  const colorBtn = document.getElementById("color-btn");
  const rainbowBtn = document.getElementById("rainbow-btn");
  const eraseBtn = document.getElementById("erase-btn");
  const sketchPad = document.getElementById("sketch-pad");

  // Grid input value
  createGrid(gridSizeInput.value);
  gridSizeInput.addEventListener("input", (e) => {
    gridSizeDisplay.innerText = gridSizeInput.value;
    createGrid(gridSizeInput.value);
  });

  function createGrid(gridSize) {
    document.getElementById("grid-container").remove();
    const gridContainer = document.createElement("div");
    gridContainer.setAttribute("id", "grid-container");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
      let gridElement = document.createElement("div");
      gridContainer.classList.add("grid-item");
      gridContainer.appendChild(gridElement);
    }
    sketchPad.appendChild(gridContainer);
  }

  function getGridSize() {
    //  This function should get grid size
  }
})();
