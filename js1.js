// Função para gerar a tabela de multiplicação
function gerarTabelaMultiplicacao() {
  var body = document.body,
      tabela = document.createElement('table'),
      tbody = document.createElement('tbody'),
      i, j, linha, celula, texto;

  for (i = 1; i <= 10; i++) {
    linha = document.createElement('tr');
    for (j = 1; j <= 10; j++) {
      celula = document.createElement(i == 1 || j == 1 ? 'th' : 'td');
      texto = document.createTextNode(i + ' x ' + j + ' = ' + (i * j));
      celula.appendChild(texto);
      linha.appendChild(celula);
    }
    tbody.appendChild(linha);
  }

  tabela.appendChild(tbody);
  body.appendChild(tabela);
}

// Chama a função quando a janela carrega
window.onload = gerarTabelaMultiplicacao;