/* eslint-disable no-console */

/* note that this package has been deprecated */
const request = require('request');
const useJSON = { json: true }

/* Cooperative Asynchronous JavaScript - The Callback Approach */

/*
The callback approach to asynchronous JavaScript involves passing a function
definition to the hosting environment (client browser, Node.js, etc.)
Once the request has completed, the hosting environmnet will put the function definition back in the
JS callback queue. When the execution stack is empty, it will end up in the event loop.
*/
function handleCatJoke(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log('The output of a single API call using a callback function: \n\n', body.text, "\n"); 
  }
}

function makeCatJokeRequest(){
    request('https://cat-fact.herokuapp.com/facts/random', useJSON, handleCatJoke);
}

makeCatJokeRequest();

/*
One of the major drawbacks to this approach was the challenge of adding complexity.
Making function calls that depended on the result of other asynchronous function calls
often ended up resulting in cascading fallback functions aka "Callback Hell"
*/
(function makeCatFamily() {
    const catFamily = {};  
    request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
        checkError(err)
        catFamily["Grandparent"] = makeCat(catFamily, body.results);
        request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
            checkError(err)
            catFamily["Parent"] = makeCat(catFamily, body.results);
            request('https://randomuser.me/api/', useJSON,  (err, response, body) => {
                checkError(err)
                catFamily["Kitten"] = makeCat(catFamily, body.results);
                //kitties exist here
                console.log('catFamily inside the callback will have the family of cats: ', JSON.stringify(catFamily), '\n\n');
            }) 
        }) 
    })
    //no kitties here yet due to asynchronosity
    console.log('\ncatFamily outside the makeCatFamily callback train will be empty: ', JSON.stringify(catFamily), '\n');
})()

function checkError(err){
    if (err) {
        console.log(err);
    } 
}

function getCatName(catData){
    return `${catData[0].name.first}`
}

function makeCat(ancestors, catData){
    return { name: getCatName(catData), ancestors: Object.entries(ancestors)}
}
 