/*
as const keyword is used to create a readonly tuple or object in TypeScript. It allows you to define a value that cannot be changed after its initial assignment. 
This is particularly useful when you want to ensure that certain values remain constant throughout your code.

| Özellik | Standart `const` dizi | `as const` dizi |
| --- | --- | --- |
| Değişkeni yeniden atama (`arr = []`) | ❌ JavaScript/TypeScript tarafından engellenir | ❌ JavaScript/TypeScript tarafından engellenir |
| Elemanları değiştirme (`arr[0] = 5`) | ✅ İzin verilir | ❌ TypeScript tarafından engellenir |
| Dizi metotları (`arr.push(4)`) | ✅ İzin verilir | ❌ TypeScript tarafından engellenir |
| Inferred tür | `number[]` (genişletilmiş tür) | `readonly [1, 2, 3]` (literal tuple) |

It is crucial to remember that as const is a TypeScript-only feature. When your code is compiled into raw JavaScript, the as const disappears. 
If your compiled JavaScript code attempts to mutate the array at runtime (for example, if receiving data from an external un-typed API), the JavaScript engine will not stop it. 
If you need true runtime immutability in JavaScript, you would need to use native tools like Object.freeze([1, 2, 3])

Why use `as const`?
- It provides better type inference, giving you more specific types.
- It helps prevent accidental mutations of values.
- It makes your code more predictable and easier to reason about.
*/

let roles = ["admin", "user", "guest"]; 
// The `as const` assertion makes the array readonly and infers the type as a tuple of string literals.
// Without it, types would be inferred as string[] (array of strings).
let rolesAsConst = ["admin", "user", "guest"] as const;
// rolesAsConst[0] = "superadmin"; // ❌ Error: Cannot assign to '0' because it is a read-only property.