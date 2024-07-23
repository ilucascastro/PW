const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createLink } = require('./utils'); // Importa a função createLink

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// Verifica se o diretório foi fornecido como argumento
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Erro: O caminho do diretório deve ser fornecido como argumento.");
  process.exit(1);
}

const directoryPath = args[0];

// Lê o conteúdo do diretório
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(`Erro ao ler o diretório: ${err.message}`);
    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
      const filePath = path.join(directoryPath, req.url === '/' ? '' : req.url);
      const extname = String(path.extname(filePath)).toLowerCase();
      const contentType = mimeTypes[extname] || 'application/octet-stream';

      if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<html><body><h1>Lista de Arquivos</h1><ul>");
        files.forEach(file => {
          res.write(createLink(file)); // Usa a função createLink
        });
        res.write("</ul></body></html>");
        res.end();
      } else {
        fs.readFile(filePath, (err, content) => {
          if (err) {
            if (err.code === 'ENOENT') {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
              res.writeHead(500);
              res.end(`Erro ao ler o arquivo: ${err.code}`, 'utf-8');
            }
          } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
          }
        });
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'text/html' });
      res.end('<h1>405 Method Not Allowed</h1>', 'utf-8');
    }
  });

  const port = process.env.PORT || 5500; // Usa a porta do arquivo .env ou 5500 como padrão
  server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
