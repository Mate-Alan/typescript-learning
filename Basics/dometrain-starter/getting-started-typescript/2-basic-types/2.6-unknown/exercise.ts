// Exercise: Working with the `unknown` type in TypeScript

// 1. Declare a variable of type `unknown` and assign a value to it.
const unknownValue: unknown = "alan";
// 2. Write a function `isString` that takes an argument of type `unknown`
// and returns true if the argument is a string.

function isString(value: unknown): boolean {
    return typeof (value) === 'string'

}

// 3. Call the isString function above to check if the `unknownValue` is a string,
// and if so, log its length to the console.

if (isString(unknownValue)) {
    console.log((unknownValue as string).length);
}


// suggested solution: 
function isString1(value: unknown) {
    return typeof (value) === 'string'
}

if (isString1(unknownValue)) {
    console.log(unknownValue.length);
}

// DIFFERENCES: 
//TypeScript only narrows types based on:
//Built-in checks (typeof value === "string", value instanceof Foo, etc.), or
//Functions whose return type is a type predicate (value is string).
//In your second version you told TS: “this function returns a plain boolean”, so it cannot narrow.
// also possible:

function isString2(value: unknown): value is string {
  return typeof value === 'string';
}

let unknownValue2: unknown = "test";

if (isString2(unknownValue2)) {
  // inside this block, TypeScript now knows:
  // unknownValue: string
  console.log(unknownValue2.length); // ✅ no cast needed
}