document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle");
    const body = document.querySelector("body");
    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");

    // Initialize mode
    const savedMode = localStorage.getItem("mode");
    const mode = savedMode || "light"; // default to light
    if (mode === "light") {
        body.classList.add("light");
        sun.style.display = "block";
        moon.style.display = "none";
    } else {
        body.classList.remove("light");
        sun.style.display = "none";
        moon.style.display = "block";
    }

    // Save default if not already saved
    if (!savedMode) {
        localStorage.setItem("mode", mode);
    }

    // Toggle event listener
    toggle.addEventListener("click", () => {
        const currentMode = localStorage.getItem("mode") || "light";
        const newMode = currentMode === "light" ? "dark" : "light";
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
});
