let age: any = 36; // TypeScript infers the type as any, allowing any type of value to be assigned to it

// ...

age = "37"; 
age = {};
age = false;
// but any type can lead to unexpected behavior and should be avoided when possible. It's better to use specific types to ensure type safety and catch errors at compile time.

// Union Types
let age2: number | string = 36; // TypeScript infers the type as number | string, allowing either a number or a string to be assigned to it
age2 = "37"; // Valid
age2 = 38; // Valid
// age2 = {}; // Error: Type '{}' is not assignable to type 'string | number'