/* language.js – lightweight i18n for Grammar Games
   Usage: add data-translate="key" (and optional data-translate-attr="aria-label") on elements.
   Language selection via ?lang=de|zh|en or localStorage('grammarGamesLanguage')
*/
(function () {
  const messages = {
    /* ====================== DEUTSCH ====================== */
    de: {
      // --- Global / Header ---
      backButton: 'Zurück',
      suitableGames: 'Passende Spiele für mein Kind',
      validEmailRequired: 'Bitte eine gültige E-Mail-Adresse eingeben.',
      additionalGamesMessage: 'Mehr Spiele kommen bald – trag dich ein, um benachrichtigt zu werden!',

      // --- Startseite (Hero) ---
      heroHeadlineA: '10-Minuten<br/>Grammatik-Games',
      heroSublineA: 'Spielerisch, multisensorisch, kurz und strukturiert – Grammatik lernen war noch nie so einfach!',
      playful: 'Spielerisch',
      multisensory: 'Multisensorisch',
      timeLimit: 'Nur 10 Minuten',
      structured: 'Strukturiert',
      viewExampleGames: '▶ Beispiel-Games ansehen',
      ageRange: 'Für Kinder 4–10 Jahre',

      // --- Preview-Seite ---
      previewTitle: 'So funktionieren unsere Grammar Games',
      previewSubtitle: 'Printable Karten mit einfachen Routinen für zu Hause',
      game1TitleMemory: 'Memory: Karte zu Karte (Drag & Drop)',
      game1SubtitleMemory: 'Ziehe passende Karten zusammen (z. B. <em>I</em> ↔ <em>ich</em>). Finde 6 Paare.',
      playGame1Now: '▶ Spiel 1 jetzt spielen',
      game2TitleSort: 'Sortieren: Karten in Felder (Drag & Drop)',
      game2SubtitleSort: 'Ziehe passende Karten in die richtigen Felder (z. B. I ↔ ich). Baue 3 richtige Reihen.',
      playGame2Now: '▶ Spiel 2 jetzt spielen',

      // --- Chooser (Altersauswahl) ---
      chooserTitle: 'Wie alt ist Ihr Kind?',
      chooserSubtitle: 'Wir zeigen Ihnen die passenden Grammar Games',
      age46Title: '4–6 Jahre',
      age46Desc: 'Spielerische Grundlagen',
      ex1a: 'Tier-Wörter sortieren',
      ex1b: 'Farben-Adjektive',
      ex1c: 'Action-Verben',
      age710Title: '7–10 Jahre',
      age710Desc: 'Strukturierte Grammatik',
      ex2a: 'Sätze konstruieren',
      ex2b: 'Zeit-Formen-Quiz',
      ex2c: 'Wortarten-Memory'
    },

    /* ====================== 简体中文 ====================== */
    zh: {
      // --- 全局 / 头部 ---
      backButton: '返回',
      suitableGames: '适合我孩子的游戏',
      validEmailRequired: '请输入有效的电子邮箱地址。',
      additionalGamesMessage: '更多游戏即将推出，订阅即可获取更新！',

      // --- 首页 (Hero) ---
      heroHeadlineA: '10 分钟语法游戏',
      heroSublineA: '有趣、多感官、短时且结构清晰——学语法从未如此轻松！',
      playful: '有趣',
      multisensory: '多感官',
      timeLimit: '只要 10 分钟',
      structured: '结构清晰',
      viewExampleGames: '▶ 查看示例游戏',
      ageRange: '适合 4–10 岁儿童',

      // --- 预览页 ---
      previewTitle: '我们的语法游戏这样玩',
      previewSubtitle: '可打印卡片，简单家庭流程',
      game1TitleMemory: '配对记忆：卡对卡（拖拽）',
      game1SubtitleMemory: '把对应的卡片拖到一起（如 I ↔ ich），找到 6 对。',
      playGame1Now: '▶ 立即开始游戏 1',
      game2TitleSort: '分类：拖到正确区域（拖拽）',
      game2SubtitleSort: '把对应的卡片拖到正确区域，完成 3 行。',
      playGame2Now: '▶ 立即开始游戏 2',

      // --- 年龄选择页 ---
      chooserTitle: '孩子多大了？',
      chooserSubtitle: '我们将为您推荐合适的语法游戏',
      age46Title: '4–6 岁',
      age46Desc: '趣味入门',
      ex1a: '动物词汇分类',
      ex1b: '颜色—形容词',
      ex1c: '动作动词',
      age710Title: '7–10 岁',
      age710Desc: '结构化语法',
      ex2a: '造句训练',
      ex2b: '时态小测验',
      ex2c: '词类记忆配对'
    },

    /* ====================== ENGLISH ====================== */
    en: {
      // --- Global / Header ---
      backButton: 'Back',
      suitableGames: 'Games for my child',
      validEmailRequired: 'Please enter a valid email address.',
      additionalGamesMessage: 'More games are coming soon — join the list to get updates!',

      // --- Homepage (Hero) ---
      heroHeadlineA: '10-Minute<br/>Grammar Games',
      heroSublineA: 'Playful, multisensory, short and structured — grammar learning made easy!',
      playful: 'Playful',
      multisensory: 'Multisensory',
      timeLimit: 'Just 10 minutes',
      structured: 'Structured',
      viewExampleGames: '▶ View example games',
      ageRange: 'For kids 4–10',

      // --- Preview page ---
      previewTitle: 'How our Grammar Games work',
      previewSubtitle: 'Printable cards with simple at-home routines',
      game1TitleMemory: 'Memory: Card to card (Drag & Drop)',
      game1SubtitleMemory: 'Drag matching cards together (e.g., <em>I</em> ↔ <em>ich</em>). Find 6 pairs.',
      playGame1Now: '▶ Play Game 1',
      game2TitleSort: 'Sorting: Cards into fields (Drag & Drop)',
      game2SubtitleSort: 'Drag matching cards into the right fields. Build 3 correct rows.',
      playGame2Now: '▶ Play Game 2',

      // --- Age chooser ---
      chooserTitle: 'How old is your child?',
      chooserSubtitle: 'We’ll show the right Grammar Games',
      age46Title: 'Ages 4–6',
      age46Desc: 'Playful foundations',
      ex1a: 'Sort animal words',
      ex1b: 'Colors & adjectives',
      ex1c: 'Action verbs',
      age710Title: 'Ages 7–10',
      age710Desc: 'Structured grammar',
      ex2a: 'Build sentences',
      ex2b: 'Tense quiz',
      ex2c: 'Parts-of-speech memory'
    }
  };

  const languageSystem = {
    messages,
    currentLanguage: 'de',

    t(key) {
      const lang = this.currentLanguage || 'de';
      const table = this.messages[lang] || this.messages.de || {};
      return (key in table ? table[key] : (this.messages.de && this.messages.de[key])) || key;
    },

    applyTranslations(root = document) {
      const nodes = root.querySelectorAll('[data-translate]');
      nodes.forEach(el => {
        const key = el.getAttribute('data-translate');
        const attr = el.getAttribute('data-translate-attr');
        const val = this.t(key);
        if (!val) return;
        if (attr) el.setAttribute(attr, val);
        else el.innerHTML = val;
      });
      // active state for language pills
      root.querySelectorAll('.lang-link').forEach(a => {
        a.classList.toggle('gg-active', (a.dataset.lang || '').toLowerCase() === this.currentLanguage);
      });
    },

    setLanguage(lang = 'de') {
      this.currentLanguage = String(lang).toLowerCase();
      try { localStorage.setItem('grammarGamesLanguage', this.currentLanguage); } catch(_) {}
      this.applyTranslations(document);
    },

    setLanguageFromQuery(langMaybe) {
      const qs = new URLSearchParams(location.search);
      const fallback =
        langMaybe ||
        qs.get('lang') ||
        (typeof localStorage !== 'undefined' && localStorage.getItem('grammarGamesLanguage')) ||
        'de';
      this.setLanguage(fallback);
      return this.currentLanguage;
    }
  };

  // Expose globally
  window.languageSystem = languageSystem;
  window.setLanguageFromQuery = function (lang) { return languageSystem.setLanguageFromQuery(lang); };
  window.setLanguage = function (lang) { return languageSystem.setLanguage(lang); };

  // Auto-apply on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => languageSystem.setLanguageFromQuery());
  } else {
    languageSystem.setLanguageFromQuery();
  }
})();
