document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    button?.addEventListener("click", calculate);
});

function calculate(): void{
    const raioinput = document.getElementById("radius") as HTMLInputElement;
    const raio: number = parseFloat(raioinput.value);

    const area: number = Math.PI * Math.pow(raio, 2);
    const circumference: number = 2 * Math.PI * raio;

    document.getElementById("area")!.textContent = area.toFixed(2);
    document.getElementById("circumference")!.textContent = circumference.toFixed(2);
}