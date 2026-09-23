module.exports = (props) => {
  const { slugHelper, urlFormatter } = props || {};
  const subdomains_ = {
    blog: { name: "Blog", description: "Latest news, tutorials, and updates.", icon: "📰", accent: "primary", },
    shop: { name: "Shop", description: "Buy official merch and exclusive items.", icon: "🛍️", accent: "secondary", },
    support: { name: "Support", description: "Get help, FAQs, and contact support.", icon: "💬", accent: "accent", },
    community: { name: "Community", description: "Join discussions with other users.", icon: "🌐", accent: "muted", },
    news: { name: "News", description: "Breaking news and updates from around the world.", icon: "🗞️", accent: "sky", },
    fashion: { name: "Fashion", description: "Latest trends and style guides.", icon: "👗", accent: "rose", },
    design: { name: "Design", description: "Creative projects and inspiration.", icon: "🎨", accent: "fuchsia", },
    tech: { name: "Tech", description: "Gadgets, apps, and technology news.", icon: "💻", accent: "violet", },
    education: { name: "Education", description: "Learning resources and tutorials.", icon: "📚", accent: "indigo", },
    music: { name: "Music", description: "Songs, albums, and playlists.", icon: "🎵", accent: "purple", },
    games: { name: "Games", description: "Play, review, and discuss games.", icon: "🎮", accent: "pink", },
    travel: { name: "Travel", description: "Destinations, guides, and tips.", icon: "✈️", accent: "amber", },
    food: { name: "Food", description: "Recipes, restaurants, and reviews.", icon: "🍔", accent: "orange", },
    health: { name: "Health", description: "Fitness, wellness, and advice.", icon: "💊", accent: "lime", },
    finance: { name: "Finance", description: "Investing, savings, and money tips.", icon: "💰", accent: "green", },
    sports: { name: "Sports", description: "Scores, news, and highlights.", icon: "🏀", accent: "teal", },
    movies: { name: "Movies", description: "Reviews, trailers, and news.", icon: "🎬", accent: "cyan", },
    books: { name: "Books", description: "Reviews and recommendations.", icon: "📖", accent: "sky2", },
    photography: { name: "Photography", description: "Photos, tips, and gear.", icon: "📸", accent: "blue2", },
    science: { name: "Science", description: "Discoveries and research.", icon: "🔬", accent: "indigo2", },
    nature: { name: "Nature", description: "Wildlife and environment.", icon: "🌿", accent: "violet2", },
    culture: { name: "Culture", description: "Arts, traditions, and heritage.", icon: "🏛️", accent: "purple2", },
    community2: { name: "Community2", description: "Discussion forums and groups.", icon: "🗣️", accent: "fuchsia2", },
    events: { name: "Events", description: "Upcoming events and meetups.", icon: "📅", accent: "pink2", },
    marketing: { name: "Marketing", description: "Tips and case studies.", icon: "📈", accent: "rose2", },
    startup: { name: "Startup", description: "Entrepreneurship tips and stories.", icon: "🚀", accent: "red", },
    coding: { name: "Coding", description: "Programming guides and tutorials.", icon: "💻", accent: "orange2", },
    ai: { name: "AI", description: "Artificial intelligence news and research.", icon: "🤖", accent: "amber2", },
    crypto: { name: "Crypto", description: "Blockchain and cryptocurrency updates.", icon: "💎", accent: "yellow", },
    environment: { name: "Environment", description: "Sustainability and climate news.", icon: "🌎", accent: "lime2", },
    policy: { name: "Policy", description: "Government, regulations, and laws.", icon: "⚖️", accent: "green2", },
    wellness: { name: "Wellness", description: "Mental health and lifestyle tips.", icon: "🧘", accent: "teal2", },
    photography2: { name: "Photography2", description: "Advanced photography topics.", icon: "📷", accent: "cyan2", },
    fitness: { name: "Fitness", description: "Exercise routines and advice.", icon: "🏋️", accent: "sky3", },
    history: { name: "History", description: "Events from the past and analysis.", icon: "🏺", accent: "blue3", },
    language: { name: "Language", description: "Learning languages and linguistics.", icon: "🗣️", accent: "indigo3", },
    literature: { name: "Literature", description: "Classic and modern works.", icon: "📖", accent: "violet3", },
    photography3: { name: "Photography3", description: "Portrait and landscape tips.", icon: "📸", accent: "purple3", },
    gaming: { name: "Gaming", description: "Community, news, and tournaments.", icon: "🎮", accent: "pink3", },
    arts: { name: "Arts", description: "Painting, sculpture, and more.", icon: "🎨", accent: "rose3", },
    technology: { name: "Technology", description: "Emerging tech and innovation.", icon: "💡", accent: "gray", },
  };
  const Layout = { siteName: "HBHHUB" };
  const subdomains = {
    tools: { name: "Tools", description: "Useful utilities and applications.", icon: "🛠️", accent: "cyan3" },
    docs: { name: "Docs", description: "Documentation, guides, and references.", icon: "📚", accent: "blue3" },
    tube: { name: "Tube", description: "Videos, coding, live previews, and creative tools in one place.", icon: "📺", accent: "red3" },
    'whatsapp-chat-viewer': { name: 'WhatsApp Chat Viewer', sHref: 'whatsapp-chat-viewer', "description": "Easily view and read your exported WhatsApp chats.", icon: "💬" }
  }
  const converter = (data) => Object.keys(data).map(n => ({ label: data[n].name, ...data[n] }));
  const Sidebar = ((LucideIcons, { websiteBase } = {}) => {
    if (typeof websiteBase === 'object') {
      const returner = converter(subdomains).map((o) => ({ items: [o] }));
      slugHelper(returner, ((name, label) => { return urlFormatter(websiteBase, label); }));
      return returner
    }
    return [];
  });
  const configs = {
    basePath: '', storageName: 'hbhhub-favourite',
    heading: "Welcome to HBH-HUB", heading2: "Our Products",
    paragraph: "Explore different parts of our platform — fully connected and consistent with our design system.",
  };
  return { Layout, Sidebar, configs };
};
