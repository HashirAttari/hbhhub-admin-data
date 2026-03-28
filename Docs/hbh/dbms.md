# 📦 HBH-DBMS

## Overview
> **HBH-DBMS is a scalable, chunk-based, file-oriented DBMS for Node.js, designed to handle large datasets with safe traversal, deterministic paths, and zero external database dependency.**
> **HBH-DBMS** is not just a DB layer —
> it is a **complete filesystem database ecosystem** designed for **massive scale**, **clean hierarchy**, and **predictable storage**.
A **lightweight, file-based DBMS for Node.js** that manages **JSON data, user files, content, channels, and configurations** without requiring a traditional database (MySQL, MongoDB, etc).
`hbh-dbms` is designed for **backend developers** who want **simple, structured, and scalable file-based storage** with modular services.
**File-Based Database Management System for Node.js**
HBH-DBMS is a **hierarchical, file-based DBMS** designed for Node.js applications where you want:
It is a **structured, chunk-oriented, traversal-safe DBMS** designed to scale to **very large datasets** without filesystem collapse.
HBH-DBMS is a **modern, large-scale, file-based Database Management System** for Node.js, built for developers who want:

* ❌ No MongoDB / MySQL
* ✅ Predictable filesystem storage
* ✅ Predictable file structure
* ✅ Massive scale support
* ✅ Chunk-based directory distribution
* ✅ Lazy folder creation
* ✅ Deterministic paths
* ✅ Clean testing & scripting usage
* ✅ Human-readable JSON storage
* ✅ Full CRUD with hierarchy
* ✅ Easy testing & debugging

> ⚡ This is **NOT** a native JSON-file database.
> HBH-DBMS is engineered for **real-world scale**.


It is especially useful for:

* CMS systems
* SaaS backends
* Content platforms
* Admin panels
* Rapid prototyping

---

## ✨ Features

* 📁 JSON-based database (no external DB required)
* 🧩 Modular & class-based architecture
* 📂 User File Management (UFM)
* 🧠 Content, Channel & Product handling
* ⚙️ Config & Infinite File Management
* 🔍 Advanced content searching & filtering
* 🧹 Safe delete & cleanup utilities
* 🚀 ESM-first (`type: module`)
* 🪶 Lightweight & fast

---

## 🧠 Core Philosophy

HBH-DBMS follows a **strict hierarchy**:

```
User
 └── Product
      └── Channel
           └── Content
```

Each layer:

* Is **owned** by its parent
* Lives inside its parent directory
* Cannot exist independently
* Is managed by a dedicated DB class

This guarantees:

* 🔒 Data integrity
* 🧹 Clean deletes
* ♻️ Easy recovery

---

## 🔥 Key Design Principles (IMPORTANT)

### 1️⃣ Lazy Folder Creation (Very Important)

> ❌ User folder is **NOT created immediately**

Instead:

* User identity is **validated**
* Path is **resolved**
* Folder is created **only when required**
* Prevents:

  * Empty folders
  * Garbage structure
  * Orphaned users

📌 This is why HBH-DBMS scales better than native file DBs.

---

### 2️⃣ Chunk-Based Storage (Large Scale Ready)

To avoid filesystem limits (10k+ folders problem), HBH-DBMS:

* Splits data into **chunks**
* Uses **multi-level nesting**
* Distributes load evenly

Example:

```
Users/
 └── Ae/
     └── Alice@example.com/
```

📌 This prevents:

* Slow directory reads
* OS inode pressure
* FS traversal slowdown

---

### 3️⃣ Deterministic Path Resolution

Every entity path is:

* Derived from its ID
* Deterministic
* Rebuildable at any time

Meaning:

* No central index dependency
* No corruption cascade
* Easy recovery

---

### 4️⃣ Strict Hierarchical Ownership

```
User
 └── Product
      └── Channel
           └── Content
```

Rules:

* ❌ Product cannot exist without User
* ❌ Channel cannot exist without Product
* ❌ Content cannot exist without Channel

This guarantees:

* Data integrity
* Clean deletes
* No orphan files

---

## 📂 Real Folder Structure

```
db/
├── users/
│   ├── U0/
│   │   ├── <user-id>/
│   │   │   ├── .inf -> JSON DATA
│   │   │   ├── <product-id>/
│   │   │   │   ├── .inf -> JSON DATA
│   │   │   │   ├── @<channel-id>/
│   │   │   │   │   ├── content.json
│   │   │   │   │   ├── .inf -> JSON DATA
│   │   │   │   │   └── <content-type>/
```

📌 Chunk folders are **auto-calculated**
📌 This allows **millions of records** without FS degradation

---

## 🧩 Modular Internal Design

Each DB class handles **only its responsibility**:

| Module      | Responsibility              |
| ----------- | --------------------------- |
| `BaseDB`    | Safe FS + JSON ops          |
| `UserDB`    | User resolution & traversal |
| `ProductDB` | Product ownership           |
| `ChannelDB` | Channel capacity & limits   |
| `ContentDB` | Content chunking            |
| `Handle_ID` | ID normalization            |
| `DeleteAll` | Controlled cleanup          |

---

## 🛡️ Safe Traversal Strategy

Every operation follows this flow:

1. Validate input
2. Resolve deterministic path
3. Traverse hierarchy safely
4. Create folder **only if needed**
5. Write JSON atomically

📌 No blind `mkdir -p`
📌 No unsafe recursion
📌 No overwriting without intent

---

## 🚀 Large-Scale Readiness Summary

HBH-DBMS supports:

✅ Millions of users
✅ Millions of contents
✅ Parallel directory growth
✅ Predictable performance
✅ OS-safe FS traversal

Because:

* Chunking ✔
* Lazy creation ✔
* Deterministic paths ✔
* Strict hierarchy ✔

---

## 📥 Installation

```bash
npm install hbh-dbms
```

---

## 🧠 Basic Concept

Instead of using a traditional database, **HBH-DBMS stores data as structured JSON files**, organized by:

* Users
* Products
* Channels
* Content
* Configurations
* Uploaded files

This makes it:

* Easy to debug
* Easy to migrate
* Easy to back up

---

## 📌 Package Entry

```js
import { DBMS, libs } from 'hbh-dbms';
```

---

## 📂 Library Structure

```text
hbh-dbms
├── db/
│   ├── BaseDB.js
│   ├── UserDB.js
│   ├── ProductDB.js
│   ├── ChannelDB.js
│   ├── ContentDB.js
│   ├── UFM.js
│   ├── ConfigManager.js
│   ├── InfFileManager.js
│   ├── DeleteAll.js
│   ├── Handle_ID.js
│   └── ContentFinder/
├── libs/
│   ├── FSHelper.js
│   ├── EmptyDIRRemover.js
│   └── .Helper.js
└── index.js
```

---

## 🧱 `DBMS` Module

```js
import { DBMS } from 'hbh-dbms';
```

⚠️ `DBMS` is **NOT a constructor**
It is a **namespace** that exposes multiple DB classes.

---

### 🧱 Available DB Classes

```js 
DBMS.BaseDB
DBMS.UserDB
DBMS.ProductDB
DBMS.ChannelDB
DBMS.ContentDB
DBMS.BaseDB
DBMS.UserFileManager
```

HBH-DBMS is designed to be used **directly**, just like this:

```js
const userDB = new DBMS.UserDB();
const productDB = new DBMS.ProductDB();
const channelDB = new DBMS.ChannelDB();
const contentDB = new DBMS.ContentDB();
```

This is the **recommended and documented approach**.

---

### 🧱 BaseDB (Internal Engine)

```js
const base = new DBMS.BaseDB("custom/path");
```

Handles:

* Atomic JSON read/write
* Directory integrity
* Traversal protection
* Directory safety
* Atomic updates

⚠️ Normally used **internally** by all DB modules, but exposed for advanced users.

---

### 👤 UserDB

Manage user-related data.

Manages **users as root entities**.

```js
const userDB = new DBMS.UserDB();
```

---

#### ➕ Create User

```js
await userDB.create(
  "Alice@example.com",
  {
    email: "Alice@example.com",
    Info: {
      Author: "Alice",
      password: "12345678"
    }
  }
);
```

📌 What happens internally:

* User directory created `Users/Ae/Alice@example.com/`
* `data.json` written
* Duplicate IDs prevented

---

#### 📄 Read User

```js
const user = await userDB.read("Alice@example.com");
```

---

#### ✏️ Rename User (Update ID)

```js
await userDB.update(
  "Alice@example.com",
  "AliceDemo@gmail.com"
);
```

✔ Renames folder
✔ Keeps all nested data intact

---

#### ✏️ Update User Info

```js
await userDB.updateInfo(
  "AliceDemo@gmail.com",
  {
    id2: 123456,
    password: "1234@Alice"
  }
);
```

✔ Merges data
❌ Does not overwrite existing keys

---

#### ❌ Delete User

```js
await userDB.delete("AliceDemo@example.com");
```

Deletes:

* User
* Products
* Channels
* Content
* Files

---

#### 📃 List Users

```js
const users = await userDB.list();
```

---


### 📦 ProductDB

```js
const productDB = new DBMS.ProductDB('Alice@example.com');
```
Products are **owned by users**.

---

#### ➕ Create Product

```js
await productDB.create("Product1");
```

📁 Path created:

```
/Users/Ae/Alice@example.com/Product1/
```

---

#### 📄 Read Product

```js
await productDB.read("Product1");
```

---

#### ✏️ Rename Product

```js
await productDB.update("Product1","Product2");
```

---

#### ❌ Delete Product

```js
await productDB.delete("Product2");
```

---

#### 📃 List Products

```js
await productDB.list();
```

---

### 📺 ChannelDB

Channels live **inside products**.
Channels can contain content, posts, or media.

```js
const channelDB = new DBMS.ChannelDB('Alice@example.com', 'Product1');
channelDB.Limit = 2;
```

📌 `Limit` controls max channels inside product db.

---

#### ➕ Create Channel

```js
await channelDB.create("Channel1");

```

📁 Path created:

```js
/Users/Ae/Alice@example.com/Product1/Channel1
```

---

#### 📄 Read Channel

```js
await channelDB.read("Channel1");
```

---

#### ✏️ Rename Channel

```js
await channelDB.update("Channel1", "Channel2");
```

---

#### ✏️ Update Channel Info

```js
await channelDB.updateInfo(
  "Channel2",
  { author: "HashirAttari" }
);
```

---

#### 🔍 Find Channel

```js
await channelDB.find("Channel1");
```

---

#### 📃 List Channels

```js
await channelDB.list();
```

---

#### ❌ Delete Channel

```js
await channelDB.delete("Channel2");
```

---

### 📝 ContentDB

Used for all content, including blogs, posts, articles, and videos, in JSON format.
Content exists **inside channels**.

```js
const contentDB = new DBMS.ContentDB(channelDB, 'Channel1');
contentDB.Limit = 2;
```

📌 `Limit` controls max content inside channel db.

---

#### ➕ Create Content

```js
const contentID = await contentDB.create(
  type = "list" | 'tutorial',
  contentName = "First-Content",
  body = ["Hello", "User", "ALice"] | { Name: "Alice", message: 'Hello' }
);
```

📁 Path created:

```js
/Users/Ae/Alice@example.com/Product1/Channel1/${ContentType}/First-Content.json
```


---

#### 📄 Read Content

```js
await contentDB.read(contentID);
```

---

#### ✏️ Update Content Body

```js
await contentDB.updateContent(
  contentID,
  ["Alice", "AliceDemo"]
);
```

---

#### ✏️ Update Content Info

```js
await contentDB.updateInfo(
  contentID,
  {
    tags: ["updated"],
    author: "New Author"
  }
);
```

---

#### ❌ Delete Content

```js
await contentDB.delete(contentID);
```

---

#### 📃 List Content

```js
await contentDB.list({type: 'list' | 'all'});
```

---

#### 🔍 Find Content

```js
await contentDB.find(contentID);
```

---

### 📂 UserFileManager

`UserFileManager` handles **user file operations** inside products, including uploads, downloads, renames, deletes, and recycle bin functionality.

```js
const ufm = new DBMS.UserFileManager("Alice@example.com");
```

📌 Works **per user** and integrates with `UserDB` and `ProductDB`.
📌 Files are **isolated per product** to maintain safety.

---

#### ➕ Create / Upload File

```js
await ufm.upload(req, "Alice@example.com", "Product1", "rename");
```

* Handles **HTTP file uploads** via `formidable`.
* Supports collision modes:

  * `'skip'` → skip if file exists
  * `'overwrite'` → replace existing
  * `'rename'` → auto-rename new file
* Validates **quota** (`maxBytes`) before saving.
* Stores files in:

```
/Users/Ae/Alice@example.com/Product1/<fileName>
```

* Adds metadata and tracks usage in the product’s **config**.

---

#### 📄 Read File

```js
const content = await ufm.readFileContent("Alice@example.com", "Product1", "myfile.txt");
```

* Returns **text content** only (binary files will throw an error).

---

#### ✏️ Update File

```js
await ufm.updateFileContent("Alice@example.com", "Product1", "myfile.txt", "Updated text");
```

* Replaces file content.
* Validates **text content**.
* Updates **usage tracking**.

---

#### ❌ Delete File

```js
await ufm.deleteFile("Alice@example.com", "Product1", "myfile.txt");
```

* Deletes a file.
* Updates **usage** accordingly.

---

#### 📦 Delete All Files in Product

```js
await ufm.deleteAllFiles("Alice@example.com", "Product1");
```

* Deletes all files/folders inside a product.
* Skips **.config folder**.
* Resets **usage** in config.

---

#### 🔀 Rename / Move File

```js
await ufm.renameFile("Alice@example.com", "Product1", "old.txt", "new.txt");
await ufm.moveFile("Alice@example.com", "Product1", "old.txt", "folder/new.txt");
```

* Moves or renames files safely inside product directories.
* Validates **safe paths**.

---

#### 📂 Create Folder

```js
await ufm.createFolder("Alice@example.com", "Product1", "newFolder");
```

* Creates a directory inside a product.

---

#### 🗑 Recycle Bin

* **Move to Bin**:

```js
await ufm.BinFile("Alice@example.com", "Product1", "file.txt");
```

* **Recover File**:

```js
await ufm.RecoverFile("Alice@example.com", "Product1", "file.txt.hbhbin");
```

* **List Trash**:

```js
const trashFiles = await ufm.ListTrash("Alice@example.com", "Product1");
```

* **Empty Trash**:

```js
await ufm.EmptyTrash("Alice@example.com", "Product1");
```

---

#### 📃 List Files / Directories

```js
await ufm.listFlat("Alice@example.com", "Product1"); // flat list
await ufm.listTree("Alice@example.com", "Product1"); // tree structure
await ufm.listDir("Alice@example.com", "Product1");  // directories only
```

* Filters **.config folders** automatically.
* Returns **full metadata** for files in tree/flat listings.

---

#### 📊 Usage Info

```js
const { used, limit } = await ufm.usage("Alice@example.com", "Product1");
```

* `used` → total bytes used
* `limit` → maximum allowed bytes (default `MAX_USER_STORAGE_BYTES`)

---

#### ⚙️ Product Management

```js
await ufm.createProduct("Product1");
await ufm.deleteProduct("Product1");
```

* Creates a product with **initial config**.
* Deletes product safely, including files.

---

## 📦 `db` Module

The `db` object is a **lightweight helper layer** that exposes **HBH-DBMS core classes** through a **simple functional API**.

📌 It does **not** implement new database logic
📌 It is a **shortcut interface** for existing DBMS modules
📌 Ideal for **controllers, routes, CMS systems, and services**

---

### 📌 Import

```js
import { db } from 'hbh-dbms';
```

---

### 🧱 Structure Overview

```js
export const db = {
  user,
  product,
  channel,
  content,
  listall,
  findall,
  cms
};
```

---

### 👤 `db.user()`

Creates a new **UserDB instance**.

```js
const userDB = db.user();
```

🔹 Internally calls: `new UserDB()`
🔹 Used for user CRUD operations and listing

---

### 📦 `db.product(user)`

Creates a **ProductDB instance** scoped to a user.

```js
const productDB = db.product('Alice@example.com');
```

🔹 Internally calls: `new ProductDB(user)`
🔹 Products always belong to a user

---

### 📺 `db.channel(user, product)`

Creates a **ChannelDB instance** under a product.

```js
const channelDB = db.channel('Alice@example.com', 'Product1');
```

🔹 Internally calls: `new ChannelDB(user, product)`
🔹 Channels cannot exist without a product and user

---

### 📝 `db.content(channelInstance, channelName)`

Creates a **ContentDB instance** under a channel.

```js
const contentDB = db.content(channelDB, 'Channel1');
```

🔹 Internally calls: `new ContentDB(channelInstance, channelName)`
🔹 Used for posts, articles, tutorials, media, etc.

---


### 📃 `db.listall` 🔍 `db.findall`

The **`listall`** and **`findall`** modules provide **high-level traversal utilities** for HBH-DBMS.
They are designed to **safely scan the entire filesystem hierarchy** without breaking DBMS rules.

📌 These utilities **do not bypass DBMS**
📌 They **reuse DBMS pagination & limits**
📌 Built for **CMS, admin panels, dashboards, and search systems**

---

#### 📃 `listall`

`listall` is used to **list entities across hierarchy levels** using **safe pagination traversal**.

```js
db.listall
```

##### Available Methods

```js
listall.User
listall.Channel
listall.Content
```

---

##### 👤 `listall.User(options)`

Lists users using paginated traversal.

```js
await listall.User({
  userPage: 1,
  userLimit: 10
});
```

###### Parameters

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| `userPage`  | Number | Page number (example: `1`)     |
| `userLimit` | Number | Users per page (example: `10`) |

###### Response

```js
{
  success: true,
  message: "Users fetched",
  data: [ "alice@example.com", "bob@example.com" ],
  pagination: { userPage: 1, userLimit: 10 }
}
```

###### Notes

* Internally uses `UserDB.list()`
* Safe for large datasets
* No eager filesystem traversal

---

##### 📺 `listall.Channel(options)`

Lists channels **across all users** under a given product.

```js
await listall.Channel({
  productName: "HBH-CMS",
  userPage: 1,
  userLimit: 10,
  channelPage: 1,
  channelLimit: 10
});
```

###### Parameters

| Name           | Description                          |
| -------------- | ------------------------------------ |
| `productName`  | Product scope (example: `"HBH-CMS"`) |
| `userPage`     | User pagination (example: `1`)       |
| `userLimit`    | Users per page (example: `10`)       |
| `channelPage`  | Channel pagination (example: `1`)    |
| `channelLimit` | Channels per page (example: `10`)    |

###### Response

```js
{
  success: true,
  data: {
    "alice@example.com": ["Channel1", "Channel2"],
    "bob@example.com": ["News"]
  }
}
```

###### Notes

* Traverses **User → Product → Channel**
* Channel names are normalized
* Errors per user are safely skipped

---

##### 📝 `listall.Content(options)`

Lists content **across users, channels, and content types**.

```js
await listall.Content({
  productName: "HBH-CMS",
  userPage: 1,
  userLimit: 10,
  channelPage: 1,
  channelLimit: 10,
  contentPage: 1,
  contentLimit: 20
});
```

###### Response

```js
{
  success: true,
  data: {
    "content-id-1": { user: "alice@example.com", channel: "Channel1" },
    "content-id-2": { user: "bob@example.com", channel: "News" }
  }
}
```

###### Notes

* Traverses **entire DB hierarchy**
* Content types are auto-detected
* Designed for CMS indexing

---

#### 🔍 `findall`

`findall` provides **deep search utilities** to locate entities **without knowing their exact path**.

```js
db.findall
```

##### Available Methods

```js
findall.User
findall.Channel
findall.Findchannel
findall.Content
findall.Findcontent
```

---

##### 👤 `findall.User(username)`

Finds a user by ID using paginated scanning.

```js
await findall.User("alice@example.com");
```

###### Behavior

* Scans user pages sequentially
* Stops immediately when found
* Safe for very large datasets

---

##### 📺 `findall.Channel` or `findall.Findchannel` (channelName, options)

Finds a channel across all users under a product.
Uses **ChannelManager** for indexed channel lookup.

```js
await findall.Channel("Channel1", {
  productName: "HBH-CMS"
});
```

###### Response

```js
{
  success: true,
  data: {
    user: "alice@example.com",
    channel: "Channel1"
  }
}
```

###### Notes

* Channel names are normalized
* Stops on first match
* Uses `listall.Channel` internally

---

##### 📝 `findall.Content` or 🆔 `findall.Findcontent` (contentID, options)

Finds a content item anywhere in the DB.
Uses **IDManager** for indexed content lookup.

```js
await findall.Content("content-id-1", {
  productName: "HBH-CMS"
});
```

###### Behavior

* Traverses:

  ```
  User → Product → Channel → Content
  ```
* Auto-advances pagination
* Stops early on match

```js
await findall.Findcontent("content-id-1", { productName: "HBH-CMS" });
```

###### Notes

* Direct ID resolution
* No filesystem scanning
* Most efficient content lookup method

---

#### 🎯 Design Philosophy

✔ No unsafe recursion
✔ Pagination-based traversal
✔ Early-exit search
✔ CMS & admin friendly
✔ Deterministic & recoverable

📌 `listall` = **enumeration**
📌 `findall` = **discovery**

---

### 🧠 `db.cms` – CMS Utilities

A collection of helpers designed for **content-driven and CMS-based systems**.
The **`cms`** module provides **high-level CMS utilities** for HBH-DBMS, focusing on **content fetching, content lookup, and ID handling**. It integrates **multi-threaded scanning**, **pagination-safe traversal**, and **indexed lookup**.

📌 Designed for **CMS, dashboards, and large-scale content processing**.
📌 Supports **product-scoped content fetchers** and **ID-based direct content access**.
📌 Optimized for **multi-threaded content scanning** using workers.

---

#### 🖥️ `fetchcontent` (Product-Specific Content Fetchers)

`fetchcontent` provides **asynchronous content fetching functions per product**. Each function **returns content in paginated chunks**.

```js
db.cms.fetchcontent.HBHCodes
db.cms.fetchcontent.HBHTube
db.cms.fetchcontent.CodeBuddy
```

##### Example Usage

```js
const fetchNext = db.cms.fetchcontent.HBHCodes;

// Fetch next batch of content
const contents = await fetchNext();
console.log(contents);
```

##### Behavior

* Tracks **internal pagination**: userPage, channelPage, contentPage.
* Auto-advances pages when current batch is empty.
* Can resume from a given pagination index:

```js
await fetchNext({ user: 2, channel: 1, content: 5 });
```

* Designed for **CMS batch processing** with large datasets.

---

#### 🔍 `findcontent(targetID, { productName })`

Finds **content by ID** using **indexed IDManager lookup**.

```js
const content = await db.cms.findcontent('content-id-123', { productName: 'CodeBuddy' });
```

##### Response

```js
{
  success: true,
  data: {
    user: "alice@example.com",
    channel: "Channel1",
    content: { ... }
  }
}
```

##### Notes

* Uses `IDManager` for **efficient indexed resolution**.
* Returns `null` if content is not found.
* Avoids filesystem-wide traversal when possible.

---

#### 🔍 `findchannel(targetChannel, { productName })`

Finds **channel info by name** using **ChannelManager**.

```js
const channel = await db.cms.findchannel('Channel1', { productName: 'CodeBuddy' });
```

##### Response

```js
{
  success: true,
  data: {
    user: "alice@example.com",
    channel: "Channel1"
  }
}
```

##### Notes

* Channel names are normalized internally.
* Stops on **first match** for efficiency.
* Uses **listall traversal internally** only if needed.

---

#### 📄 `getcontent({ page, limit, ProductName, username })`

Fetches **content in paginated form** for a given **product and user**.

```js
const pageData = await db.cms.getcontent({
  page: 1,
  limit: 50,
  ProductName: 'CodeBuddy',
  username: 'alice@example.com'
});
```

##### Notes

* **Pagination-safe**: Supports `page` and `limit`.
* Designed for **UI dashboards, CMS listing, and admin views**.

---

#### 🆔 `handleid(ids, ProductName)`

Fetches **content directly via content IDs**. Supports **single ID or array of IDs**.

```js
const result = await db.cms.handleid('D9.x.a.h', 'CodeBuddy');
const batch = await db.cms.handleid(['D9.x.a.h','D9.x.a.$'], 'CodeBuddy');
```

##### Behavior

* Uses **ID-level parsing** to determine hierarchy:

```text
root → user → channel → content
```

* Supports **wildcard `$`** to fetch all content under a channel.
* Throws structured errors via `IDProcessingError` for invalid IDs.
* Returns `success` and `data` fields for matched content.

##### Example Response

```js
{
  success: true,
  data: {
    id: "D9.x.a.h",
    content: { title: "Hello World", ... },
    userName: "alice@example.com",
    channelName: "Channel1"
  }
}
```

---

#### 🛠️ Worker-Based Content Scanning

The **`contentFinder`** function is an **internal multi-threaded utility** for CMS products.

##### Features

* Uses **worker threads** to scan directories concurrently.
* Tracks **total content files** and **progress**.
* Supports **pause/resume events** during scanning.
* Can stop early if a target content ID or channel is found.
* Writes output optionally to JSON for external processing.

##### Parameters

| Option        | Type     | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| `ProductName` | string   | Name of the product to scan                     |
| `find`        | string   | Target content ID(s) to search                  |
| `findChannel` | string   | Target channel name to search                   |
| `OutputDir`   | string   | Directory to store output JSON                  |
| `WantOutput`  | boolean  | If `true`, writes results to file               |
| `logs`        | boolean  | If `true`, logs progress info                   |
| `onProgress`  | function | Callback on partial results or progress updates |

##### Example Usage

```js
await contentFinder({
  ProductName: 'CodeBuddy',
  WantOutput: true,
  find: 'D9.x.a.h',
  logs: true,
  onProgress: (data) => console.log('Progress:', data)
});
```

---

#### 🧭 Design Philosophy

✔ Product-scoped fetchers (`fetchcontent`) for CMS batch operations
✔ Direct content lookup (`findcontent`, `handleid`) using **indexed resolution**
✔ Worker-based multi-threaded scanning for **large-scale content directories**
✔ Safe **pagination-based traversal**, avoids full filesystem blocking
✔ Deterministic and recoverable: all fetches and searches are **repeatable**

---

If you want, I can now **generate a full “CMS Reference” document** with **methods, parameters, examples, and detailed worker explanations in markdown** just like the `listall/findall` documentation you shared. It would be **ready for your docs site**.

Do you want me to do that next?

---

### 🎯 Why This `db` Wrapper Exists

* ✔ Cleaner imports
* ✔ Functional API style
* ✔ Controller-friendly
* ✔ No tight class coupling
* ✔ Same DBMS power with less boilerplate

---

## ⚠️ Error Handling

* All methods throw `Error`
* No silent failures
* File corruption prevented

```js
try {
  await userDB.create("", {});
} catch (e) {
  console.error(e.message);
}
```

---

## 🚀 Why Use HBH-DBMS?

* ✔ CMS
* ✔ SaaS backends
* ✔ Admin systems
* ✔ Easy to deploy
* ✔ No database setup
* ✔ Fully customizable
* ✔ Debug-first systems
* ✔ File-based backends
* ✔ Offline-friendly apps
* ✔ Ideal for CMS, admin panels, APIs
* ✔ Perfect for small-to-medium projects

---

## ❌ When NOT to Use

* ❌ Very high-traffic apps
* ❌ Heavy concurrent writes
* ❌ Complex relational queries
* ❌ Financial or banking systems

---

## 📜 License

ISC License © HBH

---

## 👨‍💻 Author

**HBH / HashirAttari**
Built with ❤️ for Node.js developers

