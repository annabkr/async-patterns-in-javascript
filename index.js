const fetch = require('node-fetch');

const URL = 'https://api.icndb.com/jokes/random';

/*

*/

async function getData() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

function fetchData() {
  getData()
    .then((data) => console.log('data: ', data))
    .catch((error) => console.log('error: ', error));
}

fetchData();

const getMoreData = async () => {
  fetch(URL)
    .then((data) => console.log('got more data: ', data))
    .catch((error) => console.log('error: ', error));
};

getMoreData();

// function printHello(){
//   console.log("Hello");
// }

// setTimeout(printHello, 1000);

// console.log("Me");
