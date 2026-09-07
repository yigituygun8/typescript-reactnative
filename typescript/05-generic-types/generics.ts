// Generic Types: Types that can be used with different data types.

type DataStore<T> = { // T is a placeholder for any data type
    [key: string]: T; // The value can be of any type specified when using the DataStore
}

let store: DataStore<number | boolean> = { // Here, T is specified as number | boolean
    item1: 100,
    item2: 200,
    isOpen: true
};

// So you don't have to create separate types for each data type you want to store, you can use generics to create a flexible and reusable type.
// Also, no need to think about the specific data type when defining the DataStore type, as it can be specified later when creating an instance of the DataStore.

// Generic Functions: Functions that can work with different data types.
function merge<T, U>(value1: T, value2: U): [T, U] { // T and U preserve each value's type
    return [value1, value2]; // Collects any two values into a tuple
}

// for unknown number of parameters, you can use rest parameters with generics
function mergeMultiple<T extends unknown[]>(...values: T): T { // T is a placeholder for any data type
    return values; // Collects any number of values into an array
}

const numbers = merge(1, 2); // Type: [number, number]
const mixedValues = merge("hello", true); // Type: [string, boolean]
const mixedValues2 = merge({ name: "Alice" }, [1, 2, 3]); // Type: [{ name: string }, number[]]

console.log(numbers); // Output: [1, 2]
console.log(mixedValues); // Output: ["hello", true]
console.log(mixedValues2); // Output: [{ name: "Alice" }, [1, 2, 3]]

const multipleNumbers = mergeMultiple(1, 2, 3, 4, 5); // Type: number[]
const multipleStrings = mergeMultiple("a", "b", "c"); // Type: string[]
const multipleMixed = mergeMultiple(1, "hello", true); // Type: (number | string | boolean)[]

console.log("\n" + multipleNumbers); // Output: [1, 2, 3, 4, 5]
console.log(multipleStrings); // Output: ["a", "b", "c"]
console.log(multipleMixed); // Output: [1, "hello", true]

class User<T extends number | string> { // T is a placeholder for any data type that extends number or string, meaning it can only be a number or a string
    constructor(public id: T) {}
}

interface Role<T> {
}