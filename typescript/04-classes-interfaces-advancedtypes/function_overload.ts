// Function overloads
function getNumberOfWords(val: string): string;
function getNumberOfWords(val: any[]): number;
function getNumberOfWords(val: string | any[]) {
    if(typeof val === 'string'){
        const numberOfWords = val.split(' ').length;
        return `${numberOfWords} words`; // if val is a string, return the number of words in the string
    }
    return val.length; // if val is an array, return the length of the array
}

console.log(getNumberOfWords("Hello world !")); // Output: "3 words"
console.log(getNumberOfWords(["Hello", "world!"])); // Output: 2

const numOfWords = getNumberOfWords("This is a test string");
// Now the variable type is inferred as number | string because the function can return either a string or a number based on the input type.
// The problem is let's say we want to access length property of the returned value, we will get an error because TypeScript cannot guarantee that the returned value is a string or a number. 
// To fix this, we can use function overloads to define multiple signatures for the function. (we can fix it with "as string" (casting) but it is not a good practice because it can lead to runtime errors if the value is not of the expected type.)
// console.log(numOfWords.length); // This will cause an error if we don't use function overloads because numOfWords can be either a string or a number.

