"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", calculate);
});
function calculate() {
    const raioinput = document.getElementById("radius");
    const raio = parseFloat(raioinput.value);
    const area = Math.PI * Math.pow(raio, 2);
    const circumference = 2 * Math.PI * raio;
    document.getElementById("area").textContent = area.toFixed(2);
    document.getElementById("circumference").textContent = circumference.toFixed(2);
}
