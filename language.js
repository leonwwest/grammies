// Multi-Language System for Grammar Games
// Supports German and Chinese with localStorage persistence

class LanguageSystem {
    constructor() {
        this.currentLanguage = this.loadLanguage();
        this.translations = this.getTranslations();
        this.initializeLanguageSystem();
    }

    loadLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && ['de', 'zh'].includes(langParam)) {
            localStorage.setItem('grammarGamesLanguage', langParam);
            return langParam;
        }

        // Check localStorage
        const stored = localStorage.getItem('grammarGamesLanguage');
        if (stored && ['de', 'zh'].includes(stored)) {
            return stored;
        }

        // Default to German
        return 'de';
    }

    saveLanguage(lang) {
        localStorage.setItem('grammarGamesLanguage', lang);
        this.currentLanguage = lang;
    }

    getTranslations() {
        return {
            // German translations
            de: {
                // Meta data
                pageTitle: 'Grammar Games - 10-Min Grammatik für Kinder',
                
                // Language Selector
                languageLabel: 'Sprache',
                languages: {
                    de: 'Deutsch',
                    zh: '中文'
                },

                // Navigation
                backButton: '← Zurück',
                
                // Variants
                variantA: 'Variante A: 10-Min Games',
                variantB: 'Variante B: Multisensory Grammar',

                // Hero Section (index.html)
                ageRange: 'Für Kinder 4-10 Jahre',
                heroHeadlineA: '10-Minuten Grammatik-Games',
                heroHeadlineB: 'Multisensorische Grammatik für zu Hause',
                heroSublineA: 'Spielerisch, multisensorisch, kurz und strukturiert - Grammatik lernen war noch nie so einfach!',
                heroSublineB: 'Interaktive Lernmethoden für eine ganzheitliche Sprachentwicklung Ihres Kindes!',
                
                // Value Props
                playful: 'Spielerisch',
                multisensory: 'Multisensorisch',
                timeLimit: 'Nur 10 Minuten',
                structured: 'Strukturiert',
                
                // Buttons
                viewExampleGames: 'Beispiel-Games ansehen',
                
                // Preview Section (preview.html)
                previewTitle: 'So funktionieren unsere Grammar Games',
                previewSubtitle: 'Printable Karten mit einfachen Routinen für zu Hause',
                
                // Game examples
                characterWordGame: '🎯 Charakter-Wortarten-Spiel',
                characterSentenceGame: '🏗️ Charakter-Sätze-Spiel',
                
                // Game elements
                learningFriends: '🌟 Unsere Lern-Freunde helfen beim Sortieren!',
                charactersBuilding: '🎭 Die Charaktere bauen einen Satz!',
                perfectSentence: '✨ "I play games!" ✨',
                sentenceStructure: '👧 Pronoun + 🎮 Verb + 🎲 Noun = Perfect Sentence!',
                
                // Routine steps
                miniRoutine: '🔄 Mini-Routine (5 Schritte):',
                step1: 'Karten mischen',
                step2: 'Ein Wort vorlesen',
                step3: 'Farbcode erklären',
                step4: 'Richtige Box finden',
                step5: 'Erfolg feiern! 🎉',
                
                // Word categories (stay in English for grammar learning)
                nouns: 'NOUNS',
                verbs: 'VERBS',
                adjectives: 'ADJECTIVES',
                nounDesc: 'Things & People',
                verbDesc: 'Action Words',
                adjectiveDesc: 'Describing Words',
                
                // Grammar exercise elements (stay in English)
                grammarGame1: 'Grammar Game #1',
                nounVerbAdj: 'Noun • Verb • Adjective',
                
                // Age Chooser (chooser.html)
                ageQuestion: 'Wie alt ist Ihr Kind?',
                ageSubtitle: 'Wir zeigen Ihnen die passenden Grammar Games',
                
                age46: '4-6 Jahre',
                age46Desc: 'Spielerische Grundlagen',
                age46Examples: 'Beispiel-Spiele:',
                age46Game1: '🐱 Tier-Wörter sortieren',
                age46Game2: '🌈 Farben-Adjektive',
                age46Game3: '🏃‍♂️ Action-Verben',
                
                age710: '7-10 Jahre',
                age710Desc: 'Strukturierte Grammatik',
                age710Examples: 'Beispiel-Spiele:',
                age710Game1: '📝 Sätze konstruieren',
                age710Game2: '⚡ Zeit-Formen-Quiz',
                age710Game3: '🔤 Wortarten-Memory',
                
                // Email Capture (capture.html)
                freeStarterPack: 'Kostenloses Starter-Pack erhalten',
                starterPackDesc: '3 sofort einsetzbare Grammar Games + Anleitung per E-Mail',
                emailPlaceholder: 'Ihre E-Mail-Adresse',
                namePlaceholder: 'Ihr Vorname (optional)',
                getStarterPack: '🎁 Kostenloses Starter-Pack erhalten',
                
                // Thank You (thankyou.html)
                thankYou: 'Vielen Dank!',
                packOnTheWay: 'Ihr Starter-Pack ist unterwegs',
                moreGames: 'Mehr Spiele ansehen',
                startOver: 'Nochmal von vorne',
                
                // Common
                suitableGames: 'Passende Spiele für mein Kind',
                validEmailRequired: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            },

            // Chinese translations
            zh: {
                // Meta data
                pageTitle: 'Grammar Games - 儿童10分钟语法学习',
                
                // Language Selector
                languageLabel: '语言',
                languages: {
                    de: 'Deutsch',
                    zh: '中文'
                },

                // Navigation
                backButton: '← 返回',
                
                // Variants
                variantA: '选项A: 10分钟游戏',
                variantB: '选项B: 多感官语法',

                // Hero Section
                ageRange: '适合4-10岁儿童',
                heroHeadlineA: '10分钟语法游戏',
                heroHeadlineB: '家庭多感官语法学习',
                heroSublineA: '游戏化、多感官、简短且结构化 - 语法学习从未如此简单！',
                heroSublineB: '互动学习方法，全面提高您孩子的语言发展！',
                
                // Value Props
                playful: '游戏化',
                multisensory: '多感官',
                timeLimit: '仅需10分钟',
                structured: '结构化',
                
                // Buttons
                viewExampleGames: '查看示例游戏',
                
                // Preview Section
                previewTitle: '我们的语法游戏如何运作',
                previewSubtitle: '家庭使用的可打印卡片和简单程序',
                
                // Game examples
                characterWordGame: '🎯 角色词汇分类游戏',
                characterSentenceGame: '🏗️ 角色造句游戏',
                
                // Game elements
                learningFriends: '🌟 我们的学习伙伴帮助分类！',
                charactersBuilding: '🎭 角色们正在造句！',
                perfectSentence: '✨ "I play games!" ✨',
                sentenceStructure: '👧 代词 + 🎮 动词 + 🎲 名词 = 完美句子！',
                
                // Routine steps
                miniRoutine: '🔄 迷你程序（5步）：',
                step1: '洗牌',
                step2: '读一个单词',
                step3: '解释颜色代码',
                step4: '找到正确的盒子',
                step5: '庆祝成功！🎉',
                
                // Word categories (stay in English for grammar learning)
                nouns: 'NOUNS',
                verbs: 'VERBS',
                adjectives: 'ADJECTIVES',
                nounDesc: 'Things & People',
                verbDesc: 'Action Words',
                adjectiveDesc: 'Describing Words',
                
                // Grammar exercise elements (stay in English)
                grammarGame1: 'Grammar Game #1',
                nounVerbAdj: 'Noun • Verb • Adjective',
                
                // Age Chooser
                ageQuestion: '您的孩子几岁？',
                ageSubtitle: '我们将为您展示合适的语法游戏',
                
                age46: '4-6岁',
                age46Desc: '游戏化基础',
                age46Examples: '示例游戏：',
                age46Game1: '🐱 动物词汇分类',
                age46Game2: '🌈 颜色形容词',
                age46Game3: '🏃‍♂️ 动作动词',
                
                age710: '7-10岁',
                age710Desc: '结构化语法',
                age710Examples: '示例游戏：',
                age710Game1: '📝 造句构造器',
                age710Game2: '⚡ 时态形式测验',
                age710Game3: '🔤 词类记忆',
                
                // Email Capture
                freeStarterPack: '获取免费入门包',
                starterPackDesc: '通过电子邮件立即获得3个语法游戏+指导',
                emailPlaceholder: '您的电子邮箱',
                namePlaceholder: '您的姓名（可选）',
                getStarterPack: '🎁 获取免费入门包',
                
                // Thank You
                thankYou: '谢谢！',
                packOnTheWay: '您的入门包正在路上',
                moreGames: '查看更多游戏',
                startOver: '重新开始',
                
                // Common
                suitableGames: '适合我孩子的游戏',
                validEmailRequired: '请输入有效的电子邮件地址。',
            }
        };
    }

    t(key, replacements = {}) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key} for language ${this.currentLanguage}`);
                return key;
            }
        }
        
        if (typeof value === 'string') {
            // Replace placeholders like {age}
            return value.replace(/\{(\w+)\}/g, (match, placeholder) => {
                return replacements[placeholder] || match;
            });
        }
        
        return value || key;
    }

    updatePageContent() {
        // Update page title
        document.title = this.t('pageTitle');
        
        // Update all elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translatedText = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translatedText;
            } else {
                element.textContent = translatedText;
            }
        });
        
        // Update language selector if present
        this.updateLanguageSelector();
    }

    updateLanguageSelector() {
        const languageSelector = document.getElementById('language-selector');
        if (!languageSelector) return;

        languageSelector.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';">
                    🌍 ${this.t('languages.' + this.currentLanguage)}
                </button>
                <div class="language-options" style="display: none;">
                    <button onclick="window.languageSystem.changeLanguage('de')" class="${this.currentLanguage === 'de' ? 'active' : ''}">
                        🇩🇪 ${this.t('languages.de')}
                    </button>
                    <button onclick="window.languageSystem.changeLanguage('zh')" class="${this.currentLanguage === 'zh' ? 'active' : ''}">
                        🇨🇳 ${this.t('languages.zh')}
                    </button>
                </div>
            </div>
        `;

        // Insert language selector into page
        const header = document.querySelector('header') || document.body;
        if (!document.getElementById('language-selector-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.id = 'language-selector-wrapper';
            wrapper.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000;';
            wrapper.appendChild(languageSelector);
            header.appendChild(wrapper);
        }
    }

    updateDropdownButton() {
        const languageBtn = document.querySelector('.language-btn');
        if (languageBtn) {
            languageBtn.innerHTML = `🌍 ${this.t('languages.' + this.currentLanguage)}`;
        }

        // Update active state in dropdown options
        const options = document.querySelectorAll('.language-options button');
        options.forEach(option => {
            option.classList.remove('active');
            if (option.onclick.toString().includes(`'${this.currentLanguage}'`)) {
                option.classList.add('active');
            }
        });
    }

    changeLanguage(lang) {
        console.log('🌍 Language change requested:', lang);

        if (!window.languageSystem) {
            console.error('❌ window.languageSystem is not available');
            return;
        }

        console.log('Current language:', this.currentLanguage);
        console.log('Available languages:', ['de', 'zh']);
        console.log('Language is valid:', ['de', 'zh'].includes(lang));
        console.log('Language is different:', lang !== this.currentLanguage);

        if (['de', 'zh'].includes(lang) && lang !== this.currentLanguage) {
            console.log('✅ Language change conditions met, proceeding...');

            this.saveLanguage(lang);
            console.log('💾 Language saved to localStorage');

            this.currentLanguage = lang;
            console.log('🔄 Current language updated to:', this.currentLanguage);

            this.updatePageContent();
            console.log('📝 Page content updated');

            this.updateDropdownButton();
            console.log('🔽 Dropdown button updated');

            // Update URL parameter without page reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
            console.log('🔗 URL updated with language parameter');

            console.log('🎉 Language change completed successfully!');
        } else {
            console.log('❌ Language change conditions not met or language unchanged');
        }
    }

    initializeLanguageSystem() {
        console.log('🚀 Initializing Language System...');
        console.log('Current language:', this.currentLanguage);
        
        // Set up the page content
        this.updatePageContent();
        
        // Set up language selector
        this.updateLanguageSelector();
        
        // Make language system globally available
        window.languageSystem = this;
        
        console.log('✅ Language System initialized successfully');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSystem();
});