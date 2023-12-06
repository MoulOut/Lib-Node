import fs from 'fs';
import chalk from 'chalk';

function linkExtractor(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const captures = [...text.matchAll(regex)];
  const results = captures.map((capture) => ({
    [capture[1]]: capture[2],
  }));
  return results
}

function errorSolve(erro) {
  throw new Error(chalk.red(erro.code, 'Arquivo não encontrado'));
}

async function getFile(fileOrigin) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(fileOrigin, encoding);
    console.log(linkExtractor(texto));
  } catch (error) {
    errorSolve(error);
  }
}

getFile('./arquivos/texto.md');
