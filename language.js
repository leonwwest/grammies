/* language.js – lightweight i18n with failsafe
   - Reads ?lang=… or localStorage('grammarGamesLanguage')
   - Translates [data-translate] nodes
   - If a node's text equals its key, replace it (fallback for markup that only has keys)
*/

(function () {
    const DEFAULT_LANG = 'de';
  
    // ---------------- Translations ----------------
    window.translations = {
      de: {
        // Global / nav
        variantA: "Variante A: 10-Min Games",
        variantB: "Variante B: Multisensory Grammar",
        backButton: "← Zurück",
  
        // Preview hero
        previewTitle: "So funktionieren unsere Grammar Games",
        previewSubtitle: "Printable Karten mit einfachen Routinen für zu Hause",
  
        // Game 1 (memory)
        game1TitleMemory: "🧠 Memory: Karte zu Karte (Drag & Drop)",
        game1SubtitleMemory:
          "Ziehe zwei zusammengehörige Karten aufeinander (z. B. I ↔ ich). Bei einem Treffer verschwinden die Karten und erscheinen unten als Treffer. Finde alle 6 Paare!",
        g1h1: "Was wird geübt?",
        g1h1a: "Pronomen & Formen von sein / to be",
        g1h1b: "Deutsch ↔ Englisch (umschaltbar auch 中文)",
        g1h1c: "Schnelle Erfolge: 2–4 Minuten",
        g1h2: "So geht’s",
        g1h2a: "Karte anklicken oder ziehen",
        g1h2b: "Auf die passende Karte fallen lassen",
        g1h2c: "Richtige Paare verschwinden ➜ unten als Treffer",
        g1h3: "Beispiel-Paare",
        playGame1Now: "▶ Spiel 1 jetzt spielen",
  
        // Second card
        characterSentenceGame: "🏗️ Charakter-Sätze-Spiel",
        charactersBuilding: "🎭 Die Charaktere bauen einen Satz!",
        perfectSentence: "✨ \"I play games!\" ✨",
        sentenceStructure: "👧 Pronomen + 🎮 Verb + 🎲 Nomen = Perfekter Satz!",
  
        suitableGames: "Passende Spiele für mein Kind",
  
        // Legacy keys (if used)
        learningFriends: "🌟 Unsere Lern-Freunde helfen beim Sortieren!",
        nouns: "NOUNS",
        nounDesc: "Things & People",
        verbs: "VERBS",
        verbDesc: "Action Words",
        adjectives: "ADJECTIVES",
        adjectiveDesc: "Describing Words",
        miniRoutine: "🔄 Mini-Routine (5 Schritte):",
        step1: "Karten mischen",
        step2: "Ein Wort vorlesen",
        step3: "Farbcode erklären",
        step4: "Richtige Box finden",
        step5: "Erfolg feiern! 🎉"
      },
  
      en: {
        variantA: "Variant A: 10-min Games",
        variantB: "Variant B: Multisensory Grammar",
        backButton: "← Back",
  
        previewTitle: "How our Grammar Games work",
        previewSubtitle: "Printable cards with simple at-home routines",
  
        game1TitleMemory: "🧠 Memory: Card-to-Card (Drag & Drop)",
        game1SubtitleMemory:
          "Drag one card onto its matching partner (e.g., I ↔ ich). Correct pairs disappear and show below. Find all 6 pairs!",
        g1h1: "What kids practice",
        g1h1a: "Pronouns & the verb to be",
        g1h1b: "German ↔ English (中文 switchable too)",
        g1h1c: "Quick wins: 2–4 minutes",
        g1h2: "How it works",
        g1h2a: "Tap or drag a card",
        g1h2b: "Drop it on its match",
        g1h2c: "Matches vanish and are listed below",
        g1h3: "Example pairs",
        playGame1Now: "▶ Play Game 1",
  
        characterSentenceGame: "🏗️ Character Sentence Builder",
        charactersBuilding: "🎭 The characters build a sentence!",
        perfectSentence: "✨ \"I play games!\" ✨",
        sentenceStructure: "👧 Pronoun + 🎮 Verb + 🎲 Noun = Perfect sentence!",
  
        suitableGames: "Find games for my child",
  
        learningFriends: "🌟 Our learning friends help you sort!",
        nouns: "NOUNS",
        nounDesc: "Things & People",
        verbs: "VERBS",
        verbDesc: "Action Words",
        adjectives: "ADJECTIVES",
        adjectiveDesc: "Describing Words",
        miniRoutine: "🔄 Mini-routine (5 steps):",
        step1: "Shuffle the cards",
        step2: "Read one word",
        step3: "Explain the color code",
        step4: "Find the right box",
        step5: "Celebrate success! 🎉"
      },
  
      zh: {
        variantA: "方案 A：10 分钟小游戏",
        variantB: "方案 B：多感官语法",
        backButton: "← 返回",
  
        previewTitle: "我们的语法游戏这样玩",
        previewSubtitle: "可打印卡片 + 家庭小流程",
  
        game1TitleMemory: "🧠 记忆配对：拖放卡片",
        game1SubtitleMemory:
          "把一张卡片拖到相应的配对（例如 I ↔ ich）。配对成功会消失，并在下方显示。共 6 对，全部找出来！",
        g1h1: "练习内容",
        g1h1a: "人称代词 & be 动词",
        g1h1b: "德语 ↔ 英语（可切换 中文）",
        g1h1c: "时长：2–4 分钟",
        g1h2: "怎么玩",
        g1h2a: "点击或拖动一张卡片",
        g1h2b: "放到正确配对上",
        g1h2c: "配对成功会消失并在下方显示",
        g1h3: "示例配对",
        playGame1Now: "▶ 立即开始游戏 1",
  
        characterSentenceGame: "🏗️ 角色造句小游戏",
        charactersBuilding: "🎭 小角色一起造句！",
        perfectSentence: "✨ \"I play games!\" ✨",
        sentenceStructure: "👧 代词 + 🎮 动词 + 🎲 名词 = 完整句子！",
  
        suitableGames: "为我的孩子挑选合适的游戏",
  
        learningFriends: "🌟 学习小伙伴来帮忙分类！",
        nouns: "名词",
        nounDesc: "事物与人物",
        verbs: "动词",
        verbDesc: "动作词",
        adjectives: "形容词",
        adjectiveDesc: "描述性词汇",
        miniRoutine: "🔄 迷你流程（5 步）：",
        step1: "洗牌",
        step2: "读出一个词",
        step3: "说明颜色含义",
        step4: "放入正确框",
        step5: "庆祝成功！🎉"
      }
    };
  
    // ---------------- Core helpers ----------------
    const qs = (s, r = document) => r.querySelector(s);
    const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  
    function readLangFromUrl() {
      const p = new URLSearchParams(location.search);
      const l = (p.get('lang') || '').trim().toLowerCase();
      return l || null;
    }
  
    function getInitialLanguage() {
      return readLangFromUrl() || localStorage.getItem('grammarGamesLanguage') || DEFAULT_LANG;
    }
  
    function applyTranslations(lang) {
      const dict = window.translations[lang] || {};
      document.documentElement.lang = lang;
  
      qsa('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const val = dict[key];
        // Failsafe: if node shows the key itself, replace it
        if (val != null) {
          el.innerHTML = val;
        } else if ((el.textContent || '').trim() === key) {
          // fallback: if we don't have a value but the element only shows the key, remove it
          // (keeps the UI clean even if a key is missing)
          el.textContent = '';
        }
      });
    }
  
    function setLanguage(lang) {
      const l = (lang || DEFAULT_LANG).toLowerCase();
      localStorage.setItem('grammarGamesLanguage', l);
  
      try {
        const u = new URL(location.href);
        u.searchParams.set('lang', l);
        history.replaceState({}, '', u);
      } catch {}
  
      applyTranslations(l);
      languageSystem.currentLanguage = l;
    }
  
    function updateDynamicContent() {
      applyTranslations(languageSystem.currentLanguage);
  
      // keep card-game links in sync
      try {
        const p = new URLSearchParams(location.search);
        const variant = (p.get('variant') || 'A').toUpperCase();
        const lang = (p.get('lang') || localStorage.getItem('grammarGamesLanguage') || DEFAULT_LANG).toLowerCase();
        qsa('.link-game1').forEach(a => {
          const url = new URL(a.getAttribute('href'), location.href);
          url.searchParams.set('variant', variant);
          url.searchParams.set('lang', lang);
          a.href = url.pathname + '?' + url.searchParams.toString();
        });
      } catch {}
    }
  
    // ---------------- Public API ----------------
    window.languageSystem = {
      currentLanguage: getInitialLanguage(),
      setLanguage,
      updateDynamicContent
    };
  
    // Run when ready (and also immediately if document is already loaded)
    function boot() {
      setLanguage(languageSystem.currentLanguage);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot(); // page already loaded
    }
  })();
  