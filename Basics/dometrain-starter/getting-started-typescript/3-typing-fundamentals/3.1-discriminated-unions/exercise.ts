// Define a Vehicle type using discriminated union.
// The type should have two possible shapes: car or truck.

interface Car {
    kind: "car",
    numberOfDoors: number
};

interface Truck {
    kind: "truck",
    payloadCapacity: number
};

type Vehicle = Car | Truck;

// The car shape should have a numberOfDoors property.
// The truck shape should have a payloadCapacity property
// Write a function `describeVehicle` that accepts a Vehicle and returns a string describing the vehicle.
// The function should return "A car with X doors." for car shapes,
// "A truck with a payload capacity of Y." for truck shapes

function describeVehicle(vehicle: Vehicle): string {

    if(vehicle.kind === 'car') return `A car with ${vehicle.numberOfDoors} doors.`;
    else return `A truck with a payload capacity of ${vehicle.payloadCapacity}`;
    // would be better to add an exhaustive check for the future if a new vehicle kind will be added.
}

// Test cases
const car: Vehicle = { kind: "car", numberOfDoors: 4 };
const truck: Vehicle = { kind: "truck", payloadCapacity: 2000 };

console.log(describeVehicle(car)); // Should print the description of the car
console.log(describeVehicle(truck)); // Should print the description of the truck
