# 🖌️ HBH Terminal

**Animated terminal text, advanced chalk styling, and dynamic logging for Node.js CLI apps**

`HBH-Terminal` makes your CLI applications more engaging with **color animations**, **typewriter effects**, **gradients**, and **dynamic logs**. Perfect for CLI tools, scripts, or fun terminal outputs!

---

## Table of Contents

1. [Installation](#installation)
2. [Features](#features)
3. [Modules](#modules)
4. [Chalk Utilities](#chalk-utilities)
5. [Animations](#animations)
6. [Typewriter Effects](#typewriter-effects)
7. [HBHConsole](#hbhconsole)
8. [Logger](#logger)
9. [Usage Examples](#usage-examples)

   * Basic Logging
   * Styled Text
   * Animated Text
   * Typewriter Effect
10. [API Reference](#api-reference)
11. [License](#license)

---

## Installation

```bash
npm install hbh-terminal
```

or

```bash
yarn add hbh-terminal
```

---

## Features

✨ **Key Features:**

* 🎨 **Chalk utilities**: Hex, RGB, HSL, gradients, rainbow, blinking, random colors
* 🌈 **Animations**: Hue, RGB, HEX cycling, unified animation mode
* ⌨️ **Typewriter effect** with cursor, loop, and masking options
* 🖥️ **HBHConsole**: dynamic, live-updating logs with formatting options
* 📦 **Logger**: simple & dynamic logging, progress bar support

---

## Modules

`HBH-Terminal` exposes the following modules:

| Module       | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `chalk`      | Full chalk utilities with chainable colors, gradients, and text effects |
| `Animations` | Color animations (`Color.HUE`, `Color.RGB`, `Color.HEX`, `Color.All`)   |
| `Typewriter` | Typewriter text effect                                                  |
| `hbhconsole` | Dynamic logging with live updates and formatting                        |
| `logger`     | Lightweight logger with dynamic mode and progress bar                   |

---

## Chalk Utilities

**Chalk provides chainable text styles, colors, gradients, and effects.**

### Examples

```js
import { chalk } from 'hbh-terminal';

// Basic colors & styles
console.log(chalk.red.bold('🔥 Bold Red'));
console.log(chalk.blue.underline('💧 Underlined Blue'));
console.log(chalk.magenta.italic('💖 Italic Magenta'));

// RGB / HEX / HSL
console.log(chalk.rgb(100, 200, 50)('🌿 Custom RGB'));
console.log(chalk.hex('#ff00ff')('💜 HEX Text'));
console.log(chalk.hsl(200, 100, 50)('💧 HSL Text'));

// Rainbow and gradients
console.log(chalk.rainbow('🌈 Rainbow Text'));
console.log(chalk.bgRainbow('🌈 Background Rainbow'));
console.log(chalk.gradientText('Gradient Text', 'red', 'blue'));
```

### Effects

* `blinking` – text blinks
* `random` – random colors per character
* `bgColorize` – random background per character
* `alterNateColor` – cycle through an array of colors
* `alterNateBG` – cycle through an array of background colors

---

## Animations

**All color animations are under `Animations.Color`**:

```js
Animations.Color = {
  HUE,  // Hue rotation animation
  RGB,  // RGB cycling animation
  HEX,  // HEX cycling animation
  All   // Unified animation with 'hue', 'rgb', 'hex' modes
};
```

### Examples

```js
import { Animations } from 'hbh-terminal';

// Hue animation
Animations.Color.HUE('Hello World 🌈', { step: 10 });

// RGB cycling
Animations.Color.RGB('RGB Cycling!', { step: 20 });

// HEX cycling
Animations.Color.HEX('HEX Mode 💖', { step: 15 });

// Unified animation
Animations.Color.All('Unified Mode ⚡', { mode: 'rgb', step: 12 });
```

### Configuration Options

| Option     | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `callback` | Function to render each frame (default: HBHConsole update) |
| `step`     | Increment of color change (default: 5)                     |
| `sVal`     | Starting color value (default: 0)                          |
| `mode`     | `'hue'`, `'rgb'`, `'hex'` (for `All`)                      |

---

## Typewriter Effects

```js
import { Animations } from 'hbh-terminal';

Animations.Typewriter.typewriter('Typing this text...', {
  speed: 50,
  loop: 3,
  cursor: '|',
  color: 'magenta',
  eraseOnLoop: true
});
```

### Options

| Option                | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `speed`               | Typing speed in milliseconds (default: 80)                 |
| `cursor`              | Cursor character (default: '▌')                            |
| `loop`                | false, number, true, or 'infinite'                         |
| `eraseOnLoop`         | Erase text between loops (default: false)                  |
| `delayBetweenLoops`   | Delay in ms between loops (default: 800)                   |
| `maskChar`            | Masking character like '*'                                 |
| `color`               | Chalk-compatible color                                     |
| `showCursorAfterDone` | Show cursor after typing ends                              |
| `callback`            | Function to render each frame (default: HBHConsole update) |
| `onDone`              | Callback when typing completes                             |

---

## HBHConsole

Dynamic console with **live updates, prefix, suffix, and styling**.

```js
import hbhconsole from 'hbh-terminal';

// Basic logging
hbhconsole.log('Hello world!');
hbhconsole.success('✅ Task completed!');
hbhconsole.warn('⚠️ Warning issued!', { timestamp: true });

// Dynamic update
const logRef = hbhconsole.log('Loading...');
setTimeout(() => logRef.update('Almost done... 🔄'), 2000);

// Clear log
logRef.clear();
```

**Log options**:

* `color` – text color
* `prefix` / `suffix` – optional text
* `timestamp` – add time prefix
* `bold`, `italic`, `underline` – text effects

---

## Logger

Simple yet **dynamic logger** with optional live updates:

```js
import { logger } from 'hbh-terminal';

// Dynamic logs
logger.log('Starting process...');
logger.success('✅ Done!');
logger.warn('⚠️ Check this!');
logger.error('❌ Something went wrong');
logger.simple('Just plain text');

// Progress display
logger.logger.progress(1024, 4096);
```

**Features**:

* Symbols for `log`, `success`, `warn`, `error`, `simple`
* Live terminal updates in dynamic mode
* Progress bar display (`progress(downloaded, total)`)

---

## Usage Examples

### Basic Logging

```js
import { hbhconsole } from 'hbh-terminal';

hbhconsole.log('Hello world!');
hbhconsole.success('✅ Success message');
```

### Styled Text

```js
import { chalk } from 'hbh-terminal';

console.log(chalk.red.bold('Bold Red Text'));
console.log(chalk.rgb(255, 100, 0)('🔥 RGB Styled Text'));
console.log(chalk.gradientText('Gradient Text', 'purple', 'orange'));
```

### Animated Text

```js
import { Animations } from 'hbh-terminal';

Animations.Color.HUE('Hue Rotation 🌈', { step: 10 });
Animations.Color.RGB('RGB Cycling!', { step: 20 });
Animations.Color.HEX('HEX Animation 💖', { step: 15 });
Animations.Color.All('Unified Mode ⚡', { mode: 'hue', step: 12 });
```

### Typewriter Effect

```js
import { Animations } from 'hbh-terminal';

Animations.Typewriter.typewriter('Typing animation...', {
  speed: 60,
  loop: 2,
  color: 'cyan',
  cursor: '|',
  eraseOnLoop: true
});
```

---

## API Reference

### `chalk`

* Chainable colors: `.red`, `.green`, `.hex('#ff00ff')`, `.rgb(r,g,b)`
* Effects: `.bold`, `.italic`, `.underline`, `.blinking`
* Gradients: `.gradientText(text, start, end)`

### `Animations.Color`

* `HUE(text, conf)` – hue rotation
* `RGB(text, conf)` – RGB cycling
* `HEX(text, conf)` – HEX cycling
* `All(text, conf)` – unified mode (`hue`, `rgb`, `hex`)

### `Animations.Typewriter`

* `typewriter(text, conf)` – typewriter effect with options

### `hbhconsole`

* `log()`, `success()`, `warn()`, `error()`, `simple()` – formatted logs
* Live update: `.update(newMessage)`
* Clear: `.clear()`

### `logger`

* `log()`, `success()`, `warn()`, `error()`, `simple()`
* `progress(downloaded, total)` – live progress bar

---

## License

MIT License – Free for personal and commercial use.
