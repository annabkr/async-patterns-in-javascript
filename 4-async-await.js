
const { default: fetch } = require("node-fetch");

/* The Async-Await Approach was introduced in ES8 (ECMAScript 2017) */

/*

Like Generators, this approach allows execution to be paused and resumed.

In essence, these features are syntactic sugar on top of promises.

The await keyword pauses the async function execution until the Promise
is resolved or rejected. Other tasks are still able to run in the meantime.

*/
 
const URL = 'https://cat-fact.herokuapp.com/facts/random';

//alternate function declaration:
//async function getCatFact(){
const getCatFact = async() => {
    const response = await fetch(URL);
    const catFact = await response.json();
    console.log('then once we receive the catFact we continue: ', catFact);
    return catFact
}

const result = getCatFact();
console.log('Result of calling getCatFact(): ', result); //returns a pending promise

 