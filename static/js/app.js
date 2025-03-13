// const mode = localStorage.getItem("mode") || "";
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

// document.body.className = mode;
// Initialize mode from localStorage
const mode = localStorage.getItem("mode") || "";
if (mode === "light") {
    body.classList.add("light");
    sun.style.display = "block";
    moon.style.display = "none";
}

// Toggle event listener
toggle.addEventListener("click", () => {
    const currentMode = localStorage.getItem("mode") || "";
    const newMode = currentMode === "light" ? "" : "light";
    localStorage.setItem("mode", newMode);
    body.classList.toggle("light");

    if (newMode === "light") {
        sun.style.display = "block";
        moon.style.display = "none";
    } else {
        sun.style.display = "none";
        moon.style.display = "block";
    }
});