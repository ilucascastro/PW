document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const cursorTrail = [];

    for (let i = 0; i < 8; i++) {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        container.appendChild(cursor);
        cursorTrail.push(cursor);
    }

    container.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        for (let i = cursorTrail.length - 1; i > 0; i--) {
            cursorTrail[i].style.left = cursorTrail[i - 1].style.left;
            cursorTrail[i].style.top = cursorTrail[i - 1].style.top;
        }

        cursorTrail[0].style.left = `${x}px`;
        cursorTrail[0].style.top = `${y}px`;
    });
});
