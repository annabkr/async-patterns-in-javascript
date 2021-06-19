const fetch = require('node-fetch');

/* Promise Approach */

/* 
function Promise(func) {
  var state = ‘pending’; 
  var deferred = null; 
  var value;
  function resolve(){...}
  function reject(){...}
  function handle(){...}
  
  this.then = function(){...}
  func(resolve, reject);
}
*/

// there are two things to cover: what happens when a Promise is instantiated, and what happens after a Promise is returned.

/* A Promise object is a temporary wrapper for an eventual value.
When an API request is first made, the Promise object will look something like this:
 
However, once the request is fulfilled/rejected, the associated callback functions will be placed
on the callback queue and await their turn in the event loop.
*/
const URL = 'https://cataas.com/cat?json=true';

const catPhotos = []

/*
The fetch method returns a Promise.
*/
fetch(URL)
.then((catData) => catPhotos.push(catData.url))
.catch((error) => console.log(error))


const asyncCall = (url) => {
    const promise = fetch(url);
    console.log(JSON.stringify(promise));

}

asyncCall(URL);

async function getData(word) {
  return new Promise((resolve, reject) => {
      if (word === 'please'){
        setTimeout(() => resolve(), 1000);
      } else {
          reject();
      }
  })
}

const futureData = getData('please')

function fetchData() {
  getData()
    .then((data) => console.log('data: ', data))
    .catch((error) => console.log('error: ', error));
}
 

const getMoreData = async () => {
  fetch(URL)
    .then((data) => console.log('got more data: ', data))
    .catch((error) => console.log('error: ', error));
};
 

// defining your own promises

// promise.all