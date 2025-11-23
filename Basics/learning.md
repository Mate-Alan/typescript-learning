# typescript learning

#TypeScript compiler
tsc helloworld.ts

tsc --target es2015 helloworld.ts

## Types in Javascript
Type annotations aren't part of JavaScript (or ECMAScript), so there really aren’t any browsers or other runtimes that can just run TypeScript unmodified. That’s why TypeScript needs a compiler in the first place - it needs some way to strip out or transform any TypeScript-specific code so that you can run it. By default TypeScript targets ES5, an extremely old version of ECMAScript. We could have chosen something a little bit more recent by using the target option. Running with --target es2015 changes TypeScript to target ECMAScript 2015, meaning code should be able to run wherever ECMAScript 2015 is supported. 

## Strictness
These strictness settings turn static type-checking from a switch (either your code is checked or not) into something closer to a dial. The further you turn this dial up, the more TypeScript will check for you. This can require a little extra work, but generally speaking it pays for itself in the long run, and enables more thorough checks and more accurate tooling. When possible, a new codebase should always turn these strictness checks on.
TypeScript has several type-checking strictness flags that can be turned on or off, and all of our examples will be written with all of them enabled unless otherwise stated. The strict flag in the CLI, or "strict": true in a tsconfig.json toggles them all on simultaneously, but we can opt out of them individually. The two biggest ones you should know about are noImplicitAny and strictNullChecks.

## let vs. var vs. const

const by default: If you don’t plan to reassign, use const. It communicates intent and gives safer code.
let if mutable: When you know you’ll reassign (e.g. loop counters, temporary variables).
Avoid var: Its function scope and hoisting quirks often lead to bugs; only use if you really need function scoping or for legacy code compatibility.

### Quick Comparison: `var` vs. `let` vs. `const`

| Feature               | `var`                                   | `let`                                   | `const`                                    |
|-----------------------|-----------------------------------------|-----------------------------------------|--------------------------------------------|
| **Scope**             | Function or global                      | Block (inside `{ … }`)                  | Block (inside `{ … }`)                     |
| **Hoisting**          | Yes – initialized as `undefined`        | Yes – but in a “Temporal Dead Zone”     | Yes – but in a “Temporal Dead Zone”        |
| **Redeclaration**     | ✅ Allowed                              | ❌ Error                                 | ❌ Error                                    |
| **Reassignment**      | ✅ Allowed                              | ✅ Allowed                              | ❌ Error (binding is fixed)                |
| **Value Mutability**  | Depends on the value type               | Depends on the value type               | Depends – container is fixed, contents OK |

---

### What This Means

- **Function vs. Block Scope**  
  - **`var`**: Think “function-wide.”  
  - **`let` & `const`**: Think “within these `{ }` only.”

- **Hoisting & the “Temporal Dead Zone”**  
  - All three declarations are moved (“hoisted”) to the top of their scope.  
  - For `let`/`const`, you cannot use them before their actual line of declaration (you’ll get a ReferenceError).  
  - For `var`, using it before declaration yields `undefined`, which can hide bugs.

- **When You Can Change It**  
  - **Redeclare?** Only `var`.  
  - **Reassign?** `var` & `let`. Not `const`.  
  - **Mutate (e.g. push to an array)?** All three let you mutate objects/arrays—`const` only stops you from reassigning the variable itself.

---

### Examples

```js
// 1) Scope & Hoisting
console.log(aVar);   // undefined  
console.log(aLet);   // ReferenceError  
var aVar = 10;
let aLet = 20;

// 2) Redeclaration
var x = 1;
var x = 2;           // OK
let y = 1;
let y = 2;           // Error

// 3) Reassignment
const z = 3;
z = 4;               // Error

// 4) Mutating contents
const arr = [1, 2];
arr.push(3);         // OK (mutates array)
arr = [];            // Error (reassigning binding)

```

## what is tsconfig.json
A tsconfig.json file in a TypeScript project is the central configuration file that tells the TypeScript compiler:
- Which files to include or exclude
- How to compile (what target JavaScript version, module system, JSX handling, etc.)
- Which compiler options to enable (strict null checks, source maps, declaration files, and so on)

### Location & Discovery
Placing a tsconfig.json in a directory tells tsc (the TypeScript compiler) that this directory is the root of a TypeScript project.

Running tsc with no file arguments automatically looks for tsconfig.json in the current directory (or walks up parent folders until it finds one).

```jsonc
{
  "compilerOptions": {
    "target": "es2017",        // Which ECMAScript version to compile to
    "module": "commonjs",      // Module system for output (e.g. CommonJS, ESNext)
    "strict": true,            // Enable all strict type-checking options
    "jsx": "react-jsx",        // JSX emit mode (React 17+)
    "sourceMap": true,         // Generate .map files for debugging
    "outDir": "./dist",        // Output directory for compiled .js files
    "rootDir": "./src",        // Input directory for .ts/.tsx source files
    "baseUrl": ".",            // Base path for non-relative module imports
    "paths": {                 // Aliases for cleaner imports
      "@app/*": ["src/app/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}

Flag | Type | Default | Description
target | string | es3 | Which ECMAScript version to output (e.g. es5, es2015, es2017, esnext).
module | string | commonjs | Module system for emitted code (e.g. commonjs, esnext, umd, amd, system).
strict | boolean | false | Enable all strict type-checking options as a bundle.
jsx | string | preserve | How to handle JSX (options: preserve, react, react-jsx, react-jsxdev).
sourceMap | boolean | false | Emit .map files to map compiled JS back to your TS source for debugging.
outDir | string | — | Directory to place compiled .js files.
rootDir | string | — | Root folder where TS looks for input .ts/.tsx files.
baseUrl | string | — | Base path for resolving non-relative module imports.
paths | object | — | Map import aliases to physical paths (requires baseUrl).
alwaysStrict | boolean | false | Parse files in strict mode & emit "use strict"; at the top of each output file.
noImplicitAny | boolean | false | Error when the compiler infers an any type for a variable or parameter.
strictNullChecks | boolean | false | Treat null and undefined as distinct types, preventing many runtime errors.
strictFunctionTypes | boolean | false | Enforce more accurate function type compatibility (fixes bivariance issues).
strictBindCallApply | boolean | false | Check argument and return types for built-ins like .bind, .call, and .apply.
strictPropertyInitialization | boolean | false | Ensure each class property is initialized in the constructor or declared optional.
noImplicitThis | boolean | false | Error when this is inferred as any in functions or methods.
```

## functions
**parameter Type Annotations**<br/>
When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

**Return Type Annotations**<br/>
You can also add return type annotations. Return type annotations appear after the parameter list:


```
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

```

**contextual typing**<br/>
Even though the parameter s didn’t have a type annotation, TypeScript used the types of the forEach function, along with the inferred type of the array, to determine the type s will have.

This process is called contextual typing because the context that the function occurred within informs what type it should have.

Similar to the inference rules, you don’t need to explicitly learn how this happens, but understanding that it does happen can help you notice when type annotations aren’t needed. Later, we’ll see more examples of how the context that a value occurs in can affect its type.

## properties ##
In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error. Because of this, when you read from an optional property, you’ll have to check for undefined before using it.

## Union Types
TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

```
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
```

It’s easy to provide a value matching a union type - simply provide a type matching any of the union’s members. If you have a value of a union type, how do you work with it?

TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union string | number, you can’t use methods that are only available on string

The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

For example, TypeScript knows that only a string value will have a typeof value "string":

```
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

### Type Aliases
We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

A type alias is exactly that - a name for any type. The syntax for a type alias is:

```
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

```

#### Why Use Type Aliases?
**Readability & Self-Documentation**

- Instead of seeing string | number everywhere, you see ID, which tells you what that type represents.
- Custom names clarify your intent.

**Reusability**

- Define once, use everywhere. If the shape changes, update it in one place.
- Great for complex object shapes or function signatures.

**Composition**
- Combine aliases via unions, intersections, tuples, etc.
- Build more complex types from simpler ones.

**Tooling & Refactoring**
- Editors show the alias name, making it easier to navigate large codebases.
- Renaming an alias propagates consistently.

### Interfaces
An interface declaration is another way to name an object type:

```
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### Differences between Type Aliases and Interfaces
Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

**Extending an interface**
```
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}
```

**Extending a type via intersection**
```
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}
```

**Adding new fields to Interface**
```
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}
```

### Literal Types
# Literal Types in TypeScript

**Literal types** let you specify that a variable or parameter must be exactly a specific value—rather than a broader type like `string` or `number`. You can use:

- **String literals**  
- **Numeric literals**  
- **Boolean literals**  
- **`null` / `undefined` literals**  

---

## 1. Basic Literal Types

```ts
let direction: "north" | "south" | "east" | "west";
direction = "north";   // ✅
direction = "up";      // ❌ Error: Type `"up"` is not assignable

let count: 0 | 1 | 2;
count = 1;             // ✅
count = 3;             // ❌ Error: Type `3` is not assignable

let flag: true;
flag = true;           // ✅
flag = false;          // ❌ Error: Type `false` is not assignable
```

By default, unannotated literals in variables get widened to a broader type:

```ts
let x = "hello";       
// x inferred as string, not the literal "hello"

const y = "hello";     
// y inferred as the literal type "hello"
```

You can mix literal types with broader ones:

```ts
type ID = number | "auto";  
// ID can be any number, or the literal string "auto"

function fetchPage(id: ID) { … }
fetchPage(123);
fetchPage("auto");

// example
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label: string;
  size?: ButtonSize;   // defaults to "medium"
}

function renderButton(props: ButtonProps) {
  const sizeClass = {
    small: "btn-sm",
    medium: "btn-md",
    large: "btn-lg",
  }[props.size ?? "medium"];

  return `<button class="${sizeClass}">${props.label}</button>`;
}

// Usage:
renderButton({ label: "Save", size: "large" });  // ✅
renderButton({ label: "Cancel", size: "xlarge" }); // ❌ Error
```
## Literal Inference in TypeScript

**Literal inference** (sometimes called **widening**) is how TypeScript decides whether a literal value like `"hello"` or `42` should become a **specific literal type** (`"hello"`) or a **wider primitive type** (`string` or `number`).  

---

### 1. Widening vs. Preserving

- **Widening**: by default, most literal initializers are “widened” to their general primitive type.  
- **Preserving**: in certain contexts (notably with `const`), TypeScript preserves the exact literal type.

```ts
let x = "hello";    // x: string    (widened)
const y = "hello";  // y: "hello"   (preserved)
```

### 2. Controlling Literal Inference
- **As const** <br/>
  - Apply a “const assertion” to freeze every property as literal
  - All string/number/boolean literals stay exact.
  - Properties become readonly.
  
```ts
let obj = {
  text: "hello",
  count: 0
} as const;
// obj: { readonly text: "hello"; readonly count: 0 }

```
- **Typed Annotations**
  - You can also force a literal type via an explicit annotation:
```ts
let dir: "up" | "down" = "up";  // dir is literal union
```
- Literal inference is TypeScript’s process of deciding whether a literal stays exact or is widened to its primitive.
- By default, most let and function parameters widen; const and as const preserve.
- Controlling inference helps you work with literal/unions and get strong type safety, especially for discriminated unions and API boundaries.

## 4. Are “TS enum” members considered literal types?

**Short answer:** No — not in the same sense that a union like `"foo" | "bar"` is a literal type.

When you write:
```ts
enum Color {
  Red   = "RED",
  Green = "GREEN",
  Blue  = "BLUE"
}
```
TypeScript emits a JavaScript object under the hood:
```js
// Roughly:
var Color;
(function (Color) {
  Color["Red"]   = "RED";
  Color["Green"] = "GREEN";
  Color["Blue"]  = "BLUE";
})(Color || (Color = {}));
```
- At **runtime**, `Color` is the object `{ Red: "RED", Green: "GREEN", Blue: "BLUE" }`.
- At **compile time**, each member (e.g. `Color.Red`) has the *literal type* `"RED"`, but the enum itself is **not** a union of literal types.

In other words:
```ts
type T1 = Color.Red;                           // T1 is the literal type "RED"
type T2 = Color.Green;                         // T2 is the literal type "GREEN"
type T3 = Color.Red | Color.Green | Color.Blue; // "RED" | "GREEN" | "BLUE"
```
However, you **cannot** do:
```ts
function paint(c: Color) { … }
```
and expect `c` to be treated as the union `"RED" | "GREEN" | "BLUE"`. Instead, `Color` is its own enum type at compile time.

---

### How TypeScript treats an enum’s namespaces

Internally, TypeScript maintains two separate namespaces for an enum named `Color`:

1. **Type namespace**  
   - `Color` (the enum type)  
   - Its members are `Color.Red`, `Color.Green`, `Color.Blue` (each having the literal types `"RED"`, `"GREEN"`, `"BLUE"` respectively).

2. **Value namespace**  
   - The generated object `{ Red: "RED", Green: "GREEN", Blue: "BLUE" }` that exists at runtime.

When you write:
```ts
function paint(c: Color) { … }
```
TypeScript will only allow you to pass `Color.Red`, `Color.Green`, or `Color.Blue`. You **cannot** pass a raw string like `"RED"` without a cast:
```ts
paint("RED");          // ❌ Error: Type 'string' is not assignable to type 'Color'
paint(Color.Red);      // ✅ OK
paint("RED" as Color); // ✅ (but you lose compile-time safety)
```


## Type Narrowing in TypeScript

**Type narrowing** is the process by which TypeScript refines a broad type (often a union) into a more specific one based on runtime checks or compile-time information. Narrowing lets you write code that’s both safe and expressive.

---

### 1. Why Narrowing Matters

Given a union type, e.g.:

```ts
type Shape = Circle | Square | Rectangle;
```

you can’t directly access properties specific to Circle until you tell TypeScript, “I know this is a Circle now.” Narrowing provides those guarantees.

### 2. Common Narrowing Techniques
### typeof Checks
Use JavaScript’s typeof operator on primitives:

```ts
function formatValue(x: string | number) {
  if (typeof x === "string") {
    // x: string
    return x.trim();
  } else {
    // x: number
    return x.toFixed(2);
  }
}
```
typeof type guards <br/>
As we’ve seen, JavaScript supports a typeof operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

- "string"
- "number"
- "bigint"
- "boolean"
- "symbol"
- "undefined"
- "object"
- "function"

### instanceof Checks
For class-based objects:

```ts
class Dog { bark() {} }
class Cat { meow() {} }

function interact(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    // pet: Dog
    pet.bark();
  } else {
    // pet: Cat
    pet.meow();
  }
}

```
### Truthiness narrowing
In JavaScript, we can use any expression in conditionals, &&s, ||s, if statements, Boolean negations (!), and more. As an example, if statements don’t expect their condition to always have the type boolean

```ts
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```
In JavaScript constructs like if first "coerce" their conditions to booleans to make sense of them, and then choose their branches depending on whether the result is true or false. Values like

- 0
- NaN
- "" (the empty string)
- 0n (the bigint version of zero)
- null
- undefined

all coerce to false. To coerce values to boolean you can run them throug Boolean function, or by using double-Boolean negation.

```ts
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true

//examlpe usage of truthiness narrowing
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

#### Understanding `!!"world"`

In JavaScript (and TypeScript), the expression `!!"world"` is a common idiom used to convert
any value into its Boolean equivalent. Here’s a step-by-step breakdown:

1. `"world"` is a non-empty string, which is considered **truthy** in JavaScript.
2. The first `!` (logical NOT) operator coerces `"world"` to a Boolean and then negates it:

    ```js
    !"world"   // → false
    ```
    - Because `"world"` is truthy, `!"world"` becomes `false`.

3. The second `!` negates the result of the first negation:

    ```js
    !!"world"  // → true
    ```
    - Since `!"world"` was `false`, `!!"world"` becomes `true`.

---

#### Why use `!!`?

- **Type coercion to Boolean**:  
  By using `!!`, you force JavaScript to treat the value as a Boolean (`true` or `false`), 
  regardless of its original type.

- **Common in conditional checks**:  
  Sometimes you want to be explicit about obtaining a `true`/`false` value from a variable, 
  for example:

    ```ts
    const name = getUserName();   // might return a string, null, or undefined

    if (!!name) {
      console.log("Username exists!");
    } else {
      console.log("No username provided.");
    }
    ```
    Here, `!!name` guarantees that you’re checking a **Boolean**—not just relying on truthiness/falsiness.

---

#### Other examples of “double bang”

```ts
!!""         // → false      (empty string is falsy)
!!"hello"    // → true       (non-empty string is truthy)

!!0          // → false      (0 is falsy)
!!42         // → true       (non-zero number is truthy)

!!null       // → false      (null is falsy)
!!undefined  // → false      (undefined is falsy)

!!{}         // → true       (any non-null object is truthy)
!![]         // → true       (empty array is also truthy)

```
### Equality narrowing

####  Difference Between `===` (Strict Equality) and `==` (Loose/Abstract Equality) in TypeScript

TypeScript’s equality operators behave exactly like JavaScript’s, since TypeScript compiles down to JavaScript. The two primary equality operators are:

1. `===` (strict equality)  
2. `==` (loose or abstract equality)

Below is a detailed breakdown of their differences, how they work, and when to use one vs. the other.

---

##### 1. `===` (Strict Equality)

- **No type coercion**: Both the _type_ **and** the _value_ must be exactly the same for `a === b` to evaluate to `true`.  
- If either operand differs in type or in value, the result is `false`.

###### Behavior:

1. **If types differ, never coerces** → immediately returns `false`.  
2. **If types are the same**, compares values:
   - For primitive types (number, string, boolean, symbol, `null`, `undefined`), it checks value equality.  
   - For `object` references (including arrays, functions, and dates), it checks reference identity (i.e., same object in memory).

##### Examples:

```ts
// Primitive values, same type & same value
0 === 0           // true
"hello" === "hello" // true
true === true     // true

// Same type, different value
0 === 1           // false
"foo" === "bar"   // false
false === true    // false

// Different types → always false
0 === "0"         // false (number vs. string)
false === 0       // false (boolean vs. number)
null === undefined // false (null vs. undefined)
[] === false      // false (object vs. boolean)

// Object references → only true if same reference
const obj1 = { x: 1 };
const obj2 = { x: 1 };
const obj3 = obj1;

obj1 === obj2     // false (different objects, even though `x:1` matches)
obj1 === obj3     // true  (same reference)
2. == (Loose or Abstract Equality)
Type coercion: When the two operands are of different types, JavaScript will try to convert one (or both) operands to a common type before comparing.

The rules for this coercion are somewhat complex (called the “Abstract Equality Comparison Algorithm”), but the most common conversions you’ll see are:

String ↔ Number:

"5" == 5 → true (coerces "5" to 5 and then compares numerically).

Boolean ↔ Number:

true == 1 → true (true coerces to 1),

false == 0 → true.

null and undefined:

null == undefined → true (this is one special rule—null and undefined compare equal under ==).

But note: null == 0 → false.

Object ↔ Primitive:

Attempts to call .valueOf() or .toString() on the object to get a primitive, then compare.

Because of these coercion rules, == can produce some non-intuitive results.

Examples:
// 1. String ↔ Number
"5" == 5         // true   ("5" → 5, then compare 5 == 5)
"0" == false     // true   ("0" → number 0, false → number 0)

" \t\n10\n " == 10 // true (string trimmed + converted to number 10)

// 2. Boolean ↔ Number
true == 1        // true  (true → 1)
false == 0       // true  (false → 0)
true == 2        // false (true → 1, but 1 != 2)

// 3. null and undefined
null == undefined // true
null == 0         // false
undefined == 0    // false

// 4. Object ↔ Primitive
[] == 0          // true  
// Explanation: [] → "" (via toString) → 0 (empty string converts to 0).

[""] == 0        // true  
// [""] → "" → 0

[1,2] == "1,2"   // true  
// [1,2].toString() → "1,2", so "1,2" == "1,2"

{} == "[object Object]" // false 
// {}.toString() → "[object Object]"; "[object Object]" == "[object Object]" is true, 
// but in `{} == "[object Object]"`, JS actually interprets the left object as a code block 
// (in certain REPL abbreviations). In practice, comparing a plain object to a string 
// usually yields false unless you explicitly transform it.

// 5. Unexpected pitfalls
"" == false      // true  
// "" → 0, false → 0 → 0 == 0 → true

" " == 0         // true  
// " " → "" (after trimming whitespace? Actually -> " " → Number(" ") → 0), so 0 == 0 → true

" \n " == 0      // true  
// Similar reasoning: whitespace-only string → Number(...) → 0

0 == "\n"       // true  
// "\n" -> Number("\n") -> 0

false == []      // true  
// [] → "" → 0, false → 0 => 0 == 0

false == {}      // false  
// {} → NaN when cast to number, false → 0, NaN == 0 -> false

"0" == []        // true  
// [] → "" → 0, "0" → 0, so 0 == 0 → true
```

### In operator narrowing

In TypeScript, the `in` operator can be used as a **type guard** to narrow down a union type by checking for the presence of a particular property on an object. When you write:

```ts
if ("foo" in someValue) {
  // ...
}
```

TypeScript will **narrow** the type of `someValue` inside that `if`-block to only those union members that are guaranteed to have a `"foo"` property.

---

#### 1. Why Use `in` Narrowing?

Imagine you have a discriminated union of two interfaces that do **not** share a common “tag” field, but do have different property names:

```ts
interface Cat {
  name: string;
  meow: () => void;
}

interface Dog {
  name: string;
  bark: () => void;
}

type Pet = Cat | Dog;
```

Neither `Cat` nor `Dog` has a common `kind` or `type` field, but they do have distinct methods:

- A `Cat` has `meow()`.
- A `Dog` has `bark()`.

If you receive a value of type `Pet` and need to determine “Is this a `Cat` or a `Dog`?”, you can use the `in` operator:

```ts
function handlePet(p: Pet) {
  if ("meow" in p) {
    // Inside this block, TS knows `p` is a `Cat` (because only `Cat` has `meow`)
    p.meow();
  } else {
    // Here, TS knows `p` must be a `Dog` (because it does NOT have `meow`)
    p.bark();
  }
}
```

- **Before the `if`:** `p` is `Cat | Dog`.
- **Inside `if ("meow" in p")`:** TypeScript narrows `p` to `Cat`.
- **Inside the `else`:** TypeScript narrows `p` to `Dog`.

---

#### 2. How TypeScript Infers the Narrowing

When you write:

```ts
if ("someProp" in obj) {
  // ...
}
```

TypeScript performs these steps:

1. **Check that `obj` has a union type.**  
   If `obj`’s type is a union (e.g. `A | B | C`), TypeScript sees whether some union members definitely have a property named `"someProp"` and others definitely do not.

2. **Eliminate any union members that cannot satisfy the check.**  
   - Inside the `if` block, TS keeps only those union members whose definitions include `"someProp"`.  
   - Inside the corresponding `else` block, TS keeps only those members that do **not** include `"someProp"`.

3. **Resulting narrowed type** can then be used for further property access without errors.

##### More Formal Explanation

- **`X in Y` narrow-down (true-branch):** TS retains only union members of `Y` whose type definition definitely includes `"X"` (or includes it as possibly non-`undefined`).  
- **`!(X in Y)` (false-branch / `else`):** TS retains only those union members where `"X"` is absent (or defined as `never`) in their definitions.

---

## 3. Basic Example: Animals

```ts
interface Bird {
  fly: () => void;
  wingspan: number;
}

interface Fish {
  swim: () => void;
  fins: number;
}

type Animal = Bird | Fish;

function move(animal: Animal) {
  if ("fly" in animal) {
    // Narrowed to Bird
    animal.fly();
    console.log("Wingspan is", animal.wingspan);
  } else {
    // Narrowed to Fish
    animal.swim();
    console.log("Number of fins:", animal.fins);
  }
}
```

- **`"fly" in animal`** → keeps only `Animal` members that have `fly` (only `Bird`).
- **`else` branch** → keeps only `Animal` members that do **not** have `fly` (only `Fish`).

---

#### 4. Combining `in` with Other Guards

You can combine `"property" in obj` with other type guards (e.g. `typeof`, `instanceof`, or custom type predicates). For example:

```ts
type Shape =
  | { radius: number } 
  | { width: number; height: number }
  | { side: number };

// 1. Circle has `radius`
// 2. Rectangle has `width` & `height`
// 3. Square has `side`

function area(s: Shape): number {
  if ("radius" in s) {
    // s is { radius: number }
    return Math.PI * s.radius ** 2;
  } else if ("width" in s && "height" in s) {
    // s is { width: number; height: number }
    return s.width * s.height;
  } else {
    // s must be { side: number }
    return s.side * s.side;
  }
}
```

- First, TS checks for `"radius"` → narrows to circle case.
- Next, if no `"radius"`, TS checks `"width"` and `"height"` → narrows to rectangle.
- Finally, whatever remains must be the square.

---

#### 5. “`in`” Narrowing with Optional Properties

If an interface has an optional property (e.g. `foo?: string`), then checking `"foo" in obj` only tells you that `obj.foo` exists as a key, but it might still be `undefined`:

```ts
interface MaybeHasFoo {
  foo?: string;
  bar: number;
}

function test(x: MaybeHasFoo) {
  if ("foo" in x) {
    // Here TS only knows “x has a property named 'foo'”, 
    // but that property could be `undefined`.
    console.log(x.foo.toUpperCase()); // ❌ Error: Object is possibly 'undefined'.
  }
}
```

To fix this, combine `in` with a runtime `null`/`undefined` check:

```ts
function safeTest(x: MaybeHasFoo) {
  if ("foo" in x && x.foo !== undefined) {
    // Now TS sees x.foo as a `string`, because we checked it’s not undefined.
    console.log(x.foo.toUpperCase()); // ✅ OK
  }
}
```

---

#### 6. Limitations & Caveats

1. **Union members must have distinct property names**  
   If two union members share a property (even if their types differ), checking for that property will not distinguish them:

   ```ts
   interface A { common: number; foo: string; }
   interface B { common: number; bar: string; }
   type U = A | B;

   function f(u: U) {
     if ("common" in u) {
       // This does NOT narrow: both A and B have "common". 
       // TS still considers `u` to be `A | B` here.
       u.common; // OK
       // u.foo; // Error: Property 'foo' does not exist on type 'A | B'
     }
   }
   ```

2. **Optional properties can confuse narrowing**  
   As shown above, `"prop" in x` only checks for the existence of the key, not that it’s non-`undefined`. You often need an additional `!= null` check.

3. **Index signatures or `any`-typed objects**  
   If a type has an index signature (e.g. `{ [key: string]: any }`) or is typed as `any`, then `"someKey" in obj` may not narrow at all, because TS cannot be sure whether any property truly exists or not.

---

#### 7. Real-World Use Cases

- **Legacy APIs / untagged unions**  
  When you can’t modify upstream data to include a “discriminant” (`type: "cat" | "dog"`), but each variant has a unique property.

- **Deserializing JSON from external sources**  
  Suppose you fetch data from a server that sometimes returns `{ id, priority, dueDate }` (a ToDo) and sometimes `{ id, timestamp, level }` (a Log). You can check `"priority" in x` to decide how to process it.

- **Working with DOM or generic JSON objects**  
  When you have a generic `Record<string, unknown>` or `any`, using `"someField" in obj` ⟶ `typeof obj.someField === "string"` helps you narrow the type.

---

#### 8. Summary

- The `in` operator in TypeScript is a **type guard** that narrows unions by checking for property presence.
- Writing `if ("key" in obj)` restricts the type of `obj` inside that block to only those union members that define `"key"`.
- The **false-branch** (`else`) implicitly narrows to members that lack `"key"`.
- Be cautious when properties are:
  - **Optional** (you might still need to check for `undefined`),
  - **Shared** among multiple union members (no narrowing happens), or
  - Part of an **index signature** / `any`-typed object (narrowing may be too loose).

By using `in`-based narrowing thoughtfully, you can safely access the correct properties and methods on each member of a union type—without resorting to excessive type assertions.
```
