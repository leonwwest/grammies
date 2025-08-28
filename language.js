/* language.js — lightweight i18n for Grammies */

(function () {
    // --- Helpers --------------------------------------------------------------
    const qs = new URLSearchParams(location.search);
  
    function normalizeLang(raw) {
      if (!raw) return 'de';
      const s = String(raw).toLowerCase();
      if (['de', 'de-de'].includes(s)) return 'de';
      if (['en', 'en-us', 'en-gb'].includes(s)) return 'en';
      if (['zh', 'zh-cn', 'zh-hans', 'cn'].includes(s)) return 'zh';
      return 'de';
    }
  
    function getInitialLang() {
      // priority: URL ?lang= → localStorage → default 'de'
      const fromUrl = normalizeLang(qs.get('lang'));
      if (qs.has('lang')) return fromUrl;
      const fromStore = normalizeLang(localStorage.getItem('grammarGamesLanguage'));
      return fromStore || 'de';
    }
  
    // --- Translations ---------------------------------------------------------
    const dict = {
      de: {
        // nav / layout
        variantA: 'Variante A: 10-Min Games',
        variantB: 'Variante B: Multisensory Grammar',
        backButton: '← Zurück',
        suitableGames: 'Passende Spiele für mein Kind',
        previewTitle: 'So funktionieren unsere Grammar Games',
        previewSubtitle: 'Printable Karten mit einfachen Routinen für zu Hause',
  
        // Game 1 (preview)
        game1TitleMemory: '🧠 Memory: Karte zu Karte (Drag & Drop)',
        game1SubtitleMemory:
          'Ziehe passende Karten zusammen (z. B. <em>I</em> ↔ <em>ich</em>). Finde 6 Paare.',
        playGame1Now: '▶ Spiel 1 jetzt spielen',
  
        // Game 2 (preview)
        game2TitleSort: '🧩 Sortieren: Karten in Felder (Drag & Drop)',
        game2SubtitleSort:
          'Ziehe passende Karten in die richtigen Felder (z. B. <em>I</em> ↔ <em>ich</em>). Baue 3 richtige Reihen.',
        playGame2Now: '▶ Spiel 2 jetzt spielen',
      },
  
      en: {
        // nav / layout
        variantA: 'Variant A: 10-Min Games',
        variantB: 'Variant B: Multisensory Grammar',
        backButton: '← Back',
        suitableGames: 'Find suitable games for my child',
        previewTitle: 'How our Grammar Games work',
        previewSubtitle: 'Printable cards with simple routines for home',
  
        // Game 1 (preview)
        game1TitleMemory: '🧠 Memory: Card to Card (Drag & Drop)',
        game1SubtitleMemory:
          'Drag matching cards together (e.g., <em>I</em> ↔ <em>ich</em>). Find 6 pairs.',
        playGame1Now: '▶ Play Game 1 now',
  
        // Game 2 (preview)
        game2TitleSort: '🧩 Sort: Cards into Slots (Drag & Drop)',
        game2SubtitleSort:
          'Drag matching cards into the right slots (e.g., <em>I</em> ↔ <em>ich</em>). Build 3 correct rows.',
        playGame2Now: '▶ Play Game 2 now',
      },
  
      zh: {
        // nav / layout
        variantA: 'A 版：10 分钟游戏',
        variantB: 'B 版：多感官语法',
        backButton: '← 返回',
        suitableGames: '为我的孩子挑选合适的游戏',
        previewTitle: '我们的语法游戏怎么玩',
        previewSubtitle: '可打印卡片 + 简单家庭流程',
  
        // Game 1 (preview)
        game1TitleMemory: '🧠 记忆配对：卡片对卡片（拖放）',
        game1SubtitleMemory:
          '把对应的卡片拖在一起（例如 <em>I</em> ↔ <em>ich</em>）。找到 6 组配对。',
        playGame1Now: '▶ 现在玩第 1 个游戏',
  
        // Game 2 (preview)
        game2TitleSort: '🧩 分类：把卡片拖到正确位置（拖放）',
        game2SubtitleSort:
          '把对应的卡片拖到正确的框中（例如 <em>I</em> ↔ <em>ich</em>）。完成 3 行。',
        playGame2Now: '▶ 开始第 2 个游戏',
      },
    };
  
    // --- State ---------------------------------------------------------------
    let current = getInitialLang();
  
    // Persist & reflect in <html lang="">
    function setLang(lang) {
      const norm = normalizeLang(lang);
      current = norm;
      localStorage.setItem('grammarGamesLanguage', norm);
      document.documentElement.setAttribute('lang', norm);
  
      // Optional analytics hook
      try {
        window.analytics?.trackClick?.('lang_switch', { to: norm });
      } catch (_) {}
  
      applyAll();
    }
  
    function t(key) {
      // fallback order: current → en → de → key
      return (
        (dict[current] && dict[current][key]) ||
        (dict.en && dict.en[key]) ||
        (dict.de && dict.de[key]) ||
        ''
      );
    }
  
    // Apply translations to DOM
    function applyAll() {
      const nodes = document.querySelectorAll('[data-translate]');
      nodes.forEach((el) => {
        const k = el.getAttribute('data-translate');
        const val = t(k);
        if (!val) return;
        // Many strings contain <em>/emoji → use innerHTML
        el.innerHTML = val;
      });
    }
  
    // Expose tiny API
    window.languageSystem = {
      get: () => current,
      set: setLang,
      translate: applyAll,
      updateDynamicContent: applyAll, // alias used in some pages
      t, // optional direct access
    };
  
    // Initialize once DOM exists (in case script is in <head>)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setLang(current); // ensures <html lang> + applyAll
      });
    } else {
      setLang(current);
    }
  })();
  