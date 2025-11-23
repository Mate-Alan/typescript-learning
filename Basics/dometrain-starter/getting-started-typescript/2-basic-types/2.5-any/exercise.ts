// Exercise: Understanding the `any` type in TypeScript

// 1. Declare a variable with the `any` type and assign it a string value.
let name: any = "Alan";

// 2. Reassign the variable to a number.
name = 25;

// 3. Reassign the variable to an object with a name property that's set to "TS".
name = {
    name: "TS"
};
// 4. Create a function that accepts a parameter of type `any` and logs its type and value.
function logTypeAndValue(input: any) {
    console.log(`value: ${input}; type: ${typeof(input)} `)
}

// 5. Call the function with different types of arguments (string, number, object, array).
logTypeAndValue("hallo");
logTypeAndValue(25);
logTypeAndValue({name: "alan"});

// 6. Explain why using `any` can be both useful and potentially problematic in TypeScript.
// any seems to be useful because like this we can easily swope types  but it is problematic because like this we can pass 
// anything inside a function or variable which is maybe not expected and by this we produce runtime errors.