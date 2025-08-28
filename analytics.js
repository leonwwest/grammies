// Grammar Games Prototype Analytics (enhanced)
// - Cross-screen tracking via localStorage
// - Safe, no-crash UI updates
// - Variant & language propagation
// - Game 1 events (start/pair/complete)

class PrototypeAnalytics {
    constructor() {
      this.sessionData = this.loadSession();
      this.initializeTracking();
    }
  
    // ---------- Storage ----------
    loadSession() {
      try {
        const stored = localStorage.getItem('grammarGamesSession');
        if (stored) return JSON.parse(stored);
      } catch (e) { console.warn('Analytics: could not parse stored session', e); }
  
      // New session
      const now = new Date().toISOString();
      return {
        sessionId: this.generateSessionId(),
        startTime: now,
        variant: 'A',                 // default, can be overridden by URL
        currentScreen: 'hero',
        screens: {
          hero: 0,
          preview: 0,
          chooser: 0,
          capture: 0,
          thankyou: 0,
          cardgame: 0,                // NEW: Game 1
          sortinggame: 0              // NEW: Game 2
        },
        clicks: {
          heroToPreview: 0,
          previewToChooser: 0,
          chooserToCapture: 0,
          emailSubmit: 0,
          backClicks: 0,
          // Game 1
          game1Start: 0,
          game1Pairs: 0,
          game1Complete: 0
        },
        game1: {
          pairsFound: [],            // e.g. ["PRON_I","VERB_AM",...]
          durationMs: 0,
          startedAt: null,
          completedAt: null
        },
        ageSelected: null,
        emailSubmitted: false
      };
    }
  
    saveSession() {
      try {
        localStorage.setItem('grammarGamesSession', JSON.stringify(this.sessionData));
      } catch (e) {
        console.warn('Analytics: could not save session', e);
      }
    }
  
    generateSessionId() {
      return 'sess_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now();
    }
  
    // ---------- Init ----------
    initializeTracking() {
      // Screen view on load
      this.trackScreenView(this.getCurrentScreen());
    }
  
    getCurrentScreen() {
      const path = (location.pathname.split('/').pop() || '').toLowerCase();
      switch (path) {
        case '':
        case 'index.html':        return 'hero';
        case 'preview.html':      return 'preview';
        case 'chooser.html':      return 'chooser';
        case 'capture.html':      return 'capture';
        case 'thankyou.html':     return 'thankyou';
        case 'card-game.html':    return 'cardgame';     // NEW
        case 'sorting-game.html': return 'sortinggame';  // NEW
        default:                  return 'unknown';
      }
    }
  
    // ---------- Screens ----------
    trackScreenView(screen) {
      if (this.sessionData.screens[screen] !== undefined) {
        this.sessionData.screens[screen]++;
        this.sessionData.currentScreen = screen;
        this.saveSession();
  
        console.log(`📊 Screen view: ${screen} (Total: ${this.sessionData.screens[screen]})`);
        this.updateAnalyticsDisplay();
      }
    }
  
    // ---------- Clicks & Events ----------
    trackClick(action, data = {}) {
      console.log(`🎯 Click: ${action}`, data);
  
      switch (action) {
        case 'hero-to-preview':
        case 'hero_to_preview':
          this.sessionData.clicks.heroToPreview++; break;
  
        case 'preview-to-chooser':
        case 'preview_to_chooser':
          this.sessionData.clicks.previewToChooser++; break;
  
        case 'chooser-to-capture':
        case 'chooser_to_capture':
          this.sessionData.clicks.chooserToCapture++; break;
  
        case 'email-submit':
        case 'email_submit':
          this.sessionData.clicks.emailSubmit++;
          this.sessionData.emailSubmitted = true;
          break;
  
        case 'back-click':
        case 'back':
          this.sessionData.clicks.backClicks++; break;
  
        case 'age-selected':
        case 'age_selected':
          this.sessionData.ageSelected = data?.age ?? data?.value ?? null;
          break;
  
        // ---- Game 1 events ----
        case 'game1_start':
          this.sessionData.clicks.game1Start++;
          this.sessionData.game1.startedAt = Date.now();
          break;
  
        case 'game1_pair':
          if (data?.pair) {
            this.sessionData.clicks.game1Pairs++;
            this.sessionData.game1.pairsFound.push(data.pair);
          }
          break;
  
        case 'game1_complete':
          this.sessionData.clicks.game1Complete++;
          this.sessionData.game1.completedAt = Date.now();
          if (this.sessionData.game1.startedAt) {
            this.sessionData.game1.durationMs =
              this.sessionData.game1.completedAt - this.sessionData.game1.startedAt;
          }
          break;
  
        default:
          // no-op
          break;
      }
  
      this.saveSession();
      this.updateAnalyticsDisplay();
    }
  
    // ---------- Variant ----------
    setVariant(variant = 'A') {
      const v = (variant || 'A').toUpperCase();
      if (!['A','B'].includes(v)) return;
  
      this.sessionData.variant = v;
      this.saveSession();
      console.log(`🧪 Variant set to ${v}`);
  
      this.updateVariantUI(v);
    }
  
    updateVariantUI(variant) {
      // Highlight active variant button (if present)
      document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.classList.remove('active');
        const txt = (btn.textContent || btn.innerText || '').toLowerCase();
        const isA = variant === 'A' && txt.includes('10-min');
        const isB = variant === 'B' && (txt.includes('multisensory') || txt.includes('multisensory grammar'));
        if (isA || isB) btn.classList.add('active');
      });
  
      // Let language system refresh any dynamic copy
      try {
        if (window.languageSystem?.updateDynamicContent) {
          window.languageSystem.updateDynamicContent();
        }
      } catch (e) {
        console.log('Language system not ready for variant update');
      }
    }
  
    // ---------- KPIs / UI wiring ----------
    updateAnalyticsDisplay() {
      // Only run on pages that actually show KPIs
      const s = this.sessionData.screens;
      const c = this.sessionData.clicks;
  
      // Guard divisors
      const heroViews   = s.hero    || 1;
      const previewViews= s.preview || 1;
      const chooserViews= s.chooser || 1;
      const captureViews= s.capture || 1;
  
      const pct = (num, den) => ((num / (den || 1)) * 100).toFixed(1);
  
      const ctrHeroPreview   = pct(c.heroToPreview,   heroViews);
      const ctrPreviewChooser= pct(c.previewToChooser,previewViews);
      const ctrChooserCapture= pct(c.chooserToCapture,chooserViews);
      const emailSubmitRate  = pct(c.emailSubmit,     captureViews);
  
      // Fill if elements exist (thankyou.html / capture sidebar etc.)
      const eHP = document.getElementById('ctr-hero-preview');
      const ePC = document.getElementById('ctr-preview-chooser');
      const eCC = document.getElementById('ctr-chooser-capture');
      const eES = document.getElementById('email-submit-rate');
  
      if (eHP) eHP.textContent = `${ctrHeroPreview}%`;
      if (ePC) ePC.textContent = `${ctrPreviewChooser}%`;
      if (eCC) eCC.textContent = `${ctrChooserCapture}%`;
      if (eES) {
        eES.textContent = `${emailSubmitRate}%`;
        const rate = parseFloat(emailSubmitRate);
        // color cue
        if (rate >= 12)      eES.style.color = '#4CAF50';
        else if (rate >= 8)  eES.style.color = '#FFC107';
        else                 eES.style.color = '#ff6b6b';
      }
  
      // Small Game 1 progress display hooks (if you add them to any page)
      const g1pairs = document.getElementById('g1-pairs-found');
      if (g1pairs) g1pairs.textContent = String(this.sessionData.clicks.game1Pairs || 0);
      const g1time  = document.getElementById('g1-duration');
      if (g1time && this.sessionData.game1.durationMs) {
        g1time.textContent = Math.round(this.sessionData.game1.durationMs / 1000) + 's';
      }
    }
  
    // ---------- Report ----------
    generateReport() {
      const s = this.sessionData.screens;
      const c = this.sessionData.clicks;
  
      const pct = (n, d) => ((n/(d||1))*100).toFixed(1) + '%';
  
      const report = {
        sessionId: this.sessionData.sessionId,
        variant: this.sessionData.variant,
        startedAt: this.sessionData.startTime,
        durationMs: Date.now() - new Date(this.sessionData.startTime).getTime(),
        screens: s,
        clicks: c,
        ageSelected: this.sessionData.ageSelected,
        emailSubmitted: this.sessionData.emailSubmitted,
        conversionRates: {
          heroToPreview:   pct(c.heroToPreview,   s.hero),
          previewToChooser:pct(c.previewToChooser,s.preview),
          chooserToCapture:pct(c.chooserToCapture,s.chooser),
          emailSubmission: pct(c.emailSubmit,     s.capture)
        },
        game1: {
          pairsFound: this.sessionData.game1.pairsFound,
          durationMs: this.sessionData.game1.durationMs
        },
        hypothesisTest: {
          targetEmailSubmitMin: '8%',
          targetEmailSubmitGood: '12%',
          currentEmailSubmit: pct(c.emailSubmit, s.capture)
        }
      };
  
      return report;
    }
  
    // ---------- Navigation helper ----------
    navigateWithTracking(url, action = 'nav', data = {}) {
      try { this.trackClick(action, data); } catch {}
      // Append lang & variant safely
      try {
        const currentLang = window.languageSystem?.currentLanguage || 
                            new URLSearchParams(location.search).get('lang') || 'de';
        const v = this.sessionData.variant || 'A';
  
        const u = new URL(url, location.href);
        if (!u.searchParams.get('lang'))    u.searchParams.set('lang', String(currentLang).toLowerCase());
        if (!u.searchParams.get('variant')) u.searchParams.set('variant', v);
  
        location.href = u.pathname + '?' + u.searchParams.toString();
      } catch (e) {
        console.warn('navigateWithTracking failed, falling back', e);
        location.href = url;
      }
    }
  
    // ---------- Reset (dev only) ----------
    resetSession() {
      localStorage.removeItem('grammarGamesSession');
      this.sessionData = this.loadSession();
      console.log('🔄 Analytics session reset');
      this.updateAnalyticsDisplay();
    }
  }
  
  // Create global instance
  window.analytics = new PrototypeAnalytics();
  
  // Convenience wrappers (so old inline handlers keep working)
  window.trackClick = (action, data) => window.analytics.trackClick(action, data);
  window.setVariant = (variant) => window.analytics.setVariant(variant);
  window.navigateWithTracking = (url, action, data) => window.analytics.navigateWithTracking(url, action, data);
  
  // Initialize variant from URL (or stored)
  document.addEventListener('DOMContentLoaded', () => {
    const p = new URLSearchParams(location.search);
    const v = (p.get('variant') || window.analytics.sessionData.variant || 'A').toUpperCase();
    if (['A','B'].includes(v)) window.analytics.setVariant(v);
  });
  
  // ---- OPTIONAL: Game 1 auto-hooks ----
  // If your card-game.html calls these manually, that’s fine. These are here as fallbacks.
  (function autoWireGame1(){
    const screen = window.analytics.getCurrentScreen();
    if (screen !== 'cardgame') return;
  
    // Start event on load (if page wants it)
    if (!window.__g1_started) {
      window.__g1_started = true;
      window.analytics.trackClick('game1_start', {});
    }
  
    // Expose helpers for the game code to call:
    window.analyticsGame1Pair = (pairCode) => window.analytics.trackClick('game1_pair', { pair: pairCode });
    window.analyticsGame1Complete = () => window.analytics.trackClick('game1_complete', {});
  })();
  