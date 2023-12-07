import getFile from './index.js';
import chalk from 'chalk';
import fs from 'fs';

const caminho = process.argv;

function printList(result, identifier = '') {
  console.log(chalk.yellow(`lista de links ${identifier}`), result);
}

async function textProcess(argumentos) {
  const caminho = argumentos[2];

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
    printList(result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const files = await fs.promises.readdir(caminho);
    files.forEach(async (file) => {
      const list = await getFile(`${caminho}/${file}`);
      printList(list, file);
    });
  }
}

textProcess(caminho);
