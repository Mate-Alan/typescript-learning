// Exercise: Declare variables with different primitive types in TypeScript

// 1. Declare a variable named `planet` of type string and assign it the value "Earth".
const planet = "Earth";
let planetTwo: string = "Earth";

// 2. Declare a variable named `isRaining` of type boolean and assign it the value false.
let isRaining = false;

// 3. Declare a const named `pi` of type number and assign it the value 3.14.
const pi: number = 3.14;

// 4. Assign- a value of the wrong type to one of variables above. What happens?
// This will cause a TypeScript error because `planet` is declared as a string.

// 5. Remove the explicit type annotations above, then hover over each variable's name. Does anything change?
// TypeScript inferts the type based on the assigned value.
// if declaring a const without an explicit type annotation, the assigned value as type.