module.exports.Injection = (meta, ctx = {}) => {
  console.log('Called BY - Injection: ', meta, ctx)
  let updated = { ...meta };

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
    if (rule.match()) rule.apply();
  });

  return updated;
};