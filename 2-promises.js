const fetch = require('node-fetch');

/* The Promise Approach was introduced in ES6 (ECMAScript 2015) */

/* A Promise object is a wrapper for an eventual value that might not yet exist.

The Promise object supports two private properties: state & result.
State can be one of:      pending | fulfilled | rejected 
Result can be one of:     undefined | a value | and error object
The type of the result corresponds to the current state.

The Promise object also has multiple methods available. We'll focus on:
then: 
      Receives the resolved value of a Promise. 
      Can take 1-2 optional callback functions (onFulfilled, onRejected).
      Returns a promise itself.
catch:

*/

/* The Promise constructor expects an executor callback function to be given as a parameter.
In turn, it will provide the executor callback with two callbacks of its own: resolve + reject.
The resolve callback is used to resolve the promise with a value or the result of another promise.
The reject callback is used to reject the promise with a provided reason or error.
*/
async function getManners(word) {
  console.log(`Calling getManners with word ${word}`)

  const executor = (resolve, reject) => {
    if (word === 'please'){
      setTimeout(() => resolve('thank you'), 1000);
    } else { 
       reject(new Error('houston there was a problem'));
    }
  }

  return new Promise(executor)
}

getManners('please')
.then((result) => console.log('result: ', result))
.catch((error) => console.error(error))

// this would error out and log the error message + stack trace
// getManners('no')
// .then((result) => console.log('result: ', result))
// .catch((error) => console.error(error))

const URL = 'https://cataas.com/cat?json=true';
const catPhotos = []

/*
The fetch method returns a Promise.
*/
fetch(URL)
.then((catData) => catData.json())
.then((catJson) => catPhotos.push(catJson.url))
.then(() => printCatUrls(catPhotos))
.catch((error) => console.error(error))

const getCat = () => {
  const catData = fetch(URL);
  return catData
}

const catFamily = {}

/*
Promises help to make asynchronous calls that depend on each other a bit cleaner
than the callback approach used before ES6.
*/
getCat()
.then((catData) => catData.json())
.then((catJson) => catFamily["Grandmother"] = makeCat(catJson.url, catFamily))
.then(() => getCat())
.then((catData) => catData.json())
.then((catJson) => catFamily["Mother"] = makeCat(catJson.url, catFamily))
.then(() => getCat())
.then((catData) => catData.json())
.then((catJson) => catFamily["Kitten"] = makeCat(catJson.url, catFamily))
.then(() => printCatFamily(catFamily))
.catch((error) => console.log(error))
 
const printCatUrls = (kittyUrls) => {
  console.log('Kitty photo URLs: ', kittyUrls);
} 

const printCatFamily = (kittyFam) => {
  console.log('Kitty family: ', JSON.stringify(kittyFam));
} 

function makeCat(url, ancestors){
  return { photo: url, ancestors: Object.entries(ancestors)}
}