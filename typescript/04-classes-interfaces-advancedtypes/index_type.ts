// Used to define a recursive data structure where each key can map to a string, number, boolean, or another DataStore object. This allows for flexible and nested data representations.
// Also when we do not know the exact structure of the data we are working with, we can use this type to represent it. For example, if we are working with a JSON object that can have nested objects, we can use the DataStore type to represent it.
type DataStore = {
    [key: string]: string | number | boolean | DataStore;
}

let store: DataStore = {};
store.id = 5;
store.isOpen = true;
store.details = {
    name: "My Store",
    location: "New York",
    isOpen: true,
} // This is a nested DataStore object, where the "details" key maps to another DataStore object.
// ... you can add more properties to the store object as needed, and they can be of type string, number, boolean, or another DataStore object. This allows for a flexible and dynamic data structure that can accommodate various types of data.
console.log(store); // Output: { id: 5, isOpen: true, details: { name: 'My Store', location: 'New York', isOpen: true } }