import fs from 'fs';
import chalk from 'chalk';

function errorSolve(erro) {
  throw new Error(chalk.red(erro.code, 'Arquivo não encontrado'));
}

// async/await
async function getFile(fileOrigin) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(fileOrigin, encoding);
    console.log(chalk.green(texto));
  } catch (error) {
    errorSolve(error);
  } finally {
    console.log(chalk.yellow('operação concluída'));
  }
}

// Promises com then
// function getFile(fileOrigin) {
//   const encoding = 'utf-8';
//   fs.promises
//     .readFile(fileOrigin, encoding)
//     .then((text) => console.log(chalk.green(text)))
//     .catch(errorSolve);
// }

getFile('./arquivos/texto.md');
