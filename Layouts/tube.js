module.exports = (props) => {
  const { slugHelper } = props || {};
  const Layout = { siteName: "HBHTube" };
  const Sidebar = ((LucideIcons) => {
    // return [];
    const returner = [{ items: [{ label: "Content-Testing", href: '/content/testing' }] }];
    // slugHelper(returner, ((name, label) => { return `/${name}`; }));
    return returner;
  });
  return { Layout, Sidebar };
};
