/*
Classes in TypeScript are a way to create blueprints for creating objects with similar properties and methods.

Default Public: All properties and methods are public by default.
Explicit Modifiers: public (anywhere), protected (class and subclasses), private (class only).
Runtime Privacy: Use native JS #property syntax for true runtime encapsulation.
Readonly Flag: Use readonly to prevent re-assignment after constructor initialization.

Parameter Properties: Declare modifiers directly in constructor(public name: string) to auto-assign fields.
Super Calls: Derived classes must call super() before accessing this in constructors.
Definite Assignment: Use ! (e.g., name!: string) if initialized outside the constructor.

Abstract Classes: Blueprints that cannot be instantiated directly; require abstract methods.
Interface Implementation: Use implements to force a class to follow a specific structure.
Static Members: Accessible on the class itself via ClassName.member, not instances.
Getters/Setters: Use get and set syntax to intercept property access and mutation.
*/

class Person {
    // Properties (Fields)
    // name: string;
    // age: number;
    readonly id: number = Math.floor(Math.random() * 10000); // Unique ID for each person, readonly to prevent modification after initialization

    // P.S. if you had a readonly array like hobbies, you could still modify the contents of the array, but you couldn't reassign the array itself. For example:
    // readonly hobbies: string[] = ["reading", "traveling"];
    // hobbies.push("coding"); // This is allowed
    // hobbies = ["new hobby"]; // This would cause an error
    // To make the contents of the array immutable, you could use Object.freeze() or a library like Immutable.js.

    static species: string = "Homo sapiens"; // Static property, shared across all instances of Person. Also, it is public by default

    // Constructor
    // constructor(name: string, age: number) {
    //     this.name = name;
    //     this.age = age;
    // }
    // or instead you can use the shorthand syntax for defining properties in the constructor
    constructor(public name: string, private _age: number) {}

    // Getter for age
    get age() {
        return this._age;
    }

    set age(value: number) {
        if(value < 0) {
            throw new Error("Age cannot be negative.");
        }
        this._age = value;
    } // don't forget that this is public, so you can access it from outside the class, but the actual property is private, so you can't access it directly.

    // Method
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this._age}.`);
    }
    static printSpecies() {
        console.log(Person.species);
    }
}
    
Person.printSpecies();

const person1 = new Person("Alice", 30);
 
console.log(person1.id); // Accessing the id property because it is public.
person1.age = 31; // Modifying the age property using the setter
console.log(person1.age); // Accessing the age property using the getter

person1.greet();
// person1.id = 1111; // Error: Cannot assign to 'id' because it is a read-only property.

abstract class UIElement {
    constructor(public identifier: string) {}

    clone(targetLocation: string) {
        // logic to duplicate the element and place it in the target location
        // Can be implemented in the base class if the logic is common, or overridden in subclasses if specific behavior is needed.
    }
    // abstract method that must be implemented by subclasses
    abstract render(): void;
}

// let uiEl = new UIElement("button"); // Error: Cannot create an instance of an abstract class because it is abstract.

class SideDrawerElement extends UIElement {
    constructor(public identifier: string, public position: "left" | "right") {
        super(identifier);
    }
    
    override clone(targetLocation: string) {
        // Specific logic for duplicating a side drawer element and placing it in the target location
    }

    render() {
        // Implementation for rendering the side drawer element
    }
}