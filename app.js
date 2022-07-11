// Input range functionality.
let range_indicator = document.getElementById("range_indicator");
let range_input = document.getElementById("range_input");
range_indicator.innerHTML = range_input.value;
range_input.addEventListener("input", () => {
    range_indicator.innerHTML = range_input.value;
});

// Button active functionality
let btn = document.querySelectorAll(".btn");
btn.forEach((b) => {
    b.addEventListener("click", (e) => {
        e.target.classList.toggle("btn--active");
    })
})


// navigation functionality.
let navButton = document.querySelector(".nav__button");
let navItems = document.querySelector(".main__left");

navButton.addEventListener("click", (e) => {
    navItems.classList.toggle("nav--active");
    navButton.classList.toggle("nav__button--active");
})
