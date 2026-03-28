# 🌟 HBH-Nodes

> A **modern, dependency-light Node.js utility toolkit** designed for developers who love **clarity, control, and composability**. Every module is intentional, transparent, and production-ready.

---

## 📦 What is HBH-Nodes?

**HBH-Nodes** is not a framework. It is a **collection of carefully crafted utilities** that solve common Node.js problems:

* 👁️ Observing object changes (deep & reactive)
* ⚙️ Controlling async concurrency
* 📂 Safe JSON & package.json handling
* 🧰 CLI bootstrapping
* 🧼 Sanitization
* 🧠 Function safety & control
* 📘 Auto documentation generation

Each utility is **standalone**, meaning you only use what you need.

---

## 🚀 Installation

```bash
npm install hbh-nodes
```

```js
import * as HBH from 'hbh-nodes';
```

Or selective imports:

```js
import { chokidar, ConcurrencyQueue } from 'hbh-nodes';
```

---

## 🧠 Core Philosophy

✨ **Simple > Clever**
🧩 **Composable > Opinionated**
🔍 **Explicit > Magical**

HBH-Nodes is ideal for:

* CLI tools
* Internal dev tooling
* Backend utilities
* Scripts that grow into systems

---

## 🔤 AlphabetNumberConverter

`AlphabetNumberConverter` is a utility that converts numbers, strings, and JavaScript objects into compact encoded strings using a configurable alphabet. All conversions are reversible and support BigInt for large values.

---

### Installation

```bash
npm install hbh-nodes
```

---

### Import

```js
import { AlphabetNumberConverter } from "hbh-nodes";
```

(CommonJS)

```js
const { AlphabetNumberConverter } = require("hbh-nodes");
```

---

### Encode and Decode Numbers

```js
const conv = new AlphabetNumberConverter();

const code = conv.encode(12345);
console.log(code);                
// Example output: "dnh"

console.log(conv.decode(code));   
// Example output: 12345n
```

---

### Encode and Decode Strings

```js
const encoded = conv.encodeString("hello@example.com");
console.log(encoded); 
// Example output: "gyTfA...something"

const decoded = conv.decodeToString(encoded);
console.log(decoded); 
// Output: "hello@example.com"
```

---

### Encode and Decode Objects

```js
const user = { id: 1, name: "Alice" };

const code = conv.encodeObject(user);
console.log(code);
// Example output: "bHdKfL..."

const obj = conv.decodeObject(code);
console.log(obj);
// Output: { id: 1, name: "Alice" }
```

---

### Auto-Type Encode (number, string, object)

```js
console.log(conv.encode(42));
// Example: "gG"

console.log(conv.encode("hello"));
// Example: "dfKsL..."

console.log(conv.encode({ a: 1 }));
// Example: "kLf92..."
```

---

### Custom Alphabet

```js
const custom = new AlphabetNumberConverter({
  chars: "0123456789abcdef",
  base: 16
});

const code = custom.encode(255);
console.log(code);
// Example output: "ff"

console.log(custom.decode(code));
// Output: 255n
```

---

### Count Possible Codes

```js
console.log(conv.uniqueCodesCount(52, 5)); 
// Example output: 380204032n  (52^5)
```

---

### Quick Example

```js
const conv = new AlphabetNumberConverter();

console.log(conv.encode(2025));   
// Example: "kH"

console.log(conv.decode("kH"));   
// Output: 2025n

console.log(conv.encode("chatgpt"));
// Example: "fL2kA..."

console.log(conv.encode({ ok: true }));
// Example: "bKf92..."
```

---

## 🧮 applyCalc

`applyCalc` is a powerful utility for safely manipulating values, including numbers, strings, arrays, and objects. It supports advanced operations such as mathematical expressions, date adjustments, string transformations, and recursive object merging, all while providing safeguards against unsafe code execution.

### Import

```js
import { applyCalc } from "hbh-nodes";
```

All functions from this module are available under the `applyCalc` namespace.

---

### Functions

#### 1. `applyCalc.applyCalc(oldVal, newVal, context = {})`

Applies transformations to a value (`oldVal`) based on the input (`newVal`). Supports:

* **Numbers**: arithmetic, percentage changes, math expressions, increments/decrements.
* **Dates**: adding/subtracting days, months, years, hours, minutes, or seconds.
* **Strings**: modifiers like trim, upper/lowercase, capitalize, title case, reverse, append, prepend, slice, padding, repeat, and regex replacement.
* **Objects & Arrays**: recursive updates, deletion, merging, pushing/popping/shifting/unshifting array items, deduplication, and conditional fallback.

**Example:**

```js
const oldVal = 10;
const newVal = "++5"; // increment by 5
const result = applyCalc.applyCalc(oldVal, newVal);
console.log(result); // 15
```

```js
const date = new Date("2025-01-01");
const newDate = applyCalc.applyCalc(date, "++10d");
console.log(newDate); // 2025-01-11
```

```js
const str = "hello";
const modified = applyCalc.applyCalc(str, " | upper | reverse");
console.log(modified); // "OLLEH"
```

```js
const obj = { a: 1, b: 2 };
const updated = applyCalc.applyCalc(obj, { b: "__DELETE__", c: 3 });
console.log(updated); // { a: 1, c: 3 }
```

---

#### 2. `applyCalc.safeMathEval(expr, val, context = {})`

Safely evaluates mathematical expressions using only allowed operations. Prevents access to global objects, constructors, or dangerous code.

**Example:**

```js
const result = applyCalc.safeMathEval("val * 2 + 5", 10);
console.log(result); // 25
```

---

#### 3. `applyCalc.interpolateString(str, context)`

Replaces placeholders in a string with values from a context object. Placeholders use `{{key}}` syntax.

**Example:**

```js
const text = "Hello {{name}}!";
const result = applyCalc.interpolateString(text, { name: "Alice" });
console.log(result); // "Hello Alice!"
```

---

#### 4. `applyCalc.applyStringModifiers(val, modifiers, context)`

Applies a series of string transformations/modifiers to a value. Supports:

* `trim`, `upper`, `lower`, `capitalize`, `title`, `reverse`
* `append:<text>`, `prepend:<text>`
* `slice:start:end`, `padStart:length:char`, `padEnd:length:char`, `repeat:count`
* `replace:from:to`, `replaceRegex:/pattern/flags:replacement`
* Interpolation using `{{key}}`
* Special: `__now__` → current ISO timestamp

**Example:**

```js
const str = "  hello world  ";
const result = applyCalc.applyStringModifiers(str, ["trim", "title"]);
console.log(result); // "Hello World"
```

---

#### 5. `applyCalc.dateAdd(date, amount, unit)`

Adds or subtracts units of time from a JavaScript `Date` object. Supported units: `d` (days), `m` (months), `y` (years), `h` (hours), `min` (minutes), `s` (seconds).

**Example:**

```js
const newDate = applyCalc.dateAdd(new Date("2025-01-01"), 5, "d");
console.log(newDate); // 2025-01-06
```

---

### Usage Example

```js
import { applyCalc } from "hbh-nodes";

// Number increment
const num = applyCalc.applyCalc(100, "++10%");
console.log(num); // 110

// String transformation
const text = applyCalc.applyCalc("hello", "| upper | reverse");
console.log(text); // "OLLEH"

// Object update with deletion
const obj = { a: 1, b: 2 };
const updated = applyCalc.applyCalc(obj, { b: "__DELETE__", c: 3 });
console.log(updated); // { a: 1, c: 3 }

// Array merge and deduplicate
const arr = [{ id: 1 }, { id: 2 }];
const merged = applyCalc.applyCalc(arr, { __MERGE__: true, items: [{ id: 2 }, { id: 3 }], __UNIQUE__: true });
console.log(merged); // [{ id: 1 }, { id: 2 }, { id: 3 }]
```

----

## 👀 chokidar

The `chokidar` function provides a **reactive object watcher**. It wraps any JavaScript object, array, Map, or Set with a Proxy and emits events whenever the data changes. This allows you to listen to changes like additions, updates, deletions, or structural mutations.

---

### Import

```js
import { chokidar } from "hbh-nodes";
```

---

### Function

#### `chokidar(obj, path = '')`

Wraps an object and returns a **proxied version** that emits events on changes. Supports:

* **Plain objects**
* **Arrays**
* **Maps**
* **Sets**

**Parameters:**

* `obj` – The object, array, Map, or Set to watch.
* `path` – Optional string indicating the root path (useful for nested structures).

**Returns:**

A proxied version of `obj` that emits events for any changes.

---

#### Events

The returned proxied object supports `.on(event, callback)` using an internal `EventEmitter`.

###### Supported Events

| Event    | When It Fires                                                 | Arguments                    |
| -------- | ------------------------------------------------------------- | ---------------------------- |
| `add`    | A new property, array element, Map key, or Set value is added | `(path, oldValue, newValue)` |
| `update` | An existing property, array element, or Map key is updated    | `(path, oldValue, newValue)` |
| `delete` | A property, array element, Map key, or Set value is removed   | `(path, oldValue)`           |
| `clear`  | `Map.clear()` or `Set.clear()` is called                      | `(path, oldSnapshot)`        |

**Notes:**

* For nested objects, `path` automatically represents the full path (e.g., `user.address.city`).
* Arrays emit `update` events for structural methods (`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`) with the updated array state.
* Maps emit events for `set`, `delete`, and `clear`.
* Sets emit events for `add`, `delete`, and `clear`.

---

#### Example Usage

```js
import { chokidar } from "hbh-nodes";

const data = {
  user: { name: "Alice", age: 25 },
  items: [1, 2, 3],
  settings: new Map([['theme', 'dark']])
};

const watched = chokidar(data);

// Listen to updates
watched.user.on('update', (path, oldVal, newVal) => {
  console.log(`Updated ${path}:`, oldVal, '→', newVal);
});

watched.user.name = "Bob"; 
// Console: Updated user.name: Alice → Bob

// Listen to array changes
watched.items.on('update', (path, oldVal, newVal) => {
  console.log(`Array updated at ${path}:`, oldVal, '→', newVal);
});

watched.items.push(4); 
// Console: Array updated at items: [1,2,3] → [1,2,3,4]

// Listen to Map changes
watched.settings.on('add', (path, _, newVal) => {
  console.log(`Added to ${path}:`, newVal);
});

watched.settings.set('language', 'en'); 
// Console: Added to settings.get(language): en
```

---

#### Features

1. **Deep Observation:** Nested objects, arrays, Maps, and Sets are automatically wrapped with proxies.
2. **Full Event Coverage:** Supports add, update, delete, and clear operations for all types.
3. **Path Tracking:** Full paths are emitted for changes, even in deeply nested structures.
4. **Array Method Support:** Emits events for mutating methods (`push`, `pop`, etc.).
5. **Map/Set Support:** Monitors additions, deletions, and clearing operations.

---

#### Notes

* This implementation uses `Proxy` objects; thus, it **requires modern JavaScript environments**.
* Event listeners are attached via the `.on()` method.
* Useful for reactive data structures, state management, and change tracking in complex objects.

---

## 🚦 ConcurrencyQueue

The `ConcurrencyQueue` class provides a **simple concurrency limiter** for asynchronous functions. It ensures that only a specified number of async operations run simultaneously, queuing the rest.

---

### Import

```js
import { ConcurrencyQueue } from "hbh-nodes";
```

---

### Class: `ConcurrencyQueue`

#### `new ConcurrencyQueue(limit = 5)`

Creates a new concurrency queue.

**Parameters:**

* `limit` – Maximum number of concurrent async operations. Default is `5`.

**Properties:**

* `limit` – Maximum concurrency limit.
* `activeCount` – Current number of running operations.
* `queue` – Internal queue of waiting promises.

---

#### Method: `run(fn)`

Executes an asynchronous function within the concurrency queue.

**Parameters:**

* `fn` – An **async function** (or function returning a promise) to execute.

**Returns:**

A promise resolving to the result of `fn`.

**Behavior:**

1. If the number of currently running operations is below `limit`, `fn` executes immediately.
2. If the limit is reached, the function waits in a queue until a slot is available.
3. After `fn` finishes, the next function in the queue starts automatically.

---

#### Example Usage

```js
import { ConcurrencyQueue } from "hbh-nodes";

const queue = new ConcurrencyQueue(2);

async function task(id, delay) {
  console.log(`Task ${id} started`);
  await new Promise(r => setTimeout(r, delay));
  console.log(`Task ${id} finished`);
  return id;
}

// Run multiple tasks concurrently but limited to 2 at a time
const results = await Promise.all([
  queue.run(() => task(1, 1000)),
  queue.run(() => task(2, 500)),
  queue.run(() => task(3, 700)),
  queue.run(() => task(4, 300))
]);

console.log(results); // [1, 2, 3, 4]
```

---

#### Features

1. **Concurrency Limit:** Only `limit` async operations run simultaneously.
2. **Queueing:** Additional calls wait in a FIFO queue.
3. **Automatic Execution:** As soon as one task finishes, the next in queue starts automatically.
4. **Simple API:** `run(fn)` is all that’s needed to schedule tasks.

---

#### Notes

* Useful for limiting network requests, API calls, file operations, or any asynchronous workloads that must be throttled.
* Supports any async function, including ones returning promises.
* If no limit is specified, defaults to `5`.

---

## 🔄 `convertObject`

The `convertObject` function provides a **flexible way to transform, filter, and traverse objects**. It supports multiple output formats, deep flattening, filtering, mapping, and sorting.

---

### Import

```js
import { convertObject } from "hbh-nodes";
```

---

### Function: `convertObject(obj, options = {})`

Converts or extracts data from an object according to specified rules.

**Parameters:**

* `obj` – The object to transform.
* `options` – Optional settings:

| Option         | Type                           | Default      | Description                                    |          |                          |
| -------------- | ------------------------------ | ------------ | ---------------------------------------------- | -------- | ------------------------ |
| `outputFormat` | `'flat'                        | 'tree'       | 'nestedKeys'`                                  | `'flat'` | Output structure format. |
| `props`        | `string \| string[] \| RegExp` | `null`       | Filter keys to include.                        |          |                          |
| `filterFn`     | `(val, key, path) => boolean`  | `null`       | Custom filter function.                        |          |                          |
| `mapFn`        | `(val, key, path) => any`      | `(v) => v`   | Transform values.                              |          |                          |
| `includeKeys`  | `boolean`                      | `false`      | If `true`, flat output returns `[key, value]`. |          |                          |
| `includePaths` | `boolean`                      | `false`      | Use full path as key in flat output.           |          |                          |
| `flatten`      | `boolean`                      | `true`       | Traverse nested objects.                       |          |                          |
| `defaultValue` | `any`                          | `undefined`  | Fallback value for missing entries.            |          |                          |
| `strict`       | `boolean`                      | `false`      | Throw error if key/value not found.            |          |                          |
| `maxDepth`     | `number`                       | `Infinity`   | Limit traversal depth.                         |          |                          |
| `sort`         | `boolean`                      | `false`      | Sort keys alphabetically.                      |          |                          |
| `prefix`       | `string`                       | `''`         | Start traversal at nested path.                |          |                          |
| `keyKey`       | `string`                       | `'key'`      | Key name in tree nodes.                        |          |                          |
| `valueKey`     | `string`                       | `'value'`    | Value name in tree nodes.                      |          |                          |
| `childrenKey`  | `string`                       | `'children'` | Child array key for tree output.               |          |                          |

---

### Output Formats

1. **`flat`** – Returns a flat array of values (or `[key, value]` pairs).
2. **`tree`** – Returns a nested tree of nodes: `{ key, value, children }`.
3. **`nestedKeys`** – Returns nested keys only.
4. **`simple`** – Returns direct keys or mapped values of the object.

Additional helper walkers are included for specialized tasks:

* `keysOnly` – Extract only keys.
* `valuesOnly` – Extract only values.
* `pathsOnly` – Extract full paths.
* `groupByType` – Group keys by value type.
* `countValues` – Count occurrences of values/arrays.
* `filterAndMap` – Apply filter and map recursively.

---

### Examples

#### Flat output with mapping

```js
import { convertObject } from "hbh-nodes";

const data = {
  user: { name: "Alice", age: 25 },
  settings: { theme: "dark" }
};

const result = convertObject(data, {
  outputFormat: 'flat',
  mapFn: (v, k) => String(v).toUpperCase()
});

console.log(result);
// ["ALICE", "25", "DARK"]
```

#### Tree output with filtering

```js
const tree = convertObject(data, {
  outputFormat: 'tree',
  filterFn: (val, key) => typeof val === 'string'
});

console.log(tree);
// [
//   { key: 'user', children: [{ key: 'name', value: 'Alice' }] },
//   { key: 'settings', children: [{ key: 'theme', value: 'dark' }] }
// ]
```

#### Nested keys output

```js
const keys = convertObject(data, { outputFormat: 'nestedKeys' });
console.log(keys);
// [["user", ["name", "age"]], ["settings", ["theme"]]]
```

---

### Features

* Supports **deep traversal** and **flattening**.
* **Custom filters** via `props` or `filterFn`.
* **Value transformations** using `mapFn`.
* **Flexible output formats** (`flat`, `tree`, `nestedKeys`).
* Optional **key/value inclusion**, sorting, and strict mode.
* Traversal can start from a **nested path** using `prefix`.

---

## 📄 generateDocs

Generates documentation for an API map. It analyzes each function in the provided map and extracts a description. This can be used to automatically build your docs site or README.

### **Parameters**

| Parameter | Type     | Default | Description                                                                                                                                                                     |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiMap`  | `object` | —       | An object where keys are function names and values are the corresponding function references. Each function may optionally include a `description` property or a JSDoc comment. |

---

### **Returns**

`string` – A formatted string listing each function with its description.

---

### **Behavior**

1. **Check `description` property:**
   If a function has a `description` property, that is used first.

2. **Check JSDoc-style comment:**
   If no `description` property exists, it tries to extract a JSDoc comment from the function string.

3. **Fallback:**
   If neither exists, it returns `"No description available."` for that function.

---

### **Example Usage**

```js
function add(a, b) {
  /** Adds two numbers together and returns the result */
  return a + b;
}

function multiply(a, b) {
  return a * b;
}
multiply.description = "Multiplies two numbers.";

const apiMap = { add, multiply };

console.log(generateDocs(apiMap));
```

**Output:**

```
- `add`: Adds two numbers together and returns the result
- `multiply`: Multiplies two numbers.
```

---

### **Edge Cases**

1. **Function without description or JSDoc**:

```js
function noop() {}
const apiMap = { noop };
console.log(generateDocs(apiMap));
```

**Output:**

```
- `noop`: No description available.
```

2. **Function with multiline JSDoc**:

```js
function complex(a, b) {
  /**
   * Performs a complex operation.
   * Returns a transformed value.
   */
  return a + b;
}
const apiMap = { complex };
console.log(generateDocs(apiMap));
```

**Output:**

```
- `complex`: Performs a complex operation. Returns a transformed value.
```

3. **Function with leading `*` in JSDoc**:

```js
function example() {
  /**
   * Example function
   * with multiple lines
   */
  return true;
}
const apiMap = { example };
console.log(generateDocs(apiMap));
```

**Output:**

```
- `example`: Example function with multiple lines
```

4. **Non-function values in map** – will skip properly because `.toString()` works on anything, but best practice is to provide only functions.

---

### **Notes**

* The function works best when the `apiMap` only contains **functions**. Non-function values may produce unexpected results.
* Leading/trailing whitespace in JSDoc is automatically trimmed.
* Multi-line JSDoc comments are flattened into a single line for readability.

---

## 📣 `EventEmitter`

A lightweight event emitter class that supports standard event handling patterns including `on`, `once`, `off`, and `emit`. Ideal for creating reactive systems or handling custom events in JavaScript.

### Import

```js
import { EventEmitter } from "hbh-nodes";
```

---

### Methods

#### `on(eventName, listener)`

Registers a listener for a given event. Multiple listeners can be registered for the same event.

**Parameters:**

* `eventName` (string) – Name of the event to listen to.
* `listener` (function) – Callback function to execute when the event is emitted.

**Returns:**
The `EventEmitter` instance (supports chaining).

**Example:**

```js
const emitter = new EventEmitter();

emitter.on("data", (msg) => {
  console.log("Received:", msg);
});

emitter.emit("data", "Hello World"); // Logs: Received: Hello World
```

**Edge Cases:**

* Multiple listeners can be attached to the same event; all will be called in order of registration.
* Chaining allows multiple `on` calls in sequence: `emitter.on("a", fn1).on("b", fn2)`.

---

#### `once(eventName, listener)`

Registers a one-time listener that will be automatically removed after the first invocation.

**Parameters:**

* `eventName` (string) – Event name.
* `listener` (function) – Callback function.

**Returns:**
The `EventEmitter` instance (supports chaining).

**Example:**

```js
emitter.once("connect", () => console.log("Connected!"));

emitter.emit("connect"); // Logs: Connected!
emitter.emit("connect"); // No output
```

**Edge Cases:**

* The listener is removed immediately after execution.
* Safe to attach multiple `once` listeners to the same event.

---

#### `emit(eventName, ...args)`

Triggers an event, calling all registered listeners with the provided arguments.

**Parameters:**

* `eventName` (string) – Event to trigger.
* `...args` – Any number of arguments to pass to listeners.

**Returns:**
The `EventEmitter` instance (supports chaining).

**Example:**

```js
emitter.on("update", (oldVal, newVal) => {
  console.log(`Changed from ${oldVal} to ${newVal}`);
});

emitter.emit("update", 1, 2); // Logs: Changed from 1 to 2
```

**Edge Cases:**

* If no listeners exist for the event, `emit` does nothing.
* Errors in one listener do not prevent other listeners from executing; they are logged to console.

---

#### `off(eventName, listener)`

Removes a specific listener for an event. If no listener is provided, all listeners for that event are removed.

**Parameters:**

* `eventName` (string) – Event name.
* `listener` (function, optional) – Specific listener to remove.

**Returns:**
The `EventEmitter` instance (supports chaining).

**Example:**

```js
const fn = (msg) => console.log(msg);
emitter.on("data", fn);
emitter.off("data", fn); // Removes fn
```

**Edge Cases:**

* Calling `off` with no listener removes all listeners for the event.
* Safe to call `off` on an event that has no listeners; does nothing.

---

#### `removeAll(eventName)`

Utility method to remove all listeners for a specific event.

**Parameters:**

* `eventName` (string) – Event name.

**Returns:**
The `EventEmitter` instance (supports chaining).

**Example:**

```js
emitter.on("x", () => {});
emitter.removeAll("x"); // All listeners for "x" removed
```

---

#### `listeners(eventName)`

Returns an array of all registered listeners for an event.

**Parameters:**

* `eventName` (string) – Event name.

**Returns:**
Array of functions.

**Example:**

```js
emitter.on("msg", () => {});
console.log(emitter.listeners("msg").length); // 1
```

**Edge Cases:**

* Returns an empty array if no listeners are registered.

---

## 🎁 FunctionWrapper

`FunctionWrapper` is a highly versatile utility class for JavaScript/TypeScript functions that allows you to enhance, monitor, transform, and control functions with a rich set of composable decorators. It extends a `Logger` base class to provide optional logging capabilities.

With `FunctionWrapper`, you can chain multiple function transformations, handle retries, measure performance, debounce or throttle calls, enforce validations, create undoable operations, and much more—all in a highly modular and chainable manner.

---

### Features

`FunctionWrapper` provides over 80+ static methods to extend and wrap functions. Some of the core capabilities include:

* **Logging and Monitoring**

  * `log(fn)`: Logs function calls and results.
  * `time(fn)`: Measures execution duration.
  * `profile(fn)`: Logs execution stats with timestamp.
  * `stats(fn)`: Tracks call count and average execution time.

* **Control Flow Enhancements**

  * `retry(fn, retries, delayMs)`: Automatically retries a function on failure.
  * `once(fn)`, `oncePerArgs(fn)`: Execute only once globally or per argument set.
  * `after(fn, n)`, `before(fn, n)`: Control execution after or before a number of calls.
  * `limit(fn, max)`: Limits total number of calls.
  * `lock(fn)`: Prevents concurrent execution.

* **Asynchronous Handling**

  * `debounce(fn, wait)`: Delays execution until idle.
  * `throttle(fn, wait)`: Limits execution frequency.
  * `delayFn(fn, delay)`, `delayResult(fn, ms)`, `delayEach(fn, ms)`: Flexible delayed execution.
  * `cancelable(fn)`: Creates cancelable promises.
  * `queue(fn)`: Serializes asynchronous calls.

* **Data Manipulation**

  * `memo(fn)`: Caches results for identical arguments.
  * `transformOutput(fn, transformer)`: Post-process function results.
  * `mask(fn, masker)`: Preprocess arguments before calling the function.
  * `randomizeArgs(fn)`: Shuffles arguments randomly.
  * `randomBehavior(fn, behaviors)`: Introduces probabilistic behaviors.

* **Validation and Safety**

  * `validate(fn, validator)`: Validates arguments.
  * `ensure(fn, validator)`: Validates output.
  * `catch(fn, onError, fallback)`: Graceful error handling.
  * `sandbox(fn, timeout)`: Safe execution with error handling and time limit.
  * `safeJson(fn)`: Safe JSON parsing and handling.

* **Functional Utilities**

  * `chain(fn)`: Chain multiple transformations in a fluent interface.
  * `pipe(...fns)`: Compose functions in a pipeline.
  * `tap(fn, tapFn)`: Tap into function results without affecting output.
  * `hook(fn, { before, after })`: Run pre- and post-execution hooks.
  * `feedback(fn, logger)`: Collect input/output logs.

* **Simulation and Testing**

  * `simulate(fn, options)`: Simulate failures, delays, and data corruption.
  * `test(fn, testCases)`: Run predefined tests on a function.
  * `predict(fn, modelFn)`: Attach predictive models to results.

* **Batching and History**

  * `batch(fn, chunkSize, cb)`: Execute functions in batches.
  * `history(fn)`: Track inputs and outputs with `getHistory` and `clearHistory`.
  * `watch(fn)`: Subscribe to function call results.
  * `changelog(fn)`: Track changes in object outputs.

* **Advanced Features**

  * `undoable(fn, inverseFn)`: Support undo operations.
  * `locale(fn, formatter)`: Apply locale-based input/output formatting.
  * `smartIdle(fn, options)`: Execute during idle periods with cancellation.
  * `eventual(fn, checkFn, interval)`: Poll until a condition is met.
  * `timeLimit(fn, timeout)`: Force a maximum execution duration.

---

### Installation

```bash
npm install hbh-nodes
```

Or using yarn:

```bash
yarn add hbh-nodes
```

---

### Import

```js
import { FunctionWrapper as FW } from "hbh-nodes";
const { FunctionWrapper } = FW;

```

---

### Usage

#### 1. Basic Function Wrapping

```javascript
const add = (a, b) => a + b;
const loggedAdd = FunctionWrapper.log(add);

console.log(loggedAdd(2, 3));
// Logs: Calling add [2, 3]
// Logs: Result from add 5
```

#### 2. Chaining Transformations

```javascript
const multiply = (a, b) => a * b;

const enhancedFn = FunctionWrapper.chain(multiply)
  .log()
  .time()
  .memo()
  .value();

console.log(enhancedFn(5, 6));
```

#### 3. Debounce / Throttle

```javascript
const save = (data) => console.log('Saved:', data);
const debouncedSave = FunctionWrapper.debounce(save, 500);
const throttledSave = FunctionWrapper.throttle(save, 1000);
```

#### 4. Retry with Delay

```javascript
const unstable = () => {
  if (Math.random() < 0.7) throw new Error('Fail');
  return 'Success';
};

const reliable = FunctionWrapper.retry(unstable, 5, 100);
reliable().then(console.log).catch(console.error);
```

#### 5. Undoable Functions

```javascript
let counter = 0;
const increment = () => ++counter;
const decrement = () => --counter;

const undoableIncrement = FunctionWrapper.undoable(increment, decrement);
undoableIncrement(); // counter = 1
undoableIncrement.undo(); // counter = 0
```

#### 6. Monitoring and Stats

```javascript
const slowFn = (x) => new Promise(res => setTimeout(() => res(x * 2), 100));
const profiled = FunctionWrapper.stats(slowFn);

profiled(2).then(() => {
  console.log(profiled.stats); // { calls: 1, avgTime: '100.00ms' }
});
```

---

### API Reference

Each static method of `FunctionWrapper` can be used independently to wrap any function. Refer to the method list in the **Features** section for full capabilities.

**Chaining Example**

```javascript
const fn = (x) => x * 2;
const chained = FunctionWrapper.chain(fn)
  .debounce(200)
  .log()
  .memo()
  .time()
  .value();

chained(5);
```


### FunctionWrapper API Reference

`FunctionWrapper` is an advanced utility class that provides **80+ higher-order function decorators and wrappers** for logging, timing, retrying, caching, debouncing, throttling, validating, transforming, and managing functions in versatile ways.

| Method                                                   | Parameters                                            | Description                                                          | Usage Example                                                                                                                                                            | Output                                                   |
| -------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `log(fn)`                                                | `fn: Function`                                        | Logs function call and result                                        | `const add = (a,b)=>a+b; const loggedAdd = FunctionWrapper.log(add); loggedAdd(2,3);`                                                                                    | Logs: `Calling add [2,3]` <br> Logs: `Result from add 5` |
| `time(fn)`                                               | `fn: Function`                                        | Measures execution time (async supported)                            | `const slow = () => new Promise(res=>setTimeout(()=>res(42),100)); const timed = FunctionWrapper.time(slow); timed();`                                                   | Logs: `slow took 100.00 ms`                              |
| `retry(fn, retries=3, delayMs=0)`                        | `fn: Function, retries?: number, delayMs?: number`    | Retries a failing function up to `retries` times with optional delay | `const unstable = ()=>{ if(Math.random()<0.7) throw Error('Fail'); return 'Ok'; }; const reliable = FunctionWrapper.retry(unstable,5,100); reliable().then(console.log)` | Either `'Ok'` or error if all retries fail               |
| `memo(fn)`                                               | `fn: Function`                                        | Caches function results based on arguments                           | `const square = x=>x*x; const cached = FunctionWrapper.memo(square); cached(2); cached(2);`                                                                              | Only first call computes, second returns cached value    |
| `debounce(fn, wait=300)`                                 | `fn: Function, wait?: number`                         | Delays execution until `wait` ms of inactivity                       | `const save = x=>console.log('Saved',x); const dSave = FunctionWrapper.debounce(save,500); dSave(1); dSave(2);`                                                          | Only `'Saved 2'` after 500ms                             |
| `throttle(fn, wait=300)`                                 | `fn: Function, wait?: number`                         | Ensures function executes at most once per `wait` ms                 | `const log = x=>console.log(x); const tLog = FunctionWrapper.throttle(log,500); tLog(1); tLog(2);`                                                                       | Executes 1 immediately, 2 after 500ms                    |
| `validate(fn, validator)`                                | `fn: Function, validator: Function`                   | Validates arguments before calling                                   | `const sum = (a,b)=>a+b; const validated = FunctionWrapper.validate(sum,args=>{if(args.some(x=>typeof x!=='number'))throw Error('Invalid');}); validated(1,2);`          | Returns 3                                                |
| `catch(fn, onError, fallback=null)`                      | `fn: Function, onError?: Function, fallback?: any`    | Catches errors, calls `onError`, optionally returns `fallback`       | `const fail = ()=>{throw Error('Oops')}; const safe = FunctionWrapper.catch(fail,e=>console.log(e.message),'F'); safe();`                                                | Logs `'Oops'` and returns `'F'`                          |
| `once(fn)`                                               | `fn: Function`                                        | Executes function only once globally                                 | `const inc=()=>1; const onceInc=FunctionWrapper.once(inc); onceInc(); onceInc();`                                                                                        | Returns 1 both calls, only first actually executes       |
| `after(fn, n=1)`                                         | `fn: Function, n?: number`                            | Executes function after `n` calls                                    | `const log=()=>console.log('Hello'); const after2=FunctionWrapper.after(log,2); after2(); after2();`                                                                     | Logs `'Hello'` on second call                            |
| `before(fn, n=1)`                                        | `fn: Function, n?: number`                            | Executes function at most `n` times                                  | `const log=()=>console.log('Hi'); const b4=FunctionWrapper.before(log,2); b4(); b4(); b4();`                                                                             | Logs `'Hi'` twice, third call returns null               |
| `delayFn(fn, delay=1000)`                                | `fn: Function, delay?: number`                        | Executes function after a delay                                      | `const say=()=>console.log('Hi'); const delayed=FunctionWrapper.delayFn(say,500); delayed();`                                                                            | Logs `'Hi'` after 500ms                                  |
| `timeLimit(fn, timeout=1000)`                            | `fn: Function, timeout?: number`                      | Rejects if execution exceeds timeout                                 | `const slow=()=>new Promise(res=>setTimeout(()=>res(1),1500)); FunctionWrapper.timeLimit(slow,1000)`                                                                     | Throws `'Timeout exceeded'`                              |
| `tap(fn, tapFn)`                                         | `fn: Function, tapFn: Function`                       | Executes `tapFn` with function result without affecting it           | `const double=x=>x*2; const tapped=FunctionWrapper.tap(double,r=>console.log('Tap',r)); tapped(3);`                                                                      | Logs `'Tap 6'`, returns 6                                |
| `restrict(fn, isAllowed)`                                | `fn: Function, isAllowed: Function`                   | Throws if `isAllowed` returns false                                  | `const secret=()=>42; const restricted=FunctionWrapper.restrict(secret,()=>false); restricted();`                                                                        | Throws `'Access denied'`                                 |
| `lock(fn)`                                               | `fn: Function`                                        | Prevents concurrent execution                                        | `const sleep=x=>new Promise(res=>setTimeout(res,x)); const locked=FunctionWrapper.lock(sleep); locked(100); locked(100);`                                                | Second call throws `'Already running'`                   |
| `history(fn)`                                            | `fn: Function`                                        | Tracks inputs and outputs                                            | `const add=(a,b)=>a+b; const h=FunctionWrapper.history(add); h(1,2); h.getHistory();`                                                                                    | Returns `[ { args:[1,2], result:3 } ]`                   |
| `watch(fn)`                                              | `fn: Function`                                        | Allows subscribing to results                                        | `const add=(a,b)=>a+b; const w=FunctionWrapper.watch(add); w.subscribe((args,res)=>console.log('Watched',res)); w(2,3);`                                                 | Logs `'Watched 5'`                                       |
| `mask(fn, masker)`                                       | `fn: Function, masker: Function`                      | Transforms arguments before calling                                  | `const sum=(a,b)=>a+b; const masked=FunctionWrapper.mask(sum,args=>args.map(x=>x*2)); masked(1,2);`                                                                      | Returns 6                                                |
| `cancelable(fn)`                                         | `fn: Function`                                        | Returns a cancelable promise                                         | `const p=()=>new Promise(res=>setTimeout(()=>res(1),500)); const c=FunctionWrapper.cancelable(p); const promise=c(); promise.cancel();`                                  | Rejects with `'Cancelled'`                               |
| `limit(fn, max=5)`                                       | `fn: Function, max?: number`                          | Limits number of executions                                          | `const log=x=>x; const limited=FunctionWrapper.limit(log,2); limited(1); limited(2); limited(3);`                                                                        | Third call throws `'Limit exceeded'`                     |
| `rateTracker(fn, windowMs=1000)`                         | `fn: Function, windowMs?: number`                     | Tracks number of calls in sliding window                             | `const add=(a,b)=>a+b; const tracked=FunctionWrapper.rateTracker(add); tracked(1,2);`                                                                                    | Result object has `_rate` property                       |
| `replay(fn)`                                             | `fn: Function`                                        | Returns cached result for identical arguments                        | `const f=x=>x*2; const r=FunctionWrapper.replay(f); r(2); r(2);`                                                                                                         | Returns 4 both times, second call uses cached result     |
| `safeJson(fn)`                                           | `fn: Function`                                        | Wraps function to catch JSON errors                                  | `const parse=JSON.parse; const safeParse=FunctionWrapper.safeJson(parse); safeParse('invalid');`                                                                         | Returns `{ error: 'Invalid JSON', details: ... }`        |
| `profile(fn)`                                            | `fn: Function`                                        | Logs execution stats in table                                        | `const slow=x=>new Promise(res=>setTimeout(()=>res(x),100)); FunctionWrapper.profile(slow)(5);`                                                                          | Logs table with function name, duration, timestamp       |
| `unit(fn, unit='')`                                      | `fn: Function, unit?: string`                         | Returns `{ value, unit, timestamp }`                                 | `const add=(a,b)=>a+b; const u=FunctionWrapper.unit(add,'ms'); u(1,2);`                                                                                                  | `{ value:3, unit:'ms', timestamp: 12345678 }`            |
| `changelog(fn)`                                          | `fn: Function`                                        | Logs changes in object output                                        | `const obj=()=>({x:Math.random()}); const c=FunctionWrapper.changelog(obj); c(); c();`                                                                                   | Logs only changes                                        |
| `undoable(fn, inverseFn)`                                | `fn: Function, inverseFn: Function`                   | Supports undo operation                                              | `let x=0; const inc=()=>x++; const dec=()=>x--; const u=FunctionWrapper.undoable(inc,dec); u(); u.undo();`                                                               | x returns to previous state                              |
| `feedback(fn, logger)`                                   | `fn: Function, logger?: Function`                     | Logs input/output with custom logger                                 | `const add=(a,b)=>a+b; const f=FunctionWrapper.feedback(add); f(1,2);`                                                                                                   | Logs `{ input:[1,2], output:3 }`                         |
| `locale(fn, formatter)`                                  | `fn: Function, formatter?: {input?: fn, output?: fn}` | Formats input/output                                                 | `const add=(a,b)=>a+b; const loc=FunctionWrapper.locale(add,{output:r=>'Result:'+r}); loc(1,2);`                                                                         | Returns `'Result:3'`                                     |
| `queue(fn)`                                              | `fn: Function`                                        | Executes function sequentially                                       | `const sleep=x=>new Promise(res=>setTimeout(()=>res(x),100)); const q=FunctionWrapper.queue(sleep); q(1); q(2);`                                                         | Second call waits until first finishes                   |
| `repeat(fn, n=1)`                                        | `fn: Function, n?: number`                            | Calls function `n` times, returns array of results                   | `const f=x=>x*2; FunctionWrapper.repeat(f,3)(2);`                                                                                                                        | `[4,4,4]`                                                |
| `test(fn, testCases=[])`                                 | `fn: Function, testCases:Array<[input,expected]>`     | Runs test cases                                                      | `const add=(a,b)=>a+b; FunctionWrapper.test(add,[[ [1,2],3 ]])();`                                                                                                       | `[ { input:[1,2], expected:3, result:3, passed:true } ]` |
| `delayResult(fn, ms=1000)`                               | `fn: Function, ms?: number`                           | Returns result after delay                                           | `const f=x=>x+1; FunctionWrapper.delayResult(f,500)(2);`                                                                                                                 | Returns `3` after 500ms                                  |
| `ensure(fn, validator)`                                  | `fn: Function, validator: Function`                   | Throws if output fails validation                                    | `const f=x=>x*2; const e=FunctionWrapper.ensure(f,r=>r<5); e(2); e(3);`                                                                                                  | Throws on second call                                    |
| `randomizeArgs(fn)`                                      | `fn: Function`                                        | Shuffles arguments randomly before calling                           | `const f=(a,b)=>[a,b]; FunctionWrapper.randomizeArgs(f)(1,2);`                                                                                                           | Returns `[2,1]` or `[1,2]`                               |
| `randomBehavior(fn, behaviors=[])`                       | `fn: Function, behaviors: Function[]`                 | Executes one of the random behaviors                                 | `const f=x=>x; const b=[(fn,args)=>fn(...args)*2]; FunctionWrapper.randomBehavior(f,b)(2);`                                                                              | Returns `4`                                              |
| `transformOutput(fn, transformer)`                       | `fn: Function, transformer: Function`                 | Transforms function output                                           | `const f=x=>x+1; FunctionWrapper.transformOutput(f,r=>r*2)(2);`                                                                                                          | Returns `6`                                              |
| `evolve(fn, evolver)`                                    | `fn: Function, evolver: Function`                     | Mutates or extends output                                            | `const f=()=>({a:1}); FunctionWrapper.evolve(f,{b:2})();`                                                                                                                | `{ a:1, b:2 }`                                           |
| `simulate(fn, {failRate=0.1, corrupt=false, delay=300})` | `fn: Function, options`                               | Simulates failures, delays, and corruption                           | `const f=x=>x; FunctionWrapper.simulate(f,{failRate:1})(1)`                                                                                                              | Throws `'Simulated Failure'`                             |
| `chainable(fn)`                                          | `fn: Function`                                        | Allows chaining calls and collecting results                         | `const f=x=>x*2; const c=FunctionWrapper.chainable(f); c(1)(2).value();`                                                                                                 | Returns `[2,4]`                                          |
| `predict(fn, modelFn)`                                   | `fn: Function, modelFn: Function`                     | Adds prediction based on function output                             | `const f=x=>x*2; const p=FunctionWrapper.predict(f,r=>r+1); p(2);`                                                                                                       | `{ result:4, prediction:5 }`                             |
| `delayIf(fn, condition, delayMs=1000)`                   | `fn: Function, condition: Function, delayMs?: number` | Delays execution if condition is true                                | `const f=x=>x; FunctionWrapper.delayIf(f,x=>x>0,500)(1);`                                                                                                                | Returns `1` after 500ms                                  |
| `eventual(fn, checkFn, interval=100)`                    | `fn: Function, checkFn: Function, interval?: number`  | Polls until checkFn returns true                                     | `const f=x=>x; FunctionWrapper.eventual(f,()=>true)();`                                                                                                                  | Resolves immediately                                     |
| `pipe(...fns)`                                           | `fns: Function[]`                                     | Composes multiple functions left to right                            | `FunctionWrapper.pipe(x=>x+1,x=>x*2)(2);`                                                                                                                                | Returns `(2+1)*2 = 6`                                    |
| `filterArgs(fn, filterFn)`                               | `fn: Function, filterFn: Function`                    | Calls fn only if filterFn returns true                               | `const f=x=>x; FunctionWrapper.filterArgs(f,x=>x>0)(-1);`                                                                                                                | Returns `null`                                           |
| `warnOnArgs(fn, warningFn)`                              | `fn: Function, warningFn: Function`                   | Warns if warningFn returns true                                      | `const f=x=>x; FunctionWrapper.warnOnArgs(f,x=>x<0)(-1);`                                                                                                                | Logs warning, returns `-1`                               |
| `oncePerArgs(fn)`                                        | `fn: Function`                                        | Executes once per argument combination                               | `const f=x=>x; FunctionWrapper.oncePerArgs(f)(1); FunctionWrapper.oncePerArgs(f)(1);`                                                                                    | Returns `1`, then `null`                                 |
| `alertOn(fn, condition)`                                 | `fn: Function, condition: Function`                   | Alerts if condition on result is true                                | `const f=x=>x; FunctionWrapper.alertOn(f,r=>r>0)(1);`                                                                                                                    | Logs alert, returns `1`                                  |
| `hook(fn, { before, after })`                            | `fn: Function, before?: Function, after?: Function`   | Adds pre- and post-execution hooks                                   | `const f=x=>x*2; FunctionWrapper.hook(f,{before:x=>console.log('Before',x),after:(r)=>console.log('After',r)})(2);`                                                      | Logs `'Before 2'`, `'After 4'`, returns 4                |
| `delayEach(fn, delayMs=300)`                             | `fn: Function, delayMs?: number`                      | Calls function for each argument sequentially with delay             | `const f=x=>x*2; FunctionWrapper.delayEach(f,100)(1,2,3);`                                                                                                               | Returns `[2,4,6]` over 100ms intervals                   |
| `sandbox(fn, timeout=1000)`                              | `fn: Function, timeout?: number`                      | Executes safely with error handling                                  | `const f=()=>{throw Error('Fail')}; FunctionWrapper.sandbox(f)();`                                                                                                       | Logs `'Sandbox Error: Fail'`, returns undefined          |
| `afterIdle(fn, timeout=0)`                               | `fn: Function, timeout?: number`                      | Executes when browser idle                                           | `FunctionWrapper.afterIdle(()=>console.log('Idle'),500)`                                                                                                                 | Logs `'Idle'` after idle period                          |
| `smartIdle(fn, {timeout=1000})`                          | `fn: Function, options`                               | Idle execution with cancellation                                     | `const f=x=>x; const s=FunctionWrapper.smartIdle(f); s(1); s.cancel();`                                                                                                  | Cancels execution if idle hasn't started                 |

---

### **FunctionWrapper Cheat Sheet**

#### **1. Logging & Profiling**

| Method                      | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `log(fn)`                   | Logs function calls and results               |
| `profile(fn)`               | Measures execution time, logs stats           |
| `changelog(fn)`             | Logs differences between successive outputs   |
| `feedback(fn, logger)`      | Logs input/output with optional custom logger |
| `warnOnArgs(fn, warningFn)` | Warns if arguments meet suspicious condition  |
| `alertOn(fn, condition)`    | Alerts if output meets condition              |

---

#### **2. Timing & Execution Control**

| Method                            | Purpose                                                 |
| --------------------------------- | ------------------------------------------------------- |
| `time(fn)`                        | Measures execution time (async supported)               |
| `timeLimit(fn, timeout)`          | Throws if execution exceeds timeout                     |
| `delayFn(fn, delay)`              | Delays execution by specified ms                        |
| `delayResult(fn, ms)`             | Returns result after delay                              |
| `delayEach(fn, delayMs)`          | Sequentially calls function on multiple args with delay |
| `delayIf(fn, condition, delayMs)` | Delays execution if condition is true                   |
| `afterIdle(fn, timeout)`          | Executes when browser is idle                           |
| `smartIdle(fn, {timeout})`        | Idle execution with cancellation support                |

---

#### **3. Async & Concurrency Management**

| Method                            | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `retry(fn, retries, delayMs)`     | Retries function on failure                      |
| `once(fn)`                        | Executes only once                               |
| `lock(fn)`                        | Prevents concurrent executions                   |
| `queue(fn)`                       | Ensures sequential execution                     |
| `cancelable(fn)`                  | Returns cancelable promise                       |
| `sandbox(fn, timeout)`            | Safe async execution with error handling         |
| `eventual(fn, checkFn, interval)` | Polls until a condition is true                  |
| `simulate(fn, options)`           | Simulates failures, delays, or corrupted outputs |

---

#### **4. Caching & Memoization**

| Method            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `memo(fn)`        | Caches results by arguments                 |
| `replay(fn)`      | Returns cached result for identical args    |
| `oncePerArgs(fn)` | Executes once per unique args               |
| `history(fn)`     | Tracks inputs and outputs                   |
| `tap(fn, tapFn)`  | Allows side effects without changing output |

---

#### **5. Validation & Restriction**

| Method                    | Purpose                              |
| ------------------------- | ------------------------------------ |
| `validate(fn, validator)` | Validates arguments before execution |
| `ensure(fn, validator)`   | Validates output                     |
| `restrict(fn, isAllowed)` | Throws if access is denied           |

---

#### **6. Throttling & Debouncing**

| Method                      | Purpose                         |
| --------------------------- | ------------------------------- |
| `debounce(fn, wait)`        | Executes only after idle period |
| `throttle(fn, wait)`        | Limits execution rate           |
| `rateTracker(fn, windowMs)` | Tracks call frequency           |

---

#### **7. Functional Utilities**

| Method                             | Purpose                     |
| ---------------------------------- | --------------------------- |
| `pipe(...fns)`                     | Composes multiple functions |
| `transformOutput(fn, transformer)` | Transforms result           |
| `evolve(fn, evolver)`              | Mutates output              |
| `randomizeArgs(fn)`                | Randomly shuffles arguments |
| `randomBehavior(fn, behaviors)`    | Executes random behavior    |

---

#### **8. Batching & Repetition**

| Method                     | Purpose                       |
| -------------------------- | ----------------------------- |
| `batch(fn, chunkSize, cb)` | Calls function in chunks      |
| `repeat(fn, n)`            | Calls function multiple times |

---

#### **9. Control Flow & Hooks**

| Method                      | Purpose                        |
| --------------------------- | ------------------------------ |
| `after(fn, n)`              | Executes after n calls         |
| `before(fn, n)`             | Executes at most n times       |
| `hook(fn, {before, after})` | Hooks before/after execution   |
| `undoable(fn, inverseFn)`   | Supports undo operations       |
| `chainable(fn)`             | Allows chaining multiple calls |
| `pipe(...fns)`              | Composes functions in sequence |

---

#### **10. Testing & Simulation**

| Method                                     | Purpose                          |
| ------------------------------------------ | -------------------------------- |
| `test(fn, testCases)`                      | Runs test cases                  |
| `simulate(fn, {failRate, corrupt, delay})` | Simulates failures and delays    |
| `predict(fn, modelFn)`                     | Adds predictions based on output |

---

#### **11. Data Wrapping & Utilities**

| Method                  | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `unit(fn, unit)`        | Wraps output with value, unit, timestamp |
| `mask(fn, masker)`      | Masks or transforms arguments            |
| `locale(fn, formatter)` | Localizes input/output                   |


Perfect! Let’s make a **detailed mental map / diagram** of the entire `FunctionWrapper` class and its methods. I’ll structure it clearly so you can either visualize it or later draw it on paper/software.

---

### **FunctionWrapper Mental Map**

#### **1. Core Concept**

* Provides **wrappers/enhancements for functions**
* Key capabilities:

  * Logging, timing, retry, caching
  * Control execution (debounce, throttle, lock, once)
  * Transform input/output
  * Error handling and safety
  * Composition and chaining

---

#### **2. Method Categories & Examples**

**A. Logging & Monitoring**

* `log(fn)` → logs calls and results
* `time(fn)` → measures execution time
* `profile(fn)` → detailed table of duration
* `changelog(fn)` → logs changes in object outputs
* `stats(fn)` → tracks number of calls, avg time
* `watch(fn)` → subscribe to outputs
* `feedback(fn, logger)` → logs input/output

**B. Execution Control**

* `once(fn)` → runs only once
* `after(fn, n)` → runs after n calls
* `before(fn, n)` → runs at most n times
* `limit(fn, max)` → limits number of calls
* `lock(fn)` → prevents concurrent execution
* `oncePerArgs(fn)` → runs once per argument combo
* `queue(fn)` → sequential execution
* `delayFn(fn, delay)` → delay execution
* `delayResult(fn, ms)` → delay return value
* `delayEach(fn, delayMs)` → sequential with delay
* `afterIdle(fn, timeout)` → browser idle execution
* `smartIdle(fn, options)` → idle execution with cancel

**C. Error Handling & Safety**

* `catch(fn, onError, fallback)` → error catch
* `sandbox(fn, timeout)` → safe execution with error handling
* `safeJson(fn)` → catches JSON parsing errors
* `timeLimit(fn, timeout)` → rejects after timeout
* `cancelable(fn)` → cancel in-flight promise

**D. Input/Output Transformation**

* `validate(fn, validator)` → validate arguments
* `mask(fn, masker)` → transform arguments
* `restrict(fn, isAllowed)` → allow/disallow call
* `tap(fn, tapFn)` → side effect without affecting return
* `transformOutput(fn, transformer)` → change output
* `locale(fn, formatter)` → format input/output
* `unit(fn, unit)` → wraps output with value/unit/timestamp

**E. Caching & Memoization**

* `memo(fn)` → caches results
* `replay(fn)` → returns cached result for identical args

**F. Functional Composition**

* `pipe(...fns)` → left-to-right composition
* `chainable(fn)` → chain calls, collect results

**G. Retry & Simulation**

* `retry(fn, retries, delayMs)` → retry failing fn
* `simulate(fn, options)` → simulate failure/delay/corruption
* `randomBehavior(fn, behaviors)` → random behavior
* `randomizeArgs(fn)` → shuffle arguments

**H. Undo & History**

* `undoable(fn, inverseFn)` → supports undo
* `history(fn)` → tracks args/results

**I. Conditional Execution**

* `ensure(fn, validator)` → ensures output passes
* `filterArgs(fn, filterFn)` → executes only if condition passes
* `delayIf(fn, condition, delayMs)` → delays conditionally
* `alertOn(fn, condition)` → logs alerts if condition true
* `warnOnArgs(fn, warningFn)` → warns on suspicious input
* `predict(fn, modelFn)` → adds prediction based on output
* `eventual(fn, checkFn, interval)` → polls until condition true

**J. Repeat & Batch**

* `repeat(fn, n)` → repeat function n times
* `batch(fn, chunkSize, cb)` → executes in chunks

**K. Miscellaneous**

* `hook(fn, {before, after})` → pre/post hooks
* `evolve(fn, evolver)` → mutate or extend output

---

#### **3. Mental Map Visualization Idea**

```
FunctionWrapper
│
├─ Logging & Monitoring
│   ├─ log()
│   ├─ time()
│   ├─ profile()
│   ├─ changelog()
│   ├─ stats()
│   ├─ watch()
│   └─ feedback()
│
├─ Execution Control
│   ├─ once()
│   ├─ after()
│   ├─ before()
│   ├─ limit()
│   ├─ lock()
│   ├─ oncePerArgs()
│   ├─ queue()
│   ├─ delayFn()
│   ├─ delayResult()
│   ├─ delayEach()
│   ├─ afterIdle()
│   └─ smartIdle()
│
├─ Error Handling & Safety
│   ├─ catch()
│   ├─ sandbox()
│   ├─ safeJson()
│   ├─ timeLimit()
│   └─ cancelable()
│
├─ Input/Output Transformation
│   ├─ validate()
│   ├─ mask()
│   ├─ restrict()
│   ├─ tap()
│   ├─ transformOutput()
│   ├─ locale()
│   └─ unit()
│
├─ Caching & Memoization
│   ├─ memo()
│   └─ replay()
│
├─ Functional Composition
│   ├─ pipe()
│   └─ chainable()
│
├─ Retry & Simulation
│   ├─ retry()
│   ├─ simulate()
│   ├─ randomBehavior()
│   └─ randomizeArgs()
│
├─ Undo & History
│   ├─ undoable()
│   └─ history()
│
├─ Conditional Execution
│   ├─ ensure()
│   ├─ filterArgs()
│   ├─ delayIf()
│   ├─ alertOn()
│   ├─ warnOnArgs()
│   ├─ predict()
│   └─ eventual()
│
├─ Repeat & Batch
│   ├─ repeat()
│   └─ batch()
│
└─ Miscellaneous
    ├─ hook()
    └─ evolve()
```


#### **ASCII-style mental map**

```
FunctionWrapper
├─ Logging & Monitoring
│  ├─ log(fn)
│  ├─ time(fn)
│  ├─ profile(fn)
│  ├─ changelog(fn)
│  ├─ feedback(fn, logger)
│  └─ watch(fn)
│
├─ Execution Control
│  ├─ once(fn)
│  ├─ after(fn, n)
│  ├─ before(fn, n)
│  ├─ lock(fn)
│  ├─ queue(fn)
│  ├─ repeat(fn, n)
│  ├─ delayFn(fn, delay)
│  ├─ timeLimit(fn, timeout)
│  ├─ sandbox(fn, timeout)
│  ├─ afterIdle(fn, timeout)
│  └─ smartIdle(fn, options)
│
├─ Error Handling & Safety
│  ├─ catch(fn, onError, fallback)
│  ├─ safeJson(fn)
│  ├─ undoable(fn, inverseFn)
│  ├─ cancelable(fn)
│  ├─ ensure(fn, validator)
│  └─ restrict(fn, isAllowed)
│
├─ Input/Output Transformation
│  ├─ tap(fn, tapFn)
│  ├─ mask(fn, masker)
│  ├─ transformOutput(fn, transformer)
│  ├─ evolve(fn, evolver)
│  ├─ locale(fn, formatter)
│  ├─ randomizeArgs(fn)
│  ├─ randomBehavior(fn, behaviors)
│  └─ predict(fn, modelFn)
│
├─ Caching & Memoization
│  ├─ memo(fn)
│  ├─ replay(fn)
│  └─ oncePerArgs(fn)
│
├─ Functional Composition
│  ├─ chainable(fn)
│  ├─ pipe(...fns)
│  └─ hook(fn, {before, after})
│
├─ Retry & Simulation
│  ├─ retry(fn, retries, delayMs)
│  └─ simulate(fn, {failRate, corrupt, delay})
│
├─ Conditional Execution
│  ├─ delayIf(fn, condition, delayMs)
│  ├─ eventual(fn, checkFn, interval)
│  ├─ filterArgs(fn, filterFn)
│  ├─ warnOnArgs(fn, warningFn)
│  └─ alertOn(fn, condition)
│
├─ Repeat & Batch
│  ├─ batch(fn, chunkSize, cb)
│  └─ delayEach(fn, delayMs)
│
└─ Unit & Stats
   ├─ unit(fn, unit)
   └─ stats(fn)
```

---

## 🏁 `isMain` & `runIfMain`

`hbh-nodes` provides utility functions to detect if a module is the **main entry point** and to execute code **only when the module is run directly**, not when imported. This is especially useful for libraries that can be **both imported and executed as scripts**.

---

### Import

#### CommonJS

```js
const { isMain, runIfMain } = require("hbh-nodes");
```

#### ES Modules

```js
import { isMain, runIfMain } from "hbh-nodes";
```

---

### `isMain(importMetaUrl, cjsModule, mainModule)`

Determines if the current module is being executed as the main script.

#### Parameters

| Name            | Type             | Description                                                                                |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `importMetaUrl` | `string` | `URL` | The `import.meta.url` of the current ES module (for ESM).                                  |
| `cjsModule`     | `object`         | The CommonJS `module` object. Optional if using ESM.                                       |
| `mainModule`    | `object`         | The main module reference, typically `require.main`. Optional but recommended in CommonJS. |

#### Returns

* `true` → If the module is the main entry point.
* `false` → If the module is imported or parameters are invalid.

#### Behavior

1. **CommonJS Detection:**

   ```js
   if (typeof mainModule !== "undefined" && cjsModule === mainModule) {
       return require.main === mainModule;
   }
   ```

   Checks if the current `module` is the main script.

2. **ES Module Detection:**

   ```js
   const filename = fileURLToPath(importMetaUrl);
   return filename === process.argv[1];
   ```

   Converts `import.meta.url` to a path and compares with the Node.js entry file.

3. **Safe Fallback:** Returns `false` for unknown or invalid inputs.

#### Example

```js
const { isMain } = require("./mainCheck");

if (isMain(null, module, require.main)) {
  console.log("This module is running directly!");
}
```

#### Edge Cases

* Works for both ES modules and CommonJS.
* Returns `false` when the module is imported.
* Handles invalid inputs gracefully.
* In ESM, `require` is unavailable, so CommonJS checks are skipped.

---

### `runIfMain(importMetaUrl, cjsModule, mainModule, fn)`

Executes a function only if the current module is the main script.

#### Parameters

| Name            | Type             | Description                                                                       |
| --------------- | ---------------- | --------------------------------------------------------------------------------- |
| `importMetaUrl` | `string` | `URL` | The `import.meta.url` of the current ES module.                                   |
| `cjsModule`     | `object`         | The CommonJS `module` object. Optional if using ESM.                              |
| `mainModule`    | `object`         | The main module reference (`require.main`). Optional but recommended in CommonJS. |
| `fn`            | `function`       | Function to execute if the module is main.                                        |

#### Returns

* Returns the result of `fn()` if executed.
* Returns `undefined` if the module is imported.

#### Behavior

* Calls `isMain()` internally to determine if the module is the main entry point.
* Executes the provided function `fn()` only when the module is running directly.
* Safe for **mixed ESM + CommonJS environments**.

#### Example

###### CommonJS

```js
const { runIfMain } = require("./mainCheck");

function main() {
  console.log("Running directly as a script!");
}

runIfMain(null, module, require.main, main);
```

###### ES Module

```js
import { runIfMain } from "./mainCheck.mjs";

runIfMain(import.meta.url, null, null, () => {
  console.log("Running directly in ESM!");
});
```

#### Edge Cases

* Does nothing if the module is imported.
* Safely handles invalid inputs.
* Useful for CLI scripts or libraries with optional initialization.

---

### Best Practices

1. Always pass the **correct module references** in CommonJS (`module` and `require.main`).
2. For ESM, pass `import.meta.url` and `null` for the CommonJS parameters.
3. Wrap all **startup code** or CLI logic inside `runIfMain` to avoid side effects on import.
4. Use `isMain` if you need **conditional checks** without running a function.

---

### Advanced / Deep Dive Usage

#### Example: CLI Script with Arguments

```js
runIfMain(import.meta.url, module, require.main, () => {
  const args = process.argv.slice(2);
  console.log("CLI arguments:", args);
  // Start your CLI logic here
});
```

---

## 🗂️ `JsonManager`

A utility class for managing JSON data in memory and on disk. Supports loading, saving, reading, updating, and deleting nested keys using dot-separated paths.

### Import

```js
import { JsonManager } from "hbh-nodes";
```

---

### `constructor(initialData = {})`

Creates a new `JsonManager` instance with optional initial data.

**Parameters:**

* `initialData` (object, optional) – Starting JSON data. Defaults to an empty object.

**Example:**

```js
const jm = new JsonManager({ user: { name: "Alice" } });
```

---

### `static async loadFromFile(filePath)`

Loads JSON data from a file and returns a `JsonManager` instance.

**Parameters:**

* `filePath` (string) – Path to the JSON file.

**Returns:**
`Promise<JsonManager>` – A new instance containing the loaded data.

**Example:**

```js
const jm = await JsonManager.loadFromFile("./data.json");
```

**Edge Cases:**

* Throws an error if the file does not exist or contains invalid JSON.

---

### `async saveToFile(filePath)`

Saves the current JSON data to a file.

**Parameters:**

* `filePath` (string) – Path where the JSON should be written.

**Returns:**
`Promise<void>`

**Example:**

```js
await jm.saveToFile("./data.json");
```

**Edge Cases:**

* Overwrites the file if it already exists.
* Throws an error if the write operation fails.

---

### `get(path)`

Retrieves a value from nested JSON using a dot-separated path.

**Parameters:**

* `path` (string) – Dot-separated key path (e.g., `"user.name"`).

**Returns:**
The value at the given path or `undefined` if not found.

**Example:**

```js
const name = jm.get("user.name"); // "Alice"
```

---

### `set(path, value)`

Sets a value in nested JSON using a dot-separated path. Creates intermediate objects if needed.

**Parameters:**

* `path` (string) – Dot-separated key path.
* `value` – Value to set.

**Example:**

```js
jm.set("user.age", 25);
```

---

### `delete(path)`

Deletes a key in nested JSON using a dot-separated path.

**Parameters:**

* `path` (string) – Dot-separated key path.

**Example:**

```js
jm.delete("user.age");
```

---

### `print()`

Pretty-prints the current JSON data to the console.

**Example:**

```js
jm.print();
/*
{
  "user": {
    "name": "Alice"
  }
}
*/
```

---

## 🎯 `micromatch`

A minimal utility for matching strings against glob patterns. Supports standard wildcards (`*`, `**`, `?`) and character ranges (`[a-z]`). Can also negate patterns using `!`.

### Import

```js
import { micromatch } from "hbh-nodes";
```

---

### `escapeRegex(str)`

Escapes special regex characters in a string.

**Parameters:**

* `str` (string) – Input string.

**Returns:**
Escaped string safe for regex.

**Example:**

```js
const escaped = micromatch.escapeRegex("file?.txt"); // "file\?.txt"
```

---

### `globToRegex(pattern)`

Converts a glob pattern to a JavaScript `RegExp`.

**Parameters:**

* `pattern` (string) – Glob pattern (e.g., `"*.js"` or `"src/**/index.js"`).

**Returns:**
`RegExp` – Equivalent regex for matching.

**Example:**

```js
const regex = micromatch.globToRegex("src/**/*.js");
console.log(regex.test("src/app/index.js")); // true
```

**Edge Cases:**

* `*` matches any sequence except `/`.
* `**` matches any sequence including `/`.
* `?` matches any single character except `/`.
* Character ranges like `[a-z]` are preserved.

---

### `micromatch(list, pattern)`

Filters a list of strings based on a glob pattern. Supports negation with a leading `!`.

**Parameters:**

* `list` (string[]) – Array of strings to match.
* `pattern` (string) – Glob pattern.

**Returns:**
Array of matched strings.

**Example:**

```js
const files = ["index.js", "style.css", "app.js"];
console.log(micromatch.micromatch(files, "*.js")); // ["index.js", "app.js"]
console.log(micromatch.micromatch(files, "!*.js")); // ["style.css"]
```

---

### `matchGlob(pattern, str)`

Tests if a single string matches a glob pattern.

**Parameters:**

* `pattern` (string) – Glob pattern.
* `str` (string) – String to test.

**Returns:**
`boolean` – `true` if the string matches the pattern.

**Example:**

```js
console.log(micromatch.matchGlob("*.js", "index.js")); // true
console.log(micromatch.matchGlob("*.js", "style.css")); // false
```

---

## 📝 `Project2MD`

### Overview

The `Project2MD` function converts a project directory into a single Markdown (`.md`) file. It recursively walks through the directory tree, reads file contents, and appends them to a Markdown file with optional formatting. It also generates a summary table of all processed files.

This is useful for creating project documentation, code snapshots, or sharing projects as a single Markdown file.

---

### Installation

```bash
npm install hbh-nodes
```

Or using yarn:

```bash
yarn add hbh-nodes
```

---

### Usage

```js
import { P2PMD } from 'hbh-nodes';

const { Project2MD, SimpleExclude } = P2PMD;

await Project2MD({
  input: './my-project',
  output: './docs/project.md',
  concurrency: 10,
  onprogress: ({ index, relPath }) => {
    console.log(`Processed file #${index}: ${relPath}`);
  },
  onEnd: ({ total }) => {
    console.log(`Finished! Total files processed: ${total}`);
  },
});
```

---

### Function Signature

```ts
async function Project2MD(opts?: Project2MDOptions): Promise<void>
```

#### Parameters

`opts` – An optional object of type `Project2MDOptions`.

###### Options

| Option              | Type                                                     | Default              | Description                                                           |                                                   |
| ------------------- | -------------------------------------------------------- | -------------------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| `input`             | `string`                                                 | `'./'`               | Path to the input directory to convert.                               |                                                   |
| `output`            | `string`                                                 | `'output.md'`        | Path of the Markdown file to create.                                  |                                                   |
| `onprogress`        | `(progress: { index: number; relPath: string }) => void` | `() => {}`           | Callback called after each file is processed.                         |                                                   |
| `onEnd`             | `(summary: { total: number }) => void`                   | `() => {}`           | Callback called when processing finishes.                             |                                                   |
| `filenameFormatter` | `(relPath: string, stats: fs.Stats) => string            | Promise<string>`     | Returns Markdown header for each file. Default: `###### \`${relPath}``  | Allows customizing the header of each file block. |
| `summaryFormatter`  | `(files: { relPath: string; size: number }[]) => string  | Promise<string>`     | Generates the summary table at the end.                               |                                                   |
| `exclude`           | `string[]`                                               | `SimpleExclude.Node` | List of files or directories to exclude (supports globs `*` and `?`). |                                                   |
| `ignoreHidden`      | `boolean`                                                | `true`               | Skip hidden files and directories starting with `.`.                  |                                                   |
| `concurrency`       | `number`                                                 | `5`                  | Maximum number of files to process concurrently.                      |                                                   |
| `maxFileSize`       | `number`                                                 | `10 * 1024 * 1024`   | Skip files larger than this size (in bytes).                          |                                                   |
| `stopOnError`       | `boolean`                                                | `false`              | If `true`, stops processing on the first error.                       |                                                   |

---

### Predefined Exclude

`SimpleExclude` is provided to skip common Node.js project files and directories:

```js
SimpleExclude.Node = ['node_modules', 'package-lock.json', '.gitignore', 'package.json'];
```

---

### How It Works

1. **Resolve Paths**
   Converts `input` and `output` to absolute paths and ensures the output file itself is excluded.

2. **Directory Walk**
   Recursively walks directories sequentially to avoid concurrency deadlocks.

   * Directories are traversed first.
   * Files are processed concurrently, respecting the `concurrency` limit.

3. **File Processing**
   For each file:

   * Skips if hidden, excluded, or exceeds `maxFileSize`.
   * Reads file contents (`utf-8`).
   * Generates a Markdown header using `filenameFormatter`.
   * Wraps the content in a fenced code block with language derived from the file extension.
   * Appends content to the output Markdown file.
   * Calls `onprogress` callback.

4. **Summary Generation**
   After all files are processed:

   * Calls `summaryFormatter` with the list of processed files.
   * Appends the generated summary to the Markdown file.

5. **Error Handling**

   * Wraps file system operations in `safeRun` to catch errors without stopping execution unless `stopOnError` is `true`.
   * Logs warnings and errors for files that fail to process.

---

### Example Output

Assuming a directory structure:

```
src/
 ├─ index.js
 ├─ utils.js
README.md
```

Generated `output.md` could look like:

````markdown
###### `src/index.js`

```js
console.log('Hello World');
````

###### `src/utils.js`

```js
export function add(a, b) { return a + b; }
```

###### `README.md`

```md
# My Project
This is my project.
```

---

### Notes

* Files larger than `maxFileSize` are skipped.
* Hidden files/directories are ignored if `ignoreHidden` is `true`.
* Concurrency ensures faster processing but directory traversal is always sequential.
* Markdown language blocks are derived from file extensions; fallback to no language if unknown.
* `onprogress` and `onEnd` allow progress tracking or UI updates.

---

This function is designed for **Node.js environments** and uses **ESM imports** (`fs/promises`, `path`).

---

## 📦 packageJson

A set of functions to programmatically create and manage `package.json` files for Node.js projects, including batch creation in subdirectories and automated publishing.

---

### Import

```js
import { JPM } from "hbh-nodes";
const { createPackageJson, createPackagesInSubdirs, publishAllPackages } = JPM;
```

---

### `createPackageJson(dirPath, newJson)`

Creates a `package.json` file in the specified directory. If the file already exists, it will not overwrite it.

**Parameters:**

* `dirPath` (string) – Path to the directory where `package.json` should be created.
* `newJson` (object, optional) – Overrides or additional fields for the `package.json`.

**Returns:**

* JSON string of the final package content.

**Example:**

```js
createPackageJson("./my-lib", {
  name: "my-lib",
  version: "1.0.0",
  author: "HBH"
});
```

**Edge Cases:**

* If a `package.json` already exists, it is not overwritten.
* Default fields are merged with any custom fields provided.

---

### `createPackagesInSubdirs(parentDir, defaultJsonOverrides)`

Creates `package.json` files in all subdirectories of a given directory.

**Parameters:**

* `parentDir` (string) – Directory containing multiple package folders.
* `defaultJsonOverrides` (object, optional) – Fields to override default values for all packages.

**Example:**

```js
createPackagesInSubdirs("./packages", {
  license: "MIT",
  author: "HBH"
});
```

**Edge Cases:**

* Uses the folder name as the package `name` by default.
* Only directories are processed; files are ignored.
* Existing `package.json` files are preserved.

---

### `publishAllPackages(parentDir)`

Publishes all Node.js packages in subdirectories under a specified directory using `npm publish`.

**Parameters:**

* `parentDir` (string) – Directory containing multiple package folders with valid `package.json`.

**Example:**

```js
publishAllPackages("./packages");
```

**Behavior:**

* Runs `npm publish --access public` in each subdirectory.
* Logs success or failure for each package.

**Edge Cases:**

* Subdirectories without `package.json` are skipped.
* Errors in publishing one package do not stop publishing of others.
* Output of `npm publish` is displayed in the console.

---

## 🧼 `Sanitizers`

A comprehensive utility to sanitize strings, objects, and arrays by removing or masking sensitive data such as emails, paths, IPs, URLs, credit cards, and more.

---

### Import

```js
import { Sanitizers as SZ } from "hbh-nodes";
const { Sanitizers, deepSanitize, applySanitizers, sanitizeAll, capitalize, getSanitizerNames } = SZ;
```

---

### `Sanitizers`

An object containing individual sanitization functions automatically generated from common sensitive patterns.

**Example Functions:**

* `sanitizeEmail(str)` – Masks emails.
* `sanitizePath(str)` – Masks file paths.
* `sanitizeIp(str)` – Masks IPv4/IPv6 addresses.
* `sanitizeCreditCard(str)` – Masks credit card numbers.
* `sanitizeHtml(str)` – Strips HTML tags.
* `sanitizeJwt(str)` – Masks JWT tokens.

**Usage:**

```js
const dirty = "User email: test@example.com";
const clean = Sanitizers.sanitizeEmail(dirty);
console.log(clean); // User email: [SANITIZED:email]
```

---

### `deepSanitize(obj, sanitizerFns = [], sanitizeKeys = false)`

Recursively sanitizes strings in objects or arrays using provided sanitizer functions.

**Parameters:**

* `obj` – Object, array, or string to sanitize.
* `sanitizerFns` – Array of sanitizer functions to apply.
* `sanitizeKeys` (boolean) – If `true`, also sanitizes object keys.

**Example:**

```js
const data = {
  user: {
    email: "test@example.com",
    password: "1234"
  }
};

const clean = deepSanitize(data, [Sanitizers.sanitizeEmail]);
console.log(clean);
// { user: { email: '[SANITIZED:email]', password: '1234' } }
```

---

### `applySanitizers(value, sanitizers = [])`

Applies an array of sanitizer functions to a single string safely.

**Example:**

```js
const dirty = "My email is test@example.com";
const clean = applySanitizers(dirty, [Sanitizers.sanitizeEmail]);
console.log(clean); // My email is [SANITIZED:email]
```

---

### `sanitizeAll(str, options = {})`

Convenience function to apply multiple sanitizers with filtering and custom replacements.

**Options:**

* `only` – Array of sanitizer names to apply exclusively.
* `exclude` – Array of sanitizer names to skip.
* `replacements` – Custom replacement strings for specific sanitizers.

**Example:**

```js
const dirty = "Contact me at test@example.com or 123 Main St";
const clean = sanitizeAll(dirty, { exclude: ["sanitizePath"] });
console.log(clean); // Contact me at [SANITIZED:email] or 123 Main St
```

---

### `capitalize(str)`

Utility to capitalize the first letter of a string, mainly used for dynamically naming sanitizer functions.

**Example:**

```js
console.log(capitalize("email")); // Email
```

---

### `getSanitizerNames()`

Returns an array of all generated sanitizer function names.

**Example:**

```js
console.log(getSanitizerNames());
// ["sanitizePath", "sanitizeEmail", "sanitizeIp", ...]
```

---

**Edge Cases & Notes:**

* Sanitizers operate safely on non-string values by returning them unchanged.
* `deepSanitize` can handle nested arrays and objects of arbitrary depth.
* Custom replacements allow flexible masking beyond default `[SANITIZED:<type>]`.

---

## 🗜️ `StringCompressor`

A utility class for compressing and decompressing strings using a dictionary-based approach. Frequently occurring words can be replaced with short keys to reduce string size. Supports customizable flags, automatic dictionary generation, and statistics on compression efficiency.

---

### Import

```js
import { StringCompressor } from "hbh-nodes";
```

---

### Class: `StringCompressor`

#### Constructor

```js
new StringCompressor(dictionary = {}, flag = '$')
```

**Parameters:**

* `dictionary` – Optional initial dictionary mapping original strings to compressed keys. Defaults to `{}`.
* `flag` – Prefix for compressed keys. Defaults to `$`.

**Example:**

```js
const compressor = new StringCompressor({}, '#');
```

---

#### `setDictionary(dictionary)`

Sets a new dictionary and automatically generates a reverse dictionary for decompression.

**Parameters:**

* `dictionary` – Object mapping original strings to short keys.

**Example:**

```js
compressor.setDictionary({ hello: '$a', world: '$b' });
```

---

#### `compress(str, dictionary = null)`

Compresses a string using the current dictionary. Optionally, a new dictionary can be passed.

**Parameters:**

* `str` – The string to compress.
* `dictionary` – Optional dictionary to override current one.

**Example:**

```js
const compressed = compressor.compress("hello world hello");
// "$a $b $a"
```

---

#### `decompress(str, dictionary = null)`

Decompresses a string using the current reverse dictionary. Optionally, a new dictionary can be passed.

**Parameters:**

* `str` – The string to decompress.
* `dictionary` – Optional dictionary to override current one.

**Example:**

```js
const decompressed = compressor.decompress("$a $b $a");
// "hello world hello"
```

---

#### `generateMap(str, minLength = 4, minFreq = 2, flag)`

Generates a compression dictionary automatically based on word frequency in the input string.

**Parameters:**

* `str` – Input string.
* `minLength` – Minimum length of words to consider. Defaults to `4`.
* `minFreq` – Minimum frequency of words to include. Defaults to `2`.
* `flag` – Optional flag prefix for keys. Defaults to the instance flag.

**Returns:** Dictionary object mapping words to short keys.

**Example:**

```js
const map = compressor.generateMap("hello world hello world", 3, 2);
// { hello: '$a', world: '$b' }
```

---

#### `generateAndSetDictionary(str, minLength = 4, minFreq = 2, flag)`

Generates a frequency-based dictionary and sets it as the current dictionary.

**Returns:** Dictionary object.

**Example:**

```js
compressor.generateAndSetDictionary("hello world hello world");
// Dictionary now set: { hello: '$a', world: '$b' }
```

---

#### `stats(originalStr, compressedStr)`

Provides statistics on compression efficiency.

**Parameters:**

* `originalStr` – Original string.
* `compressedStr` – Compressed string.

**Returns:** Object with:

* `originalLength` – Length of original string.
* `compressedLength` – Length of compressed string.
* `saved` – Number of characters saved.
* `percentSaved` – Percentage reduction as string.

**Example:**

```js
const stats = compressor.stats("hello world hello", "$a $b $a");
console.log(stats);
// { originalLength: 17, compressedLength: 9, saved: 8, percentSaved: '47.06%' }
```

---

#### `replace(str, map)`

Replaces occurrences of keys in a string based on a mapping object.

**Example:**

```js
compressor.replace("hello world", { hello: '$a', world: '$b' });
// "$a $b"
```

---

**Edge Cases & Notes:**

* Supports Unicode words via `\p{L}` regex.
* Generates short keys using patterns like `a, b, ..., z, aa, ab`.
* Words shorter than `minLength` or below frequency threshold are ignored.
* Safe to use on strings without dictionary; returns original string unchanged if mapping is empty.

---

## ⏱️ TrackTimeWrapper — Time Utilities

Measure execution time and format durations with ease.

---

### 🕒 `TrackTimeWrapper.formatDuration(ms)`

Convert milliseconds into a **human-readable duration string**.

```js
import { TrackTimeWrapper } from 'hbh-nodes';

TrackTimeWrapper.formatDuration(65000);    // "1 min 5 sec"
TrackTimeWrapper.formatDuration(3600000);  // "1 hr 0 sec"
```

#### ✨ Features

* Converts milliseconds to weeks, days, hours, minutes, seconds
* Clean output for logs & CLIs
* Zero dependencies

---

### ⏱️ `TrackTimeWrapper.Wrapper(asyncFn, ...args)`

Wrap any async function and return its **execution time**.

```js
import { TrackTimeWrapper } from 'hbh-nodes';

async function task() {
  await new Promise(res => setTimeout(res, 1200));
  return 'Done';
}

const { result, duration } =
  await TrackTimeWrapper.Wrapper(task);

console.log(result);   // "Done"
console.log(duration); // "1 sec"
```

#### ✨ Features

* Measures async function runtime
* Returns `{ result, duration }`
* Internally uses `TrackTimeWrapper.formatDuration`
* Ideal for benchmarking & performance logs

---

### 💡 When to Use

* CLI tools
* Performance measurement
* Async task monitoring
* Developer debugging

---

## 📚 `StringArrayManager`

A robust class for managing arrays of strings with full support for validation, undo/redo, event handling, logging, and utility operations like search, pagination, and merging. It enforces uniqueness and optional case-insensitivity.

---

### Import

```js
import { StringArrayManager } from "hbh-nodes";
```

---

### Constructor

```js
new StringArrayManager(initialArray = [], options = {})
```

**Parameters:**

* `initialArray` – Optional array of strings to initialize.
* `options` – Optional configuration object:

| Option          | Type     | Default  | Description                                                       |
| --------------- | -------- | -------- | ----------------------------------------------------------------- |
| maxHistory      | number   | 100      | Maximum undo history length                                       |
| caseInsensitive | boolean  | false    | Normalize strings to lowercase for comparison                     |
| maxItems        | number   | Infinity | Maximum number of strings allowed                                 |
| validate        | function | null     | Function `(value) => boolean` for custom validation               |
| returnThis      | boolean  | false    | If true, mutating methods return `this` instead of status objects |
| saveHistory     | boolean  | true     | Enable/disable saving history for undo/redo                       |

**Example:**

```js
const manager = new StringArrayManager(["apple", "banana"], { caseInsensitive: true });
```

---

### Events

Subscribe to events emitted during operations:

```js
manager.on("add", ({ value }) => console.log("Added:", value));
manager.on("remove", ({ value }) => console.log("Removed:", value));
manager.off("add", callback); // Remove listener
```

Available events include: `add`, `remove`, `replace`, `delete`, `clear`, `reset`, `sort`, `undo`, `redo`, `merge`, `addBulk`, `removeBulk`.

---

### Adding & Removing Strings

#### `add(value)`

Adds a single string if valid, unique, and within limits.

```js
manager.add("orange");
```

#### `addBulk(values)`

Adds multiple strings with detailed results for added and skipped items.

```js
manager.addBulk(["kiwi", "pear", "apple"]);
```

#### `remove(value)` / `removeBulk(values)`

Remove single or multiple strings.

```js
manager.remove("banana");
manager.removeBulk(["kiwi", "apple"]);
```

#### `replace(oldValue, newValue)`

Replace a string with a new one (valid & unique).

```js
manager.replace("apple", "grape");
```

#### `delete(index)`

Remove by index.

```js
manager.delete(0);
```

---

### Array Utilities

#### `sortManual(compareFn)`

Sort array manually, optionally using a comparator.

```js
manager.sortManual(); // Default lexicographical
manager.sortManual((a, b) => a.length - b.length);
```

#### `search(pattern)`

Search strings using a substring or regex.

```js
manager.search("app");         // substring search
manager.search(/^g/);          // regex search
```

#### `clear()` / `reset(initialArray)`

Clear all strings or reset to a new array.

```js
manager.clear();
manager.reset(["pear", "melon"]);
```

#### `getAll()` / `length()` / `stats()`

Retrieve array, length, or statistics (longest, shortest, average length).

```js
manager.getAll();
manager.length();
manager.stats();
```

---

### Undo / Redo

```js
manager.undo();
manager.redo();
```

Supports undoing any change with full history up to `maxHistory`.

---

### Logging

```js
manager.enableLogging(true);
manager.getLog();
```

Tracks operations with timestamps and details.

---

### Validation

Custom validation function:

```js
manager.setValidation(val => val.length > 3 && /^[a-z]+$/.test(val));
```

---

### JSON Serialization

```js
const json = manager.toJSON();
manager.fromJSON(json);
```

---

### Utility Methods

* `has(value)` – Check if value exists.
* `get(index)` – Get value by index.
* `indexOf(value)` – Find index of value.
* `clone()` – Create a new instance with same array and options.
* `diff(prevArray)` – Compare current array with a previous array (`added`/`removed`).
* `merge(values)` – Merge multiple strings with duplicate/limit handling.
* `getPage(pageNum, pageSize)` – Paginate array.

---

#### Example Usage

```js
const manager = new StringArrayManager(["apple", "banana"], { caseInsensitive: true });

// Add strings
manager.add("Cherry");
manager.addBulk(["Date", "Fig"]);

// Remove strings
manager.remove("banana");

// Replace strings
manager.replace("apple", "Apricot");

// Undo / Redo
manager.undo();
manager.redo();

// Search
manager.search(/a/i);

// Pagination
manager.getPage(1, 2);

// Stats
manager.stats();

// Event listening
manager.on("add", ({ value }) => console.log("Added:", value));

// Logging
manager.enableLogging(true);
console.log(manager.getLog());
```

---

`StringArrayManager` is ideal for managing dynamic lists of strings with full control, safe operations, history tracking, and extensibility.

---

## 🖥️ `wrapCLI`

A lightweight wrapper for creating CLI (Command-Line Interface) commands in Node.js, with automatic argument parsing, type conversion, help support, and async handling.

---

### Overview

`wrapCLI` allows you to wrap a regular JavaScript function and run it as a CLI command. It:

* Parses command-line arguments (`process.argv`).
* Supports **positional** and **named** arguments.
* Automatically converts argument strings to **boolean**, **number**, or **string**.
* Provides built-in **help** functionality with aliases.
* Handles async functions and errors gracefully.

---

### Functions

#### 1. `tryParseValue(value)`

Converts string values to their appropriate types.

```js
tryParseValue("true");    // → true
tryParseValue("false");   // → false
tryParseValue("123.5");   // → 123.5
tryParseValue("hello");   // → "hello"
```

* Booleans (`true` / `false`)
* Numbers (`parseFloat`) if numeric
* Strings otherwise

---

#### 2. `parseArgs(argv)`

Parses an array of CLI arguments into **positional** and **named** arguments.

**Example:**

```bash
node cli.js foo bar --count 3 --verbose true
```

Output:

```js
{
  positional: ["foo", "bar"],
  named: { count: 3, verbose: true }
}
```

**Behavior:**

* `--key value` becomes `named[key] = value`.
* Multiple values after a flag become an array.
* Flag with no value → `true`.
* Single-value arrays are simplified to a single value.

---

#### 3. `showHelp(meta)`

Displays a help message using a metadata object.

```js
const meta = {
  description: "Example CLI tool",
  args: [{ name: "input", type: "string", required: true }],
  named: [{ name: "verbose", type: "boolean" }]
};

showHelp(meta);
```

Output:

```
📘 Example CLI tool

Positional arguments:
  input (required) <string> — 

Named options:
  --verbose <boolean> — 

Use "--help" to show this message.
```

---

#### 4. `wrapCLI(fn, meta, aliases)`

Wraps a JavaScript function `fn` as a CLI command.

```js
import { wrapCLI } from 'hbh-nodes';

function greet(name, options) {
  const prefix = options?.loud ? "HELLO" : "Hello";
  return `${prefix} ${name}!`;
}

const cli = wrapCLI(greet, {
  description: "Greet someone",
  args: [{ name: "name", type: "string", required: true }],
  named: [{ name: "loud", type: "boolean" }]
});

cli(); // Run from Node.js
```

**Features:**

* Checks for help flags (`--help` or `-h`) via `aliases`.
* Spreads **positional arguments** to the function.
* Optionally passes **named arguments** as the last object.
* Handles **async functions** automatically.
* Catches exceptions and logs errors.

---

### Example Usage

```bash
# Positional argument
node cli.js Alice

# Named argument
node cli.js Alice --loud true

# Help
node cli.js --help
node cli.js -h
```

---

### Notes

* Named arguments repeated are collected as arrays.
* `tryParseValue` automatically converts numeric and boolean strings.
* Help output is fully customizable via the `meta` object.

---

This wrapper is perfect for **lightweight CLI tools** without installing external dependencies like `yargs` or `commander`.

It keeps argument parsing simple, type-safe, and easy to extend with aliases or async handlers.

---

## 🧪 Environment Support

* Node.js **18+**
* ES Modules only

---

## 📄 License

ISC

---

## ✍️ Author

**HBH**

---

## 💖 Final Words

> HBH-Nodes is built for developers who value **control, readability, and long-term maintainability**.

If you like tools that **stay out of your way**, this package is for you ✨
