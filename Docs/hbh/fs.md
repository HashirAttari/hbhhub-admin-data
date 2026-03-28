# `hbh-fs`

A lightweight, modern **Node.js filesystem utility** package providing a set of convenient functions for working with files and directories. Includes recursive operations, JSON helpers, and flexible directory listings.

---

## Installation

```bash
npm install hbh-fs
```

or using Yarn:

```bash
yarn add hbh-fs
```

---

## Importing

```js
// ES Modules
import { FSHelper } from 'hbh-fs';

// CommonJS
const { FSHelper } = require('hbh-fs');
```

---

## API Overview

### 1. Directory Operations

#### `FSHelper.createFolder(folderPath)`

Creates a folder (including parent directories if needed).

```js
await FSHelper.createFolder('./myFolder');
```

**Returns:**

```js
{ success: boolean, message: string, path: string }
```

---

#### `FSHelper.deleteFolder(folderPath)`

Deletes a folder recursively.

```js
await FSHelper.deleteFolder('./myFolder');
```

**Returns:**

```js
{ success: boolean, message: string, path: string }
```

---

#### `FSHelper.moveFolder(oldPath, newPath)`

Moves or renames a folder.

```js
await FSHelper.moveFolder('./oldFolder', './newFolder');
```

**Returns:**

```js
{ success: boolean, message: string, from: string, to: string }
```

---

#### `FSHelper.deleteEmptyDirs(dir, options)`

Recursively deletes empty directories.

**Options:**

* `verbose` (boolean) – log actions
* `dryRun` (boolean) – simulate deletions
* `maxDepth` (number) – maximum recursion depth
* `exclude` (string[]) – directory names to skip
* `excludeRegex` (RegExp[]) – regex patterns to skip

```js
await FSHelper.deleteEmptyDirs('.', { dryRun: true, verbose: true });
```

---

### 2. Path & Existence Checks

* `FSHelper.pathExists(path)` – returns `true` if a path exists.
* `FSHelper.fileExists(filePath)` – structured response if file exists.
* `FSHelper.folderExists(folderPath)` – structured response if folder exists.
* `FSHelper.isExist` – alias for `folderExists`.

---

### 3. JSON Utilities

#### `FSHelper.writeJSON(filePath, data)`

Writes a JavaScript object to a JSON file.

```js
await FSHelper.writeJSON('./data.json', { hello: 'world' });
```

#### `FSHelper.readJSON(filePath)`

Reads a JSON file into a JavaScript object.

```js
const result = await FSHelper.readJSON('./data.json');
console.log(result.data);
```

**Returns:**

```js
{ success: boolean, message: string, data?: any, path: string }
```

---

### 4. Directory Listing & Walkers

#### `FSHelper.List.flat(dir, baseDir)`

Recursively lists files and directories in a flat structure.

```js
const files = await FSHelper.List.flat('.', '.');
```

**Output:**

```js
[{ type: 'file'|'directory', name: 'relative/path', size?: number }]
```

---

#### `FSHelper.List.tree(dir)`

Recursively lists files and directories as a tree structure.

```js
const tree = await FSHelper.List.tree('.');
```

**Output:**

```js
{
  folder1: { file1: 'file', subfolder: { file2: 'file' } },
  file3: 'file'
}
```

---

#### `FSHelper.List.directories(dir)`

Lists immediate directory contents (non-recursive).

```js
const dirs = await FSHelper.List.directories('.');
```

**Output:**

```js
[{ name: 'folder1', type: 'directory' }, { name: 'file.txt', type: 'file' }]
```

---

### 5. Exclusion Utilities

* `FSHelper.exclude.add(matcher)` – add a string, regex, or function to globally exclude files/folders.
* `FSHelper.exclude.should(name)` – checks if a file/folder should be excluded.

```js
FSHelper.exclude.add(/^_/); // exclude all names starting with "_"
```

---

### 6. Utility Functions

* `FSHelper.getDirectories(dirPath, options)` – returns a list of directories, with optional filtering and sorting.
* Flexible filtering using regex, strings, or custom functions.

---

### 7. Text Replacement Utility

Recursively replaces multiple patterns in all files within a directory.

**Parameters:**

| Parameter      | Type                                         | Description                                      |
| -------------- | -------------------------------------------- | ------------------------------------------------ |
| `dir`          | `string`                                     | Root directory to start replacements             |
| `replacements` | `Array<{ value: string, replaced: string }>` | Array of replacement objects `{value, replaced}` |

**Example Usage:**

```js
import { FSHelper } from 'hbh-fs';

(async () => {
  // Replace text in all files recursively
  await FSHelper.replaceInFiles('./myFolder', [
    { value: 'World', replaced: 'Universe' },
    { value: 'hello', replaced: 'hi' }
  ]);

  console.log('✅ Text replacement complete!');
})();
```

**Behavior:**

1. Traverses all subdirectories recursively.
2. Reads each file as UTF-8 text.
3. Replaces all occurrences of `value` with `replaced`.
4. Writes the updated content back to the file.

---

## Example Usage

```js
import { FSHelper } from 'hbh-fs';

(async () => {
  // Create a folder
  console.log(await FSHelper.createFolder('./myFolder'));

  // Write JSON
  await FSHelper.writeJSON('./myFolder/data.json', { hello: 'world' });

  // List files recursively
  const files = await FSHelper.List.flat('./myFolder', './myFolder');
  console.log(files);

  // Delete empty folders (dry run)
  await FSHelper.deleteEmptyDirs('./myFolder', { dryRun: true, verbose: true });
})();
```

---

## Features

* Modern `async/await` API using `fs/promises`.
* Recursive directory deletion and traversal.
* Flexible JSON read/write helpers.
* Exclusion system (string, regex, function).
* Simple, flat, and tree directory listings.
* Fully type-safe responses for existence checks and operations.

---

## License

`ISC` – Free for personal and commercial use.
