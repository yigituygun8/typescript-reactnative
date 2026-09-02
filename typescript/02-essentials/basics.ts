// basics.ts

// Types: string, number, boolean, array, tuple, enum, any, void, null, undefined
let userName: string;
userName = "Alice";
    
console.log(userName); // Output: Alice

// Type Inference vs Type Assignment
let userAge = 30; // TypeScript infers the type as number
let userHeight: number = 5.9; // Explicit type assignment
// userAge = "Alice"; // Error: Type 'string' is not assignable to type 'number'
// assign a type explicitly when no initial value is provided, don't do unnecessary type assignment when the value is already provided
let userWeight: number;
userWeight = 65;
let isStudent = true; // TypeScript infers the type as boolean
console.log(typeof isStudent); // Output: boolean

function add(a: number, b: number): number {
    return a + b;
}
// or
function add2(a: number, b = 0): number {
    return a + b;
} // b is optional and defaults to 0 if not provided and also its type is inferred as number due to the default value
console.log(add2(5)); // Output: 5
console.log(add2(5, 3)); // Output: 8