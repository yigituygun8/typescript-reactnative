// Enum: A way to define a set of named constants.
enum Role {
    Admin,
    User,
    Guest,
} // you can of course override the default values of the enum members by assigning specific values to them.

console.log(Role.Admin); // Output: 0
console.log(Role.User); // Output: 1
console.log(Role.Guest); // Output: 2

// Using the enum values
let userRole: Role = Role.Admin; // Valid
// let userRole: Role = 5; // Error: Type '5' is not assignable to type 'Role'. The value must be one of the defined enum members (Admin, User, Guest).

// Example of using enums in a function
function getRoleName(role: Role): string {
    switch (role) {
        case Role.Admin:
            return "Admin";
        case Role.User:
            return "User";
        case Role.Guest:
            return "Guest";
        default:
            return "Unknown role";
    }
}

console.log(getRoleName(Role.Admin));

// Type Aliases: A way to create a new name for a type. Type aliases can be used to define complex types, union types, intersection types, and more.
// They are good for reusing types and improving code readability. Type aliases can also be used to create more descriptive names for existing types, making the code easier to understand.
type UserRole = "admin" | "user" | "guest";
// modify UserRole type alias to include a new role
type ExtendedUserRole = UserRole | "super"; // Now UserRole can be "admin", "user", "guest", or "super"
// P.S. Declaration merging is not possible with type aliases, so you cannot add new members to an existing type alias. You can only create a new type alias that extends the existing one. 

let userRole2: ExtendedUserRole = "admin"; // Valid
// userRole2 = "super"; // Error: Type '"super"' is not assignable to type 'UserRole'.

