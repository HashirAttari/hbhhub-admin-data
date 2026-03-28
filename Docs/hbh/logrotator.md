# ♻️ hbh-logrotator

A lightweight, extensible **JSON log rotation library for Node.js**.
Designed for high-volume logging with **automatic file rotation**, **flat JSON logs**, or **grouped JSON logs**.

---

## ✨ Features

* 🔁 **Automatic log rotation**

  * Rotate by **max number of entries**
  * Rotate by **time interval**
* 📄 **Flat JSON logging**

  * Logs stored as a JSON array
* 🧩 **Grouped JSON logging**

  * Logs grouped by event type or custom key
* ⚙️ **Extensible base class**

  * Create custom log formats easily
* 🚀 **Zero dependencies**
* 🧠 Efficient streaming using `fs.createWriteStream`

---

## 📥 Installation

```bash
npm install hbh-logrotator
```

---

## 📌 Exports

```js
import { FlatJSON, GroupedJSON, Base } from 'hbh-logrotator';
```

| Export        | Description                      |
| ------------- | -------------------------------- |
| `FlatJSON`    | Writes logs as a flat JSON array |
| `GroupedJSON` | Groups logs by an event key      |
| `Base`        | Base class for custom rotators   |

---

## 🛠️ Usage

### 1️⃣ Flat JSON Logger

Logs entries as a JSON array:

```json
[
  { "event": "login", "user": "alice" },
  { "event": "logout", "user": "bob" }
]
```

#### Example

```js
import { FlatJSON } from 'hbh-logrotator';

const logger = new FlatJSON('./logs', {
  maxEntries: 3
});

logger.write({ event: 'login', user: 'alice' });
logger.write({ event: 'logout', user: 'bob' });
logger.write({ event: 'login', user: 'charlie' });
```

➡️ Automatically rotates after 3 entries.

---

### 2️⃣ Grouped JSON Logger

Groups logs by `event` (or a custom key):

```json
{
  "login": [
    { "event": "login", "user": "alice" }
  ],
  "logout": [
    { "event": "logout", "user": "bob" }
  ]
}
```

#### Example

```js
import { GroupedJSON } from 'hbh-logrotator';

const logger = new GroupedJSON('./logs', {
  maxEntries: 5,
  eventKey: 'event'
});

logger.write({ event: 'login', user: 'alice' });
logger.write({ event: 'logout', user: 'bob' });
```

---

## ⚙️ Configuration Options

| Option               | Type             | Default   | Description                             |
| -------------------- | ---------------- | --------- | --------------------------------------- |
| `maxEntries`         | `number`         | `1000`    | Rotate file after this many log entries |
| `rotationIntervalMs` | `number \| null` | `null`    | Rotate file after time interval (ms)    |
| `eventKey`           | `string`         | `'event'` | Key used for grouping logs              |

---

## 🔁 Rotation Logic

A new log file is created when **either** condition is met:

* `currentEntries >= maxEntries`
* `Date.now() - lastRotationTime >= rotationIntervalMs`

Files are named automatically:

```text
log_0.json
log_1.json
log_2.json
...
```

---

## 🧱 BaseLogRotator (Advanced Usage)

You can extend the base class to create **custom log formats**.

```js
import { Base } from 'hbh-logrotator';

class CustomRotator extends Base {
  initFile() {
    this.currentStream.write('START\n');
  }

  handleEntry(entry) {
    this.currentStream.write(entry.message + '\n');
  }

  finalizeFile() {
    this.currentStream.write('END\n');
  }
}
```

---

## 🧹 Graceful Shutdown

Call `flush()` before exiting your app:

```js
await logger.flush();
```

Ensures:

* JSON is closed properly
* File streams are safely ended

---

## 📂 Output Guarantees

| Logger      | Output Format | Valid JSON |
| ----------- | ------------- | ---------- |
| FlatJSON    | JSON Array    | ✅          |
| GroupedJSON | JSON Object   | ✅          |

---

## 🧪 Use Cases

* API request logging
* Event tracking
* Audit logs
* Background jobs
* Serverless environments
* Data pipelines

---

## 📜 License

ISC License © HBH

---

* Node.js log rotation
* JSON logging
* Log file rotation
* Structured logging
* Event-based logging
* Lightweight logger
* File-based logging
