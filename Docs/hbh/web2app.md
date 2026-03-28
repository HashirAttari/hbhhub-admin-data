# 📱 HBH-WEB2APP — Convert Any Website / HTML Folder Into Android APK

**HBH-WEB2APP** is a **Node.js-based Android APK generator** that converts any website, local folder, or zip archive into a full Android application — automatically.

✔ No Android Studio
✔ No Gradle knowledge
✔ Runs on Windows, macOS, Linux
✔ Full offline build system
✔ Auto-installs Java + Android SDK
✔ Custom App Name, Package Name, Icons

---

## 🚀 Features

* 🧱 **Generate APK from URL, HTML folder, or ZIP**
* 🎨 **Auto-generate adaptive Android icons** (sharp)
* 🏗 **Full Gradle Build System**
* 🛠 **Automatic Android SDK + Java 17 installer**
* 🗂 **Full asset pipeline**
* 🔄 **Template-based build workflow**
* 📦 **Batch build support**
* ⏱ **Execution time tracker**
* 🧹 **Safe template extraction system**

---

## 📦 Installation

```bash
npm install hbh-web2app
```

Or globally:

```bash
npm install -g hbh-web2app
```

---

## 🛠 Setup Android Build Environment

Before building an APK, run:

### ✔ Check SDK & Java

```bash
npm run check-sdk
```

or

### ✔ Check SDK & Java (manually)

```js
const { CheckSDK } = require("hbh-web2app");

async function verifySDK() {
  const result = await CheckSDK();
  console.log(result);
}

verifySDK();
```

This function will check if your system already has the required:

* OpenJDK 17
* Android SDK command-line tools
* Platform-tools and Build-tools
* Required Android platform

---

### ✔ Install Android SDK + Java (portable — inside your project)

```bash
npm run install-sdk
```

or 
### ✔ Install Android SDK + Java manually

```js
const { InstallSDK } = require("hbh-web2app");

async function setupSDK() {
  await InstallSDK(/*SDK_PATH: optional*/);
  console.log("SDK + Java installed locally!");
}

setupSDK();
```

This installs:

* OpenJDK 17
* Android command-line tools
* Platform-tools
* Build-tools 34.0.0
* Android platform 34

It also automatically sets required environment variables.

---

## 🧪 Example Usage

### **1. Generate one APK**

```js
const { GenerateApp } = require("hbh-web2app");

GenerateApp({
  appName: "HBHGoogle",
  packageName: "hbh.sites.google",
  asset: "https://www.google.com/", // URL OR Folder OR Zip
  appIcon: "https://www.google.com/favicon.ico" // URL OR local_path
});
```

---

### **2. Use Local Folder as App Content**

```js
GenerateApp({
  appName: "LocalSite",
  packageName: "com.local.site",
  asset: "./my-website-folder"
});
```

---

### **3. Use ZIP File as App Content**

```js
GenerateApp({
  appName: "ZippedWebsite",
  packageName: "com.zip.site",
  asset: "./site.zip"
});
```

---

### **4. Build Multiple Apps Automatically**

```js
const { GenerateApps } = require("hbh-web2app");

GenerateApps([
  {
    appName: "AppOne",
    packageName: "com.app.one",
    asset: "https://google.com"
  },
  {
    appName: "AppTwo",
    packageName: "com.app.two",
    asset: "./localfolder"
  }
]);
```

---

## 📁 Output

APK files are generated here:

```
/output/<AppName>/<AppName>.apk
```

Example:

```
output/MyWebApp/MyWebApp.apk
```

---

## 🧬 Project Structure (Internal Overview)

```
app/
 ├─ builder.js          # Main build system
 ├─ helpers/            # logger, unzip, icon generator, etc.
 ├─ tasks/              # assets, build, applyConfig, etc.
 ├─ utils/              # TrackTimeWrapper
 ├─ setupWorkflow.js    # safe extraction + cleanup
 ├─ config.js
checking.js             # SDK checker
installer.js            # SDK & Java installer
index.js                # Main exports
```

---

## ⚙ API – Configuration Options

| Option        | Type   | Description              |
| ------------- | ------ | ------------------------ |
| `appName`     | string | Android app name         |
| `packageName` | string | e.g. `com.example.app`   |
| `asset`       | string | URL, folder, or zip path |
| `appIcon`     | string | PNG/JPEG/WebP image      |

---

## 🎨 Icons

App icons are auto-generated into:

```
mipmap-mdpi
mipmap-hdpi
mipmap-xhdpi
mipmap-xxhdpi
mipmap-xxxhdpi
```

Each converted to:

```
ic_launcher_foreground.webp
```

---

## 🔧 Built-In Commands

| Command               | Description                |
| --------------------- | -------------------------- |
| `npm run check-sdk`   | Check Java + Android SDK   |
| `npm run install-sdk` | Install SDK + Java locally |

---

## 🧑‍💻 Requirements

* Node.js >= 16
* Windows / macOS / Linux
* 4GB free space for SDK install
* Internet (if using URL or installer)

---

## 💬 Author

**HBH**
Creator of HBH-WEB2APP

---

## 📄 License

ISC License
