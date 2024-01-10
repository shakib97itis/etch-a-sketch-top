const gridSizeInput = document.getElementById('grid-size')
const gridSizeDisplay = document.getElementById('grid-size-display')
const colorInput = document.getElementById('color')
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraseBtn = document.getElementById('erase-btn')
const sketchPad = document.getElementById('sketch-pad')
const ctrlButtons = document.querySelectorAll('.ctrl-btn')

// Grid input value
createGrid(gridSizeInput.value)

gridSizeInput.addEventListener('input', (e) => {
  gridSizeDisplay.innerText = e.target.value
  createGrid(e.target.value)
})

ctrlButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    ctrlButtons.forEach((btn) => btn.classList.remove('active'))
    if (btn === e.target) {
      btn.classList.add('active')
      const mode = btn.dataset.mode
      colorGrid(mode)
    }
  })
})

// Functions
function createGrid(gridSize) {
  document.getElementById('grid-container').remove()
  const gridContainer = document.createElement('div')
  gridContainer.setAttribute('id', 'grid-container')
  gridContainer.style.display = 'grid'
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridElement = document.createElement('div')
    gridElement.classList.add('grid-item')
    gridContainer.appendChild(gridElement)
  }
  sketchPad.appendChild(gridContainer)
  colorGrid('color')
}

// hover click functionality
function colorGrid(colorMode) {
  const gridContainer = document.getElementById('grid-container')
  let isMouseDown = false
  function handleMouseOver(e) {
    if (e.target.classList.contains('grid-item')) {
      e.target.style.backgroundColor = generateColor(colorMode)
    }
  }

  window.addEventListener('mousedown', (e) => {
    window.addEventListener('mouseover', handleMouseOver)
  })

  window.addEventListener('mouseup', (e) => {
    window.removeEventListener('mouseover', handleMouseOver)
  })
}

function generateColor(colorMode) {
  if (colorMode === 'color') {
    return 'black'
  }

  if (colorMode === 'rainbow') {
    return `#${generateRandomColor()}`
  }

  if (colorMode === 'shading') {
    // do something
  }

  if (colorMode === 'erase') {
    return 'white'
  }
}

function generateRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}
