function generateError(msg?: string) { // ? means that the msg parameter is optional. If no value is provided for msg, it will be undefined by default.
    throw new Error(msg || "An error occurred."); // If msg is undefined, it will use the default message "An error occurred."
}

// generateError("This is a custom error message."); // Output: Uncaught Error: This is a custom error message.
// generateError(); // Output: Uncaught Error: An error occurred.

type Kullanici = {
    name: string;
    age: number;
    role?: "admin" | "user" | "guest"; // ? means that the role property is optional. If no value is provided for role, it will be undefined by default.
}

// Nullish Coalescing Operator (??): A way to provide a default value for a variable if it is null or undefined.
// ?? vs ||: The nullish coalescing operator (??) only considers null and undefined as nullish values, while the logical OR operator (||) considers all falsy values (null, undefined, 0, "", false, NaN) as falsy. Therefore, ?? is more precise when you want to provide a default value only for null or undefined.
let input = 0; // input is a falsy value, but it is not null or undefined.
const didProvideInput = input || false; // didProvideInput will be false because input is a falsy value, but it is not null or undefined. Therefore, the logical OR operator (||) will return the second operand (false) instead of the first operand (input).
const didProvideInput2 = input ?? false; // didProvideInput2 will be 0 because input is not null or undefined. Therefore, the nullish coalescing operator (??) will return the first operand (input) instead of the second operand (false).
console.log(didProvideInput); // Output: false
console.log(didProvideInput2); // Output: 0