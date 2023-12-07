import getFile from './index.js';
import chalk from 'chalk';
import fs from 'fs';
import validList from './http-validation.js';

const caminho = process.argv;

async function printList(valida, result, identifier = '') {
  if (valida) {
    console.log(
      chalk.yellow(`lista validada ${identifier}`),
      await validList(result)
    );
  } else {
    console.log(chalk.yellow(`lista de links ${identifier}`), result);
  }
}

async function textProcess(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';
  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(chalk.red('Arquivo ou diretório não existente'));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const result = await getFile(caminho);
    printList(valida, result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const files = await fs.promises.readdir(caminho);
    files.forEach(async (file) => {
      const list = await getFile(`${caminho}/${file}`);
      printList(valida,list, file);
    });
  }
}

textProcess(caminho);
