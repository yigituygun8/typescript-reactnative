function addF(a = 5, b: number): number {
    return a + b;
}

console.log(addF(3, 4)); // Output: 7
console.log(addF(undefined, 4)); // Output: 9. 
// Gotta use undefined to use the default value of a, because null is a valid value for a and it will be used instead of the default value.
// Also, when we do addF(4) we get error because b is required and we didn't provide a value for it. 4 goes to a automatically. 
// If it was vice versa, (a required, b optional) we could do addF(4) and it would work, because 4 goes to a and b is optional. But in this case, b is required and we didn't provide a value for it, so we get an error.

function displayMessageFormatted(msg: string): void {
    console.log(`Message: ${msg}`);
}
let returnType = displayMessageFormatted("Hello, World!"); // Output: Message: Hello, World!
console.log(returnType); // Output: undefined. Because the function doesn't return anything, it returns undefined by default. The return type of the function is void, which means it doesn't return anything. But it still returns undefined by default.

// never type: A function that never returns a value. It can be used to indicate that a function will always throw an error or terminate the program.
// It will not return anything but also it will not return at all.
function logAndThrow(errorMsg: string): never {
    console.error(`Error: ${errorMsg}`);
    throw new Error(errorMsg);
}

// const logged = logAndThrow("This is a critical error!"); // Not works. Compile-time error: Type 'never' is not assignable to type 'void'. Because the function never returns, it cannot be assigned to a variable of type void. The return type of the function is never, which means it will never return a value. It will always throw an error or terminate the program.
// logAndThrow("This is a critical error!"); // Works. Runtime error: Uncaught Error: This is a critical error! Because the function never returns, it will always throw an error or terminate the program. In this case, it throws an error with the message "This is a critical error!" and terminates the program.

function performJob(cb: (msg: string) => void): void {
    console.log("Starting job...");
    cb("Job in progress...");
    console.log("Job completed.");
}

performJob(displayMessageFormatted); // Output: Starting job... Message: Job in progress... Job completed.

type User = {
    name: string;
    age: number;
    greet: (msg: string) => void;
}

// shared function body to avoid duplication
const greet = function(this: User, msg: string): void {
    console.log(`${this.name} says: ${msg}`);
}

let user1: User = {
    name: "Alice",
    age: 30,
    greet
}

let user2: User = {
    name: "Bob",
    age: 25,
    greet
}

user1.greet("Hello!"); // Output: Alice says: Hello!
user2.greet("Hello!"); // Output: Bob says: Hello!