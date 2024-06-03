document.addEventListener('DOMContentLoaded', function() {
    calculate();
});

function calculate() {
    const radius = parseFloat(document.getElementById('radius').value);
    if (isNaN(radius) || radius <= 0) {
        alert('Por favor, insira um valor válido para o raio.');
        return;
    }

    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;

    document.getElementById('area').innerText = area.toFixed(2);
    document.getElementById('circumference').innerText = circumference.toFixed(2);
}