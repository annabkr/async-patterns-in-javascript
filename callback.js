/* eslint-disable no-console */

/* note that this package has been deprecated */
const request = require('request');

const useJSON = { json: true }
/*
The callback approach to asynchronous JavaScript involves passing a function
definition to the hosting environment (client browser API or Node.js background thread).
Once the request has completed, the hosting env will put the function definition back in the
JS callback queue. When the execution stack is empty, it will end up in the event loop.
*/
function handleResponse(error, response, body) {
  if (error) {
    console.log(error);
  } else {
   console.log(body); 
  }
}

request('https://cat-fact.herokuapp.com/facts/random', { json: true }, handleResponse);

/*
One of the major drawbacks to this approach was the challenge of
adding complexity. Making requests that depended on the result
of other requests often ended up in "Callback Hell"
*/
function makeCatFamily() {
    const catFamily = {};  
    request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
        if (err) {
            console.log(err);
        }
        catFamily["Grandparent"] = getCatName(body.results)
        request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
            if (err) {
                console.log(err);
            }
            catFamily["Parent"] = getCatName(body.results);
            request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
                if (err) {
                    console.log(err);
                }
                catFamily["Kitten"] = getCatName(body.results);
                //kitties exist here
                console.log('catFamily inside the callback: ', catFamily, '\n\n');
            }) 
        }) 
    })
    //no kitties here yet due to asynchronosity
    console.log('catFamily outside the callback: ', catFamily, '\n');
}

function getCatName(catData){
    return { "name" : `${catData[0].name.first}` }
}

makeCatFamily();