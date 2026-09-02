// Null and Undefined Types: TypeScript has two special types, null and undefined, which represent the absence of a value. The null type represents the intentional absence of any object value, while the undefined type represents a variable that has been declared but has not yet been assigned a value.
// In TypeScript, you can use the null and undefined types to indicate that a variable may not have a value. You can also use the strictNullChecks compiler option to enforce stricter type checking for null and undefined values.

let a: null;
a = null; // valid
// a = undefined; // invalid, Type 'undefined' is not assignable to type 'null'

let b: undefined;
b = undefined; // valid
// b = 5; // invalid, Type 'number' is not assignable to type 'undefined'
// b = null; // invalid, Type 'null' is not assignable to type 'undefined'

let str: null | string;
str = "Yiğit";
console.log(str);
str = null; 
console.log(str);

let c: undefined | number;
console.log(c); // Output: undefined. Because c is declared but not initialized, it has the value undefined by default.
c = 5; // valid
console.log(c); // Output: 5
c = undefined; // valid
console.log(c); // Output: undefined

// Type Casting / Assertion: TypeScript allows you to explicitly specify the type of a variable using type casting or assertion. This can be useful when you know more about the type of a variable than TypeScript does, or when you want to override the inferred type of a variable.
// const inputEl = document.getElementById("input") as HTMLInputElement | null; // Type assertion using "as" syntax
// or
// const inputEl = <HTMLInputElement>document.getElementById("input"); // Type assertion using angle bracket syntax

// unknown type: The unknown type is a type-safe counterpart of the any type. It represents any value, but unlike any, it requires you to perform type checking before performing operations on values of type unknown. This helps prevent runtime errors and ensures that you handle values of unknown types safely.
// typically used with functions that can return different types of values, or when working with external data sources where the type of the data is not known in advance. It is a safer alternative to using any, as it forces you to perform type checks before using the value.
// use unknown keyword instead of any keyword when you don't know the return type of a function or the type of a variable, and you want to enforce type safety by requiring explicit type checks before using the value.
function process(val: unknown): void {
    if(val === null || val === undefined) {
        console.log("Value is null or undefined");
    } else {
        console.log("Value is not null or undefined");
        if(typeof val === "object" && "log" in val && typeof val.log === "function") {
            val.log("Logging from the object"); // Now TypeScript knows that val has a log method, so you can safely call it.
        } 
    }
}

process(null); // Output: Value is null or undefined
process(undefined); // Output: Value is null or undefined
process("Hello, World!"); // Output: Value is not null or undefined but does not have a log method, so nothing is logged from the object.
process({ name: "Alice", log: (msg: string) => console.log("Log: " + msg) }); // Logged from object

