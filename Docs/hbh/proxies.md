# 🪝 hbh-proxies

**`hbh-proxies`** is a lightweight, proxy-based utility toolkit for JavaScript and Node.js that enables **fluent, chainable APIs** for:

* ✨ Dynamic CSS generation (CSS-in-JS)
* 🔗 Proxy-driven function pipelines
* 🧩 Declarative, readable code without builders or config objects

This package heavily leverages **JavaScript `Proxy` objects** to create expressive, extensible APIs with minimal boilerplate.

---

## ⚡🚀 Installation

```bash
npm install hbh-proxies
````

---

## 📦📂 Package Exports

```js
import { Builder, CSS } from "hbh-proxies";
```

### 📤 Export Map

| Export                   | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `Builder`                | Generic proxy-based function pipeline builder   |
| `CSS.Builder`            | Chainable CSS generator                         |
| `CSS.Minify`             | Standalone CSS minifier                         |
| `CSS.Prefixers.Props`    | Set of CSS properties requiring vendor prefixes |
| `CSS.Prefixers.Prefixes` | Vendor prefix list                              |

---

## 🧠⚙️ ProxyBuilder (Generic Pipeline Builder)

The `ProxyBuilder` allows you to create **chainable function pipelines** dynamically.

---

### ✨📌 Basic Usage

```js
import { Builder } from "hbh-proxies";

const api = new Builder()
  .use("upper", s => s.toUpperCase())
  .use("exclaim", s => s + "!")
  .use("repeat", (s, n) => s.repeat(n));

api.upper.exclaim.repeat("hello", 2);
// → "HELLO!HELLO!"
```

---

### 🔗🧩 How It Works

Each chained property corresponds to a function stored in an internal map.
When the proxy is **invoked**, each function runs in order.

```js
api.upper.exclaim("test")
// upper → exclaim → result
```

---

### 🧩🛠 Supported Invocation Styles

#### ▶️ Normal Call

```js
api.upper("hello")
```

#### 🏷 Tagged Template

```js
api.upper`hello world`
```

#### 🧪 Explicit Execution

```js
api.upper.exclaim.done("hello")
api.upper.exclaim.run("hello")
api.upper.exclaim.pipe("hello")
```

---

### ⏱⚡ Async Pipelines

If your functions return promises:

```js
api.use("delay", async s => {
  await new Promise(r => setTimeout(r, 100));
  return s + " done";
});

await api.delay.asyncDone("task");
```

---

### 🔍📜 Introspection

```js
api.upper.exclaim.steps
// → ["upper", "exclaim"]
```

---

### ⚠️🚫 Error Handling

Accessing an undefined method throws:

```js
api.unknown("test");
// Error: Method "unknown" not found.
```

---

## 🎨🖌 CSSProxyBuilder (CSS-in-JS)

`CSS.Builder` provides a **declarative, chainable API** for building CSS with:

* 🧱 Nested selectors
* 📱 Media queries
* 🎞 Keyframes
* 🧬 Vendor prefixing
* 🧹 Optional minification

---

### ✨🎯 Basic Example

```js
import { CSS } from "hbh-proxies";

const css = new CSS.Builder()
  .button({
    padding: "10px",
    background: "blue",
    color: "white"
  })
  .button.hover({
    background: "darkblue"
  })
  .all;

console.log(css);
```

#### 🖨 Output

```css
button { padding: 10px; background: blue; color: white; }
button:hover { background: darkblue; }
```

---

### 🔗📐 Selector Chaining

| Chain           | Result         |
| --------------- | -------------- |
| `.div.span`     | `div span`     |
| `.button.hover` | `button:hover` |
| `.ul.li.a`      | `ul li a`      |

> Pseudo-selectors (`:hover`, `:active`, etc.) automatically attach without spaces.

---

### 🎯🧩 Applying Styles

You apply styles by **calling the proxy**:

```js
.div({
  margin: "0",
  padding: "0"
})
```

---

### 📱🌐 Media Queries

Media queries are declared using keys starting with `@media`.

```js
.container({
  width: "100%",
  "@media (max-width: 600px)": {
    width: "90%"
  }
})
```

#### 🖨 Output

```css
container { width: 100%; }
@media (max-width: 600px) {
  container { width: 90%; }
}
```

---

### 🎞✨ Keyframes

```js
const css = new CSS.Builder()
  .keyframes("fadeIn", {
    from: { opacity: 0 },
    to: { opacity: 1 }
  })
  .box({
    animation: "fadeIn 1s ease-in"
  })
  .all;
```

#### 🖨 Output

```css
box { animation: fadeIn 1s ease-in; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

### 🧬🔧 Vendor Prefixing

Vendor prefixes are automatically applied to known properties:

```js
.box({
  transform: "scale(1.2)"
})
```

#### 🖨 Output

```css
box {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
```

#### 📦 Prefix Data

```js
CSS.Prefixers.Props     // Set of prefixed properties
CSS.Prefixers.Prefixes // ['-webkit-', '-moz-', '-ms-', '-o-']
```

---

### 🧹⚡ Minification

#### ▶️ Enable Minification

```js
const css = new CSS.Builder()
  .minify()
  .card({
    padding: "10px",
    border: "1px solid #000"
  })
  .all;
```

#### 🖨 Output

```css
card{padding:10px;border:1px solid #000}
```

---

### 🛠🧪 Standalone Minifier

```js
import { CSS } from "hbh-proxies";

CSS.Minify(`
  /* comment */
  .box {
    padding: 10px;
    margin: 0;
  }
`);
```

---

### 📤📄 Retrieving CSS

| Property        | Description              |
| --------------- | ------------------------ |
| `.css`          | Last generated CSS block |
| `.all`          | Full accumulated CSS     |
| `String(proxy)` | Same as `.all`           |

---

## 📚 Proxies

The `hbh-proxies` package ships with utility libraries exposed via `Proxies`:

```js
import { Proxies } from "hbh-proxies";
const { HBHChalk, HBHString, DataConverter } = Proxies;
```

---

### 1️⃣ `DataConverter`

**Purpose:** Convert between common data types (strings, numbers, arrays, booleans, JSON).

**Key Methods:**

| Method                     | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| `strToArray(str)`          | Converts string to array of characters.                   |
| `strToArrayByComma(str)`   | Splits a string by commas into an array.                  |
| `arrayToStr(arr)`          | Joins an array into a string.                             |
| `arrayToStrWithSpace(arr)` | Joins an array into a string with spaces.                 |
| `strToNum(str)`            | Converts string to `Number`.                              |
| `strToInt(str)`            | Converts string to integer using `parseInt`.              |
| `numToStr(num)`            | Converts number to string.                                |
| `intToFloat(n)`            | Converts integer to float using `parseFloat`.             |
| `parseJSON(str)`           | Parses JSON string, returns `null` on error.              |
| `stringifyJSON(obj)`       | Converts object to JSON string.                           |
| `boolToStr(b)`             | Converts boolean to string.                               |
| `strToBool(str)`           | Converts string to boolean (`true, 1, yes, on` → `true`). |

**Usage Example:**

```js
DataConverter.strToArray("hello");
// → ['h','e','l','l','o']

DataConverter.strToBool("Yes");
// → true

DataConverter.parseJSON('{"a":1}');
// → { a: 1 }
```

---

### 2️⃣ `HBHChalk`

**Purpose:** Terminal string styling (colors, backgrounds, styles, RGB/Hex).

**Features:**

| Method / Property                                      | Description                      |
| ------------------------------------------------------ | -------------------------------- |
| `red, green, blue…`                                    | Standard ANSI colors             |
| `brightRed, brightGreen…`                              | Bright text colors               |
| `bgRed, bgGreen…`                                      | Background colors                |
| `hex(colorHex)`                                        | 24-bit color by hex (text)       |
| `bgHex(colorHex)`                                      | 24-bit color by hex (background) |
| `rgb(r,g,b)`                                           | Text color using RGB             |
| `bgRgb(r,g,b)`                                         | Background RGB color             |
| `color256(code)`                                       | 256-color text                   |
| `bgColor256(code)`                                     | 256-color background             |
| `bold, italic, underline, dim, inverse, strikethrough` | Text styles                      |
| `error(str)`                                           | Shortcut: `red.bold(str)`        |
| `strip(str)`                                           | Removes all ANSI codes           |
| `preview(str)`                                         | Prints styled string to console  |

**Usage Example:**

```js
HBHChalk.red.bold("Error!");
HBHChalk.hex("#ff8800")("Warning");
HBHChalk.bgRgb(0,128,255)("Hello Background");
HBHChalk.strip("\x1b[31mRed\x1b[0m");
// → "Red"
```

---

### 3️⃣ `HBHString`

**Purpose:** Chainable string utilities for case conversion, trimming, formatting, encoding, and more.

**Key Features:**

| Category                   | Examples                                                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trimming / Whitespace**  | `trim, ltrim, rtrim, collapse`                                                                                                                      |
| **Case Conversion**        | `toUpper, toLower, capitalize, uncapitalize, title, swapCase, alternatingCase`                                                                      |
| **Casing / Naming**        | `toCamelCase, toPascalCase, toSnakeCase, toKebabCase, slugify`                                                                                      |
| **Reversing / Padding**    | `reverse, padStart, padEnd, padBoth, mirror, center`                                                                                                |
| **Filtering / Stripping**  | `removeVowels, removeConsonants, onlyAlpha, onlyNumeric, onlyAlphaNumeric, stripHTML, stripSymbols, stripNonAlpha, stripNonASCII, stripPunctuation` |
| **Encoding / Decoding**    | `base64, unbase64, uriEncode, uriDecode`                                                                                                            |
| **Quotes / Wrapping**      | `quote, singleQuote, parens, brackets, braces, wrap, wrapWith, encloseDouble, encloseSingle`                                                        |
| **Number / Digit**         | `extractDigits, removeDigits, hasNumbers, isNumeric, toNumber`                                                                                      |
| **Fun / Creative**         | `shout, mockingSponge, emojiWrap, binary, hex`                                                                                                      |
| **String Info / Checks**   | `length, wordCount, lineCount, isUpper, isLower, isBlank, startsWithA, endsWithZ, isSlugSafe`                                                       |
| **Custom Suffix / Prefix** | `addPrefix, addSuffix, wrapSlug`                                                                                                                    |
| **Markdown / HTML**        | `markdownBold, markdownItalic, htmlBold, htmlItalic`                                                                                                |

**Usage Example:**

```js
HBHString.toUpper("hello"); 
// → "HELLO"

HBHString.toCamelCase("hello world"); 
// → "helloWorld"

HBHString.removeVowels("beautiful"); 
// → "btfl"

HBHString.slugify("Héllö Wörld!"); 
// → "hello-world"

HBHString.shout("hey"); 
// → "HEY!!!"

HBHString.binary("AB"); 
// → "1000001 1000010"
```

---

These libraries are **fully chainable** thanks to `ProxyBuilder`. Each method can be called directly, or combined in a **pipeline**:

```js
HBHString.toUpper.removeVowels("hello world");
// → "HLL WRLD"

DataConverter.strToArrayByComma.strToInt(["1","2","3"]);
// → [1, 2, 3]
```

---

## 🧠🧬 Internal Design Notes

* All builders are **immutable**
* Each chain returns a **new proxy**
* CSS blocks are accumulated safely
* No DOM or browser dependencies
* Works in Node.js and browsers

---

## 🧪🌍 Compatibility

* Node.js ≥ 14
* Modern browsers with `Proxy` support
* ESM only (`type: module` recommended)

---

## 📄🪪 License

ISC © HBH

---

## ✅📊 Summary

| Feature              | Supported |
| -------------------- | --------- |
| Proxy-based chaining | ✅         |
| CSS-in-JS            | ✅         |
| Media queries        | ✅         |
| Keyframes            | ✅         |
| Vendor prefixes      | ✅         |
| Minification         | ✅         |
| Async pipelines      | ✅         |

```
