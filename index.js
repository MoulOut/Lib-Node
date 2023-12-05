import fs from 'fs';
import chalk from 'chalk';

function errorSolve(erro) {
    console.log(erro)
  throw new Error(chalk.red(erro.code,'Arquivo não encontrado'));
}

function getFile(fileOrigin) {
  const encondig = 'utf-8';
  fs.readFile(fileOrigin, encondig, (erro, text) => {
    if (erro) {
      errorSolve(erro);
    }
    console.log(chalk.green(text));
  });
}

getFile('./arquivos/texto.md');
