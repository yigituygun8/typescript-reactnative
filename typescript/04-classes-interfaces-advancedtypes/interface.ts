/*Interfaces: object type definitions & contracts that can be implemented by classes

An interface can only describe object structures or function signatures. 
A type alias can create a new name for primitive values, unions (either/or types), and fixed-length arrays (tuples)

Interfaces are open, meaning if you declare two interfaces with the exact same name in the same scope, TypeScript automatically merges their properties. (Declaration Merging) 
Types are closed and will throw a compilation error if re-declared.

Interfaces extend other interfaces using the extends keyword. Types combine structures using the intersection operator (&).
*/

interface Authenticable {
    email: string;
    password: string;
    login(): boolean; // You can also define methods in interfaces, but they don't have an implementation. The implementation is provided by the class that implements the interface.
    logout(): void; // In the interface, it cannot contain any implementation.
}

// Declaration Merging: Mostly used for extending existing interfaces, especially in third-party libraries where you want to add additional properties or methods to an existing interface without modifying the original source code. This is particularly useful in scenarios where you want to enhance the functionality of a library or framework without directly altering its codebase.
interface Authenticable {
    twoFactorAuthEnabled: boolean;
    enableTwoFactorAuth(): void;
    disableTwoFactorAuth(): void;
}

// Or interfaces can extend other interfaces using the extends keyword. This allows you to create a new interface that inherits the properties and methods of one or more existing interfaces, promoting code reuse and modularity.
interface AuthenticableAdmin extends Authenticable {
    role: "admin" | "superadmin";
    manageUsers(): void;
} // we created additional interface and not changed the original Authenticable interface. This is a good practice because it keeps the original interface intact and allows for more specific implementations in the new interface.

interface Profile {
    name: string;
    avatarUrl?: string; // Optional property, denoted by the ? symbol. It means that an object of type Profile may or may not have this property.
}
// You can use interfaces just like object types

type AuthenticatedUser = Authenticable & Profile; // This is an intersection (&) type that combines the properties of both Authenticable and Profile interfaces. Any object of type AuthenticatedUser must have all the properties and methods defined in both interfaces.

let user: AuthenticatedUser = {
    email: "john@example.com",
    password: "securepassword",
    name: "John Doe",
    twoFactorAuthEnabled: false,
    login() {
        // logic to authenticate user
        return true;
    },
    logout() {
        // logic to log out user
    },
    enableTwoFactorAuth() {
        // logic to enable two-factor authentication
    },
    disableTwoFactorAuth() {
        // logic to disable two-factor authentication
    }
};