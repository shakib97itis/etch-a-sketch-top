// grid size input functionality
const sizeInput = document.getElementById('size-input')
const sizeDisplay = document.getElementById('size-display')
sizeInput.addEventListener('change', (e) => {
  sizeDisplay.innerText = e.target.value
})
