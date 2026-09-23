module.exports = (props) => {
  const Layout = { siteName: "Dashboard" };
  const Sidebar = ((LucideIcons, { websiteBase } = {}) => {
    return [{
      items: [
        { label: "Revalidate", href: '/revalidate', icon: "⚡", description: "Quickly refresh cached data" }
      ]
    }];
  });
  return { Layout, Sidebar };
};
