// The first member is assigned 0 if not explicit
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
// Compiles to:
// var Color;
// (function (Color) {
//   Color[(Color["Red"] = 0)] = "Red";
//   Color[(Color["Green"] = 1)] = "Green";
//   Color[(Color["Blue"] = 2)] = "Blue";
// })(Color || (Color = {}));
