module.exports = (props) => {
  const { slugHelper } = props || {};
  const Layout = { siteName: "HBHTools" };
  const Sidebar = ((LucideIcons) => {
    const returner = [
      {
        name: "Calculator",
        items: [
          { icon: '🧮', label: "Calculator", href: 'calculator' },
          { icon: '📊', label: "Marks Calculator", href: 'marks-calculator' },
          { icon: '🔐', label: "CHMOD Calculator", href: 'chmod-calculator', description: `<p>The <strong>CHMOD Calculator</strong> helps you easily set file permissions for Owner, Group, and Public using checkboxes for Read, Write, and Execute permissions. It automatically calculates and shows the numeric (e.g., <code>755</code>) and symbolic (e.g., <code>rwxr-xr-x</code>) permission strings used in Unix/Linux systems. You can then copy the generated <code>chmod</code> command to use in your terminal.</p>` },
          { icon: '🎂', label: "Age Calculator", href: 'age-calculator', createdDate: "2026-09-19" },
        ],
      }, {
        name: "Converter",
        items: [
          { icon: '📏', label: "Math Unit Converter", href: 'math-unit-converter' },
          { icon: '📐', label: "Inch System Converter", href: 'inch-system-converter' },
          { icon: '📏', label: "Meter System Converter", href: 'meter-system-converter' },
          { icon: '🔄', label: "Inch<->Meter System Converter", href: 'inch-meter-system-converter' },
          { icon: '💾', label: "Memory Unit Converter", href: 'memory-unit-converter' },
          { icon: '⏱️', label: "Time Unit Converter", href: 'time-unit-converter' },
          { icon: '🎨', label: "Color Converter", href: 'color-converter', createdDate: "2026-09-19" },
          { icon: '🕐', label: "Timestamp Converter", href: 'timestamp-converter', createdDate: "2026-09-19" },
        ],
      }, {
        name: "Generator",
        items: [
          { icon: '📝', label: "Lorem Generator", href: 'lorem-generator' },
          { icon: '🤖', label: "Text to Image Generator", href: 'text-to-image' },
          { icon: '🔳', label: "QR Code Generator", href: 'qr-code-generator', createdDate: "2026-09-19" },
        ],
      }, {
        name: "Crypto",
        items: [
          { icon: '🎟️', label: "Token Generator", href: 'token-generator' },
          { icon: '🔑', label: "Password Generator", href: 'password-generator' },
          { icon: '#️⃣', label: "Hash Text Generator", href: 'hash-text-generator' },
          { icon: '🔐', label: "Password Strength Checker", href: 'password-strength-checker', createdDate: "2026-09-19" },
        ],
      }, {
        name: "Testing",
        items: [
          { icon: '⌨️', label: "KeyBoard Checker", href: 'keyboard-checker' },
          { icon: '🔎', label: "Regex Tester", href: 'regex-tester', createdDate: "2026-09-19" },
        ],
      }, {
        name: "CSSTools",
        items: [
          { icon: '🎨', label: "CSS Color Generator", href: 'css-color-generator' },
          { icon: '🌈', label: "Random CSS Color Generator", href: 'random-css-color-generator' },
        ],
      }, {
        name: "Timer",
        items: [
          { icon: '⏳', label: "Countdown Timer", href: 'countdown-timer', createdDate: "2026-09-19" },
          { icon: '⏱️', label: "Stopwatch", href: 'stopwatch', createdDate: "2026-09-19" },
        ],
      }, {
        name: "ImageTools",
        items: [
          { icon: '🖼️', label: "Image Compressor", href: 'image-compressor', createdDate: "2026-09-19" },
          { icon: '📄', label: "Image to PDF", href: 'image-to-pdf', createdDate: "2026-09-19" },
        ],
      }, {
        name: "PDFTools",
        items: [
          { icon: '🗜️', label: "PDF Compressor", href: 'pdf-compressor', createdDate: "2026-09-19" },
          { icon: '📑', label: "PDF Merger", href: 'pdf-merger', createdDate: "2026-09-19" },
        ],
      }, {
        name: "DeveloperTools",
        items: [
          { icon: '🧾', label: "JSON Formatter", href: 'json-formatter', createdDate: "2026-09-19" },
          { icon: '📊', label: "Table Generator", href: 'table-generator', createdDate: "2026-09-19" },
          { icon: '📝', label: "Markdown Previewer", href: 'markdown-previewer', createdDate: "2026-09-19" },
        ],
      },
    ];
    const returner1 = [
      {
        name: "Created",
        items: [
          { icon: LucideIcons.Calculator, label: "Calculator", href: '/calculator' },
          { icon: LucideIcons.Shuffle, label: "Unit Converter", href: '/unit-converter' },
          { icon: LucideIcons.Ruler, label: "Inch System Converter", href: '/inch-system-converter' },
          { icon: LucideIcons.Ruler, label: "Meter System Converter", href: '/meter-system-converter' },
          { icon: LucideIcons.Ruler, label: "Inch<->Meter System Converter", href: '/inch-meter-system-converter' },
          { icon: LucideIcons.Database, label: "Memory Converter", href: '/memory-converter' },
          { icon: LucideIcons.Clock, label: "Time Converter", href: '/time-converter' },
          { icon: LucideIcons.Lock, label: "CHMOD Generator", href: 'chmod-generator', description: `<p>The <strong>CHMOD Calculator</strong> helps you easily set file permissions for Owner, Group, and Public using checkboxes for Read, Write, and Execute permissions. It automatically calculates and shows the numeric (e.g., <code>755</code>) and symbolic (e.g., <code>rwxr-xr-x</code>) permission strings used in Unix/Linux systems. You can then copy the generated <code>chmod</code> command to use in your terminal.</p>` },
          { icon: LucideIcons.Text, label: "Lorem Generator", href: 'lorem-generator' },
        ],
      },
      {
        name: "Converter",
        items: [
          { icon: LucideIcons.Replace, label: "Base64" },
          { icon: LucideIcons.Replace, label: "Hex" },
          { icon: LucideIcons.Binary, label: "Binary" },
          { icon: LucideIcons.Hash, label: "Decimal" },
          { icon: LucideIcons.Hash, label: "Octal" },
          { icon: LucideIcons.Type, label: "Roman Numerals" },
        ],
      },
      {
        name: "Crypto",
        items: [
          { icon: LucideIcons.KeyRound, label: "Hash" },
          { icon: LucideIcons.Link, label: "Base64" },
          { icon: LucideIcons.Hash, label: "Hex" },
          { icon: LucideIcons.Fingerprint, label: "MD5" },
          { icon: LucideIcons.Fingerprint, label: "SHA1" },
          { icon: LucideIcons.Fingerprint, label: "SHA256" },
          { icon: LucideIcons.Fingerprint, label: "SHA512" },
        ],
      },
      {
        name: "WEB",
        items: [
          { icon: LucideIcons.Globe, label: "URL Encoder/Decoder" },
          { icon: LucideIcons.Code, label: "HTML Encoder/Decoder" },
          { icon: LucideIcons.Braces, label: "CSS Encoder/Decoder" },
          { icon: LucideIcons.Code, label: "JavaScript Encoder/Decoder" },
        ],
      },
      {
        name: "Images & Videos",
        slug: "Images_Videos",
        items: [
          { icon: LucideIcons.Image, label: "Image Resizer" },
          { icon: LucideIcons.ImagePlus, label: "Image Converter" },
          { icon: LucideIcons.Video, label: "Video Converter" },
        ],
      },
      {
        name: "Development",
        items: [
          { icon: LucideIcons.Code, label: "Code Formatter" },
          { icon: LucideIcons.AlignHorizontalJustifyCenter, label: "Code Beautifier" },
          { icon: LucideIcons.Crop, label: "Code Minifier" },
        ],
      },
      {
        name: "Network",
        items: [
          { icon: LucideIcons.Globe, label: "IP Address Lookup" },
          { icon: LucideIcons.ServerCog, label: "DNS Lookup" },
          { icon: LucideIcons.Activity, label: "Ping" },
          { icon: LucideIcons.Navigation, label: "Traceroute" },
        ],
      },
      {
        name: "Math",
        items: [
          { icon: LucideIcons.Calculator, label: "Calculator" },
          { icon: LucideIcons.Sigma, label: "Unit Converter" },
          { icon: LucideIcons.DollarSign, label: "Currency Converter" },
        ],
      },
      {
        name: "Measurement",
        items: [
          { icon: LucideIcons.Ruler, label: "Length Converter" },
          { icon: LucideIcons.Weight, label: "Weight Converter" },
          { icon: LucideIcons.Thermometer, label: "Temperature Converter" },
        ],
      },
      {
        name: "Data",
        items: [
          { icon: LucideIcons.FileText, label: "JSON Formatter" },
          { icon: LucideIcons.FileText, label: "XML Formatter" },
          { icon: LucideIcons.FileText, label: "CSV Formatter" },
          { icon: LucideIcons.FileText, label: "YAML Formatter" },
          { icon: LucideIcons.FileText, label: "HTML Formatter" },
          { icon: LucideIcons.FileText, label: "Markdown Formatter" },
          { icon: LucideIcons.FileText, label: "INI Formatter" },
          { icon: LucideIcons.FileText, label: "TOML Formatter" },
          { icon: LucideIcons.FileText, label: "Properties Formatter" },
          { icon: LucideIcons.FileText, label: "Text Formatter" },
          { icon: LucideIcons.TextCursorInput, label: "Text Analyzer" },
          { icon: LucideIcons.ListChecks, label: "Text Comparison" },
        ],
      },
      {
        name: "Text",
        items: [
          { icon: LucideIcons.Text, label: "Text Formatter" },
          { icon: LucideIcons.TextCursorInput, label: "Text Analyzer" },
          { icon: LucideIcons.ListChecks, label: "Text Comparison" },
        ],
      },
      {
        name: "Text to Speech",
        slug: "Text",
        items: [
          { icon: LucideIcons.Mic, label: "Text to Speech" },
          { icon: LucideIcons.Mic, label: "Speech to Text" },
          { icon: LucideIcons.Languages, label: "Language Translator" },
        ],
      },
      {
        slug: "Text",
        name: "Text to Image",
        items: [
          { icon: LucideIcons.Image, label: "Text to Image" },
          { icon: LucideIcons.Image, label: "Image to Text" },
          { icon: LucideIcons.Video, label: "Image to Video" },
        ],
      },
      {
        slug: 'Text',
        name: "Text to Video",
        items: [
          { icon: LucideIcons.Video, label: "Text to Video" },
          { icon: LucideIcons.TextCursorInput, label: "Video to Text" },
          { icon: LucideIcons.Image, label: "Video to Image" },
        ],
      },
      {
        slug: 'Text',
        name: "Text to Audio",
        items: [
          { icon: LucideIcons.Volume2, label: "Text to Audio" },
          { icon: LucideIcons.Volume2, label: "Audio to Text" },
          { icon: LucideIcons.Video, label: "Audio to Video" },
        ],
      },
      {
        slug: 'Text',
        name: "Text to PDF",
        items: [
          { icon: LucideIcons.FileText, label: "Text to PDF" },
          { icon: LucideIcons.FileText, label: "PDF to Text" },
          { icon: LucideIcons.FileText, label: "PDF to Image" },
        ],
      },
    ];
    slugHelper(returner, ((name, label) => {
      return `/tools/?type=${name}&name${label}`;
      // return `/${name}`;
    }));
    return returner;
  });
  const configs = {
    heading: "Welcome to HBHTools", heading2: "Our Tools",
    gridId: "tools-grid", storageName: "hbhtools-favourite", basePath: "/",
    paragraph: "Explore all available tools in one place — simple, fast, and useful.",
  };
  return { Layout, Sidebar, configs };
};
