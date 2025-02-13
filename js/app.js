const mode = localStorage.getItem("mode") || "";
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

document.body.className = mode;

toggle.addEventListener("click", () => {
    localStorage.setItem("mode", mode === "light" ? "" : "light");
    body.classList.toggle("light");

    if (sun.style.display === "none") {
        sun.style.display = "block";
        moon.style.display = "none";
    } else {
        sun.style.display = "none";
        moon.style.display = "block";
    }
})