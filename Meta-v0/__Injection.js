module.exports.Injection = (meta, ctx = {}) => {
  const updated = { ...meta };

  // 🧩 Dynamic rules
  const rules = [
    {
      match: () => ctx.__slug__.includes('api'),
      apply: () => {
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
    try { if (rule.match()) rule.apply(); } catch (e) {}
  });

  return updated;
};