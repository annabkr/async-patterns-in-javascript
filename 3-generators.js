const randomNumber = require('random-number')

/* 
Generators were introduced in ES6 (ECMAScript 2015) alongside Iterators and Promises.
These examples assume general knowledge of Iterators in JavaScript.
Generators are essentially syntactic sugar for custom iterators.
They allow pausing the execution of functions (using yield).
*/

// Helper functions
const makeCat = () => {
    const catSizes = ['huge', 'grande', 'tiny'];
    const catHobbies = ['napping', 'eating', 'sleeping', 'dancing', 'snoring'];
    return randomItem(catSizes) + ' ' + 
           randomItem(catHobbies) + ' ' + 
           'cat'
 }

// source: https://github.com/mpj/funfuniterators/blob/master/random-item.js
function randomItem(array) {
    const randomIndex = randomNumber({
      min: 0,
      max: array.length - 1,
      integer: true
    })
    return array[randomIndex]
}
 
/* Generator example */
(() => {
    console.log('Generator example')
    const catArmy = {
        [Symbol.iterator]: function*() {
            while(true){
                const enoughCats = Math.random() > 0.75
                if (enoughCats) return
                yield makeCat()
            }
        }
    }
    // the Iterator method would have involved implementing a next method
    /*[Symbol.iterator]: () => {
      return {
        next: () => {
          const enoughcats = Math.random() > 0.75
          if (!enoughCats)
            return {
              value: makeCat(),
              done: false
            }
          return { done: true }
        }
      }
    }*/
    
    for (const cat of catArmy) {
        console.log(cat);
    }
})()

;(() => {
    console.log('Example with the underlying iterator')
    function* someCats(){
        while(true){
            const enoughCats = Math.random() > 0.75
            if (enoughCats) return
            yield makeCat()
        }
    }

    const iterator = someCats()
    console.log('iterator.next(): ', iterator.next())
})()

/* 
When we call iterator.next(), the generator executes until it reaches
a yield, and then it pauses and whatever was yielded is returned as
the value of the next call to iterator.next()
*/
;(() => {
    console.log('Example with only yield')
    function* someCats(){
        yield 'sammy the siamese'
        yield 'fluffy the ragdoll'
        yield 'ginger the tabbycat'
    }

    const iterator = someCats()
    console.log('iterator.next(): ', iterator.next()) //'sammy the siamese'
    console.log('iterator.next(): ', iterator.next()) //'fluffy the ragdoll'
    console.log('iterator.next(): ', iterator.next()) //'ginger the tabbycat'
})()

const URL = 'https://cataas.com/cat?json=true';

/* 
Generator functions can be used asynchronously
*/
(async () => {
    console.log('Example with async generator')
    async function* someCats(){
        const catData = await fetch(URL)
        yield { photo: catData.url, name: makeCat()} 
    }

    const iterator = someCats()  
    iterator.next() //a pending promise
    .then((data) => console.log(data)) //returns an object {value: obj returned by yield, done: boolean (will be false)}
})()