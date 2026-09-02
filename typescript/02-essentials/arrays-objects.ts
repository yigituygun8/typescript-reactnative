let hobbies = ["Reading", "Traveling", "Cooking"]; // TypeScript infers the type as string[] (array of strings)
hobbies.push("Swimming"); // Valid
// hobbies.push(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

let mixedArray = ["Hello", 42, true]; // TypeScript infers the type as (string | number | boolean)[] (array of strings, numbers, or booleans)
mixedArray.push("World");
mixedArray.push(100);
mixedArray.push(false);

let users: { name: string; age: number }[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
];

users.push({ name: "Charlie", age: 35 });

// Using Array<T> syntax -> Generic type syntax. Can be used to define arrays of specific types, providing better type safety and clarity in the code.
let users2: Array<{ name: string; age: number }> = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
];

let users3: Set<{ name: string; age: number }>;
// users3.add({ name: "Ahmet", age: 25 }); // Error: Cannot read properties of undefined (reading 'add') because users3 is not initialized. It should be initialized as a new Set() before adding elements.
users3 = new Set(); // create the object before adding elements
users3.add({ name: "Ahmet", age: 25 }); 

// Tuples: A tuple is a fixed-length array where each element can have a different type. Tuples are useful when you want to represent a collection of values with different types, and you want to enforce the order and types of those values.
let possibleResults: [number, number, boolean] = [1, 2, true]; // TypeScript infers the type as [number, number, boolean] (tuple of a number, a number, and a boolean)

let userObject: {
    name: string;
    age: number | string;
    hobbies: string[];
    role: {
        title: string;
        id: number;
    }
} = {
    name: "Alice",
    age: 30,
    hobbies: ["Reading", "Traveling", "Cooking"],
    role: {
        title: "Developer",
        id: 1
    }
}

let val: {} = "any value"; // TypeScript infers the type as {} (an object type that can hold any value, but it doesn't provide any specific type information about the value)
// means any value that is not null or undefined
// difference from "any" keyword: "any" allows any value, including null and undefined, while "{}" allows any value except null and undefined. Using "{}" can help catch potential errors when working with objects, as it enforces that the value is not null or undefined. However, it doesn't provide any specific type information about the value, so it's less strict than using a specific type or interface.

// val = null; // invalid
// val = undefined; // invalid
let val1: any = null; // valid

// Record type: A Record type is a utility type in TypeScript that allows you to create an object type with specific keys and values. 
// It is useful when you want to define an object with a fixed set of keys and their corresponding value types. 
// The Record type takes two generic parameters: the first parameter represents the keys of the object, and the second parameter represents the value types associated with those keys.
const populations: Record<string, number> = {
    Turkey: 84000000,
    Germany: 83000000,
    France: 67000000,
}

// You can restrict key values!!
type Roles = "admin" | "user" | "guest"; // Define a union type for the keys
const userRoles: Record<Roles, string> = {
    admin: "Administrator",
    user: "Regular User",
    guest: "Guest User",
    // wrongRole: "Wrong", // Error: Object literal may only specify known properties, and 'dsa' does not exist in type 'Record<Roles, string>'
}