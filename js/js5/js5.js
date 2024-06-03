

function gerarGrafico() {
    const valoresInput = document.getElementById('valores').value;
    const valores = valoresInput.split(',').map(Number);

    const graficoContainer = document.getElementById('grafico-container');
    graficoContainer.innerHTML = ''; // Limpa o conteúdo do container antes de gerar o novo gráfico

    const maxValor = Math.max(...valores); // Obtem o valor máximo

    for (let i = 0; i < valores.length; i++) {
        const valor = valores[i];
        const porcentagem = valor / maxValor * 100;
        const alturaBarra = porcentagem * 3; // Ajustei a fórmula

        const barra = document.createElement('div');
        barra.classList.add('barra');
        barra.style.height = `${alturaBarra}px`;
        barra.style.left = `${i * 40}px`; // Adicionei a propriedade left para posicionar as barras
        graficoContainer.appendChild(barra);
    }
}
