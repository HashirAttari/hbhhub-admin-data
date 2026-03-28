# 🌀 hbh-cli.s

A **lightweight CLI spinner library** for Node.js featuring **70+ spinners** and customizable animations. Perfect for adding visual feedback in command-line tools or scripts.

---

## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Usage](#usage)

  * [Basic Usage](#basic-usage)
  * [Run a Single Spinner](#run-a-single-spinner)
  * [Run All Spinners](#run-all-spinners)
  * [CLI Interactive Mode](#cli-interactive-mode)
* [API](#api)

  * [`renderSpinnerCLI(conf)`](#renderspinnercliconf)
  * [`startSpinnerByName(name, options)`](#startspinnerbynamename-options)
  * [`runOne(conf)`](#runoneconf)
  * [`runAllSpinnersCLI(interval, duration)`](#runallspinnerscliinterval-duration)
  * [`SpinnerController`](#spinnercontroller)
* [Custom Spinners](#custom-spinners)
* [License](#license)

---

## Installation

Install via npm:

```bash
npm install hbh-cli.s
```

Or using yarn:

```bash
yarn add hbh-cli.s
```

---

## Features

* **70+ prebuilt spinners**: Arrows, Bars, Waves, Rockets, Hearts, Emoji animations, and more.
* **Flexible CLI usage**: Interactive spinner selection or programmatic control.
* **Customizable**: Control interval, duration, and frame events (`render`, `stop`, `play`, `pause`).
* **Looping & smooth animations**: With generator-based frame loops.
* **Lightweight**: No heavy dependencies, minimal footprint.

---

## Usage

### Basic Usage

```js
import { renderSpinnerCLI } from 'hbh-cli.s';

const spinner = renderSpinnerCLI({
  name: 'Rocket', 
  interval: 100,
  events: {
    render: frame => process.stdout.write(`\r${frame} Launching...`),
    stop: () => console.log('\n🚀 Done!'),
  }
});

setTimeout(() => spinner.stop(), 5000); // Stop after 5 seconds
```

---

### Run a Single Spinner

```js
import { runOne } from 'hbh-cli.s';

await runOne({
  name: 'Rocket',
  interval: 80,
  timeout: 5000,
  events: {
    render: f => process.stdout.write(`\r${f} launching...`),
    stop: () => console.log('\n🚀 Liftoff complete!'),
  }
});
```

* `timeout` determines how long the spinner runs (ms).
* `events` allows custom handlers for `render`, `stop`, etc.

---

### Run All Spinners Sequentially

```js
import { runAllSpinnersCLI } from 'hbh-cli.s';

await runAllSpinnersCLI(100, 3000); 
```

* Runs all available spinners one by one in the terminal.
* `interval` sets frame update speed.
* `duration` sets how long each spinner runs.

---

### CLI Interactive Mode

```js
import { CLI } from 'hbh-cli.s';

// Starts an interactive spinner menu
CLI.start;
```

* Lists all available spinners.
* Choose a spinner by **number** or **name**.
* Controls:

  * `[p]` to pause/resume
  * `[q]` to quit

---

## API

### `renderSpinnerCLI(conf)`

Renders a spinner in CLI.

**Parameters:**

```ts
interface SpinnerConfig {
  name?: string;           // Spinner name (default: 'Dots')
  interval?: number;       // Frame interval in ms (default: 100)
  events?: {               // Event callbacks
    render?: (frame) => void,
    stop?: () => void,
    play?: () => void,
    pause?: () => void
  }
}
```

Returns: `SpinnerController` instance.

---

### `startSpinnerByName(name, options)`

Start a spinner programmatically by name.

```js
const spinner = startSpinnerByName('Rocket', { interval: 80 });
spinner.play();
```

---

### `runOne(conf)`

Runs a single spinner asynchronously. See [Run a Single Spinner](#run-a-single-spinner).

---

### `runAllSpinnersCLI(interval, duration)`

Runs **all spinners sequentially** in the CLI. See [Run All Spinners](#run-all-spinners).

---

### `SpinnerController`

Controls a spinner instance programmatically.

```js
const spinner = renderSpinnerCLI({ name: 'Dots' });

spinner.pause();
spinner.play();
spinner.stop();
spinner.restart();
spinner.isPlaying(); // true/false
```

---

## Custom Spinners

You can use your own frame arrays:

```js
import { SpinnerController } from 'hbh-cli.s';

const frames = ['😀','😃','😄','😁'];
const spinner = SpinnerController({
  generatorFn: function* () {
    let i = 0;
    while (true) yield frames[i++ % frames.length];
  },
  interval: 200,
  events: {
    render: f => process.stdout.write(`\r${f} `)
  }
});

spinner.play();
```

Or use `SpinnerGenerator.js`:

```js
import { Generator } from 'hbh-cli.s';

const rocketFrames = Generator.Rocket({ rocket: '🚀', length: 6 });
console.log(rocketFrames);
```

---

## License

[ISC License](LICENSE)
