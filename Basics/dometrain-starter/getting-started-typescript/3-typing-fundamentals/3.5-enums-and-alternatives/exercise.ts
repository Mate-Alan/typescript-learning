// 1. Define an enum called Direction with four possible values: Up, Down, Left, Right

enum Direction {
    Up,
    Down,
    Left,
    Right
};

// 2. Create a function called `move` that takes a Direction enum as an argument and uses a switch to return a corresponding string like "Moving up!"
function move(direction: Direction): string {

    switch (direction) {
        case Direction.Up:
            return "Moving up!";
        case Direction.Down:
            return "Moving down!";
        case Direction.Left:
            return "Moving left!";
        case Direction.Right:
            return "Moving right!";
        default:
            return "Unknown direction!";
    }
}

// 3. Define an enum called Status with explicit values: Success = 1, Failure = -1, Pending = 0

enum Status {
    Success = 1,
    Failure = -1,
    Pending = 0
};

// 4. Create a function called getStatusMessage that accepts the Status enum as an argument and returns a corresponding message like "Operation was successful! or "Operation failed!"

function getStatusMessage(status: Status) {
    switch (status) {
        case Status.Success:
            return "Success";
        case Status.Failure:
            return "Failure";
        case Status.Pending:
        default:
            return "Pending";
    }
}
// 5. Implement the same feature, but this time use a object literal instead of an enum

const StatusConst = {
    Success: 1,
    Failure: -1,
    Pending: 0
} as const;


// 6. Create a function called getStatusMessageLiteral that accepts the statusLiteral as an argument and returns a corresponding message

function getStatusMessageLiteral(status: keyof typeof StatusConst): string {
    switch(status) {
        case "Success":
            return "Operation was successful!";
        case "Failure":
            return "Operation failed!";
        case "Pending":
        default:
            return "Operation is pending!";
    }
}