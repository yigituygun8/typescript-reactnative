import add = require("./util");
// tsc --init to create a tsconfig.json file for configuring the TypeScript compiler options

// just type tsc to compile the TypeScript code to JavaScript code. No need to target this file
console.log("Hello, TypeScript!");
console.log("Updated");
console.log("2 + 3 =", add(2, 3));

// tsc --watch to watch for changes and recompile automatically

// to run the code, use node dist/app.js (or the path to the compiled JavaScript file)
