module.exports.Injection = (meta, ctx = {}) => {
  const updated = { ...meta };
  const blockedSlugs = ['secret', 'admin', 'api']; // ⬅️ add slugs to block

  // 🧩 Dynamic rules
  const rules = [
    // New blocking rule
    {
      match: () => blockedSlugs.some(slug => ctx.__slug__?.startsWith(slug)),
      apply: () => {
        updated.blocked = true;      // ⬅️ mark as blocked
        updated.robots = 'noindex, nofollow';
      }
    },
    {
      match: () => ctx.__subdomain__ === 'tools',
      apply: () => {
        updated.title = `${updated.title} 🔧`;
      }
    }
  ];

  rules.forEach(rule => {
    try { if (rule.match()) rule.apply(); } catch (e) { }
  });

  return updated;
};