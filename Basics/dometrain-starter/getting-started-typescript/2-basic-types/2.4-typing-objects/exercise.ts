// Exercise: Typing Objects in TypeScript

// Question 1: Create an object literal representing a book with the following properties:
// - title: string
// - author: string
// - pages: number

const book = {
    title: "Harry Potter",
    author: "Alan Rachid",
    pages: 200
}

// Question 2: If you try adding another property to the object literal book object, does TypeScript allow it?
// typescript will not allow it because the property will not exist on the type


// Question 3: Define an interface `Car` with the following properties:
// - make: string
// - model: string
// - year: number
// Then, create an object that conforms to this interface.

interface Car {
    make: string,
    model: string,
    year: number
};

const mercedes: Car = {
    make: "test",
    model: "cls amg 63",
    year: 2024
};

// Question 4: Define a type alias called `Car2` with the same shape as `Car`.
// Then, create an object that conforms to this type alias.

type Car2 = {
    make: string,
    model: string,
    year: number
};

const porsche: Car2 = {
    make: "Irgendwas",
    model: "dies das",
    year: 2023
};

// Question 5: Create an interface called `Car3` with the same shape as `Car`,
// but allow any additional properties to be added.
interface Car3 {
    make: string,
    model: string,
    year: number,
    [key: string]: any
};

const tesla: Car3 = {
    make: "Noch",
    model: "eins",
    year: 2022,
    test: "test",
    test1: "test"
};