module.exports = (props) => {
  const { slugHelper } = props || {};
  const Layout = { siteName: "HBHLove", requiredSiteName: true, user: false };
  const Sidebar = (() => {
    const returner = [
      {
        items: [
          { icon: '🖼️', label: "Gallery" },
          { icon: '💌', label: "Letters" },
          { icon: '💟', label: "Love-Board" },

          // { icon: '🎲', label: "Flip-Card" },
          // { icon: '🔮', label: "Dark-Flip-Card" },
          // { icon: '💫', label: "Random-Dark-Flip-Card" },
          // { icon: '💍', label: "Proposal-Card" },
          // { icon: '❤️', label: "TapMyHeart" },
          // { icon: '🔮', label: "Eid-Mubarak", new: true },
        ]
      }

    ];
    slugHelper(returner, ((name, label) => {
      return `/${label.toLowerCase()}`;
    }));
    return returner;
  });
  const configs = {
    gridId: "love-grid",
    storageName: "sahiba-favourite", basePath: "",
    heading: "I Love U - Sahiba", heading2: "My Love",
    paragraph: "U are my favourite person.",
  };
  return { Layout, Sidebar, configs };
};
