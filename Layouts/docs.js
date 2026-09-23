module.exports = (props) => {
  const { slugHelper } = props || {};
  const Layout = { siteName: "HBHDocs" };
  const Sidebar = ((LucideIcons) => {
    const returner = [
      {
        name: "HBH-NPM",
        items: [
          { icon: '🧩', label: "HBH-CCL" },
          { icon: '🌀', label: "HBH-CLI.S" },
          { icon: '📦', label: "HBH-DBMS" },
          { icon: '⚡', label: "HBH-DER" },
          { icon: '🚀', label: "HBH-DEVE" },
          { icon: '🗂️', label: "HBH-FS" },
          { icon: '♻️', label: "HBH-LogRotator" },
          { icon: '🌟', label: "HBH-Nodes" },
          { icon: '🪝', label: "HBH-Proxies" },
          { icon: '🏗️', label: "HBH-PSM" },
          { icon: '🖌️📟', label: "HBH-Terminal" },
          { icon_concept: '💻➡️📱', icon: '🌐➡️📱', label: "HBH-Web2App" },
        ],
      },
    ];
    slugHelper(returner, ((name, label) => { return `/${label.toLowerCase()}`; }));
    return returner;
  });
  const configs = {
    storageName: "hbhdocs-favourite", basePath: "",
    heading: "Welcome to HBHDocs", heading2: "Our Documentations",
  };
  return { Layout, Sidebar, configs };
};