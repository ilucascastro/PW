document.addEventListener('DOMContentLoaded', function() {
    createMultiplicationTable();
});

function createMultiplicationTable() {
    const body = document.body;

    for (let i = 1; i <= 10; i++) {
        const container = document.createElement('div');
        container.className = 'table-container';

        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = `Produtos de ${i}`;
        table.appendChild(caption);

        for (let j = 1; j <= 10; j++) {
            const row = document.createElement('tr');

            const cell1 = document.createElement('td');
            cell1.textContent = `${i}x${j}`;

            const cell2 = document.createElement('td');
            cell2.textContent = `${i * j}`;

            row.appendChild(cell1);
            row.appendChild(cell2);
            table.appendChild(row);
        }

        container.appendChild(table);
        body.appendChild(container);
    }
}