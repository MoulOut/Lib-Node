import chalk from 'chalk';

function linksExtractor(arrLinks) {
  const extractedList = arrLinks.map((objectLink) =>
    Object.values(objectLink).join()
  );
  return extractedList;
}

async function checkStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      try {
        const res = await fetch(url);
        return res.status;
      } catch (error) {
        return errorManager(error);
      }
    })
  );
  return arrStatus;
}

function errorManager(error) {
  if (error.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado.';
  } else {
    return 'Ocorreu algum erro.';
  }
}

export default async function validList(listOfLinks) {
  const links = linksExtractor(listOfLinks);
  const status = await checkStatus(links);
  return listOfLinks.map((object, index) => ({
    ...object,
    status: status[index],
  }));
}
