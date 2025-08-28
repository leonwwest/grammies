// Grammar Games Prototype Analytics
// Cross-screen tracking using localStorage

class PrototypeAnalytics {
    constructor() {
        this.sessionData = this.loadSession();
        this.initializeTracking();
    }

    loadSession() {
        const stored = localStorage.getItem('grammarGamesSession');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize new session
        return {
            sessionId: this.generateSessionId(),
            variant: 'A',
            startTime: new Date().toISOString(),
            screens: {
                hero: 0,
                preview: 0,
                chooser: 0,
                capture: 0,
                thankyou: 0
            },
            clicks: {
                heroToPreview: 0,
                previewToChooser: 0,
                chooserToCapture: 0,
                emailSubmit: 0,
                backClicks: 0
            },
            ageSelected: null,
            emailSubmitted: false,
            currentScreen: 'hero'
        };
    }

    saveSession() {
        localStorage.setItem('grammarGamesSession', JSON.stringify(this.sessionData));
    }

    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    initializeTracking() {
        // Track page load
        this.trackScreenView(this.getCurrentScreen());
        
        // Display analytics if panel exists
        this.updateAnalyticsDisplay();
        
        console.log('📊 Analytics initialized for session:', this.sessionData.sessionId);
    }

    getCurrentScreen() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        switch (filename) {
            case 'index.html':
            case '':
                return 'hero';
            case 'preview.html':
                return 'preview';
            case 'chooser.html':
                return 'chooser';
            case 'capture.html':
                return 'capture';
            case 'thankyou.html':
                return 'thankyou';
            default:
                return 'unknown';
        }
    }

    trackScreenView(screen) {
        if (this.sessionData.screens[screen] !== undefined) {
            this.sessionData.screens[screen]++;
            this.sessionData.currentScreen = screen;
            this.saveSession();
            
            console.log(`📊 Screen view: ${screen} (Total: ${this.sessionData.screens[screen]})`);
            this.updateAnalyticsDisplay();
        }
    }

    trackClick(action, data = {}) {
        console.log(`🎯 Click tracked: ${action}`, data);
        
        switch (action) {
            case 'hero-to-preview':
                this.sessionData.clicks.heroToPreview++;
                break;
            case 'preview-to-chooser':
                this.sessionData.clicks.previewToChooser++;
                break;
            case 'chooser-to-capture':
                this.sessionData.clicks.chooserToCapture++;
                break;
            case 'age-selected':
                this.sessionData.ageSelected = data.age;
                break;
            case 'email-submit':
                this.sessionData.clicks.emailSubmit++;
                this.sessionData.emailSubmitted = true;
                break;
            case 'back-click':
                this.sessionData.clicks.backClicks++;
                break;
            case 'variant-change':
                this.sessionData.variant = data.variant;
                break;
        }
        
        this.saveSession();
        this.updateAnalyticsDisplay();
    }

    setVariant(variant) {
        this.sessionData.variant = variant;
        this.trackClick('variant-change', { variant });
        
        // Update UI if variant elements exist
        this.updateVariantUI(variant);
    }

    updateVariantUI(variant) {
        // Update variant buttons
        document.querySelectorAll('.variant-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(variant === 'A' ? '10-Min' : 'Multisensory')) {
                btn.classList.add('active');
            }
        });

        // Update content based on variant - use language system for translations
        if (window.languageSystem && window.languageSystem.updateDynamicContent) {
            window.languageSystem.updateDynamicContent();
        } else {
            console.log('Language system not ready for variant update');
        }
    }

    updateAnalyticsDisplay() {
        // Calculate conversion rates
        const heroViews = this.sessionData.screens.hero || 1;
        const previewViews = this.sessionData.screens.preview || 1;
        const chooserViews = this.sessionData.screens.chooser || 1;
        const captureViews = this.sessionData.screens.capture || 1;

        const ctrHeroPreview = ((this.sessionData.clicks.heroToPreview / heroViews) * 100).toFixed(1);
        const ctrPreviewChooser = ((this.sessionData.clicks.previewToChooser / previewViews) * 100).toFixed(1);
        const ctrChooserCapture = ((this.sessionData.clicks.chooserToCapture / chooserViews) * 100).toFixed(1);
        const emailSubmitRate = ((this.sessionData.clicks.emailSubmit / captureViews) * 100).toFixed(1);

        // Update display elements if they exist
        const elements = {
            'ctr-hero-preview': `${ctrHeroPreview}%`,
            'ctr-preview-chooser': `${ctrPreviewChooser}%`,
            'ctr-chooser-capture': `${ctrChooserCapture}%`,
            'email-submit-rate': `${emailSubmitRate}%`,
            'current-variant': this.sessionData.variant,
            'current-screen': this.sessionData.currentScreen,
            'total-screens': Object.values(this.sessionData.screens).reduce((a, b) => a + b, 0)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        // Color code email submit rate
        const emailRateElement = document.getElementById('email-submit-rate');
        if (emailRateElement) {
            const rate = parseFloat(emailSubmitRate);
            if (rate >= 12) {
                emailRateElement.style.color = '#4CAF50'; // Green
            } else if (rate >= 8) {
                emailRateElement.style.color = '#FFC107'; // Yellow
            } else {
                emailRateElement.style.color = '#ff6b6b'; // Red
            }
        }
    }

    generateReport() {
        const report = {
            sessionId: this.sessionData.sessionId,
            variant: this.sessionData.variant,
            duration: new Date() - new Date(this.sessionData.startTime),
            screenViews: this.sessionData.screens,
            clickEvents: this.sessionData.clicks,
            ageSelected: this.sessionData.ageSelected,
            emailSubmitted: this.sessionData.emailSubmitted,
            conversionRates: {
                heroToPreview: ((this.sessionData.clicks.heroToPreview / (this.sessionData.screens.hero || 1)) * 100).toFixed(1) + '%',
                previewToChooser: ((this.sessionData.clicks.previewToChooser / (this.sessionData.screens.preview || 1)) * 100).toFixed(1) + '%',
                chooserToCapture: ((this.sessionData.clicks.chooserToCapture / (this.sessionData.screens.chooser || 1)) * 100).toFixed(1) + '%',
                emailSubmission: ((this.sessionData.clicks.emailSubmit / (this.sessionData.screens.capture || 1)) * 100).toFixed(1) + '%'
            },
            hypothesisTest: {
                target: '8-12%',
                actual: ((this.sessionData.clicks.emailSubmit / (this.sessionData.screens.capture || 1)) * 100).toFixed(1) + '%',
                success: (this.sessionData.clicks.emailSubmit / (this.sessionData.screens.capture || 1)) * 100 >= 8
            }
        };

        console.log('📊 Analytics Report:', report);
        return report;
    }

    // Utility functions for navigation with tracking
    navigateWithTracking(url, trackAction, trackData = {}) {
        this.trackClick(trackAction, trackData);
        
        // Preserve language selection in navigation
        const currentLang = window.languageSystem ? window.languageSystem.currentLanguage : 'de';
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}lang=${currentLang}`;
        
        // Add variant to URL if not default
        if (this.sessionData.variant !== 'A') {
            url += `&variant=${this.sessionData.variant}`;
        }
        
        window.location.href = url;
    }

    // Reset session (for testing)
    resetSession() {
        localStorage.removeItem('grammarGamesSession');
        this.sessionData = this.loadSession();
        console.log('🔄 Analytics session reset');
        this.updateAnalyticsDisplay();
    }
}

// Global instance
window.analytics = new PrototypeAnalytics();

// Global functions for easy use in HTML
window.trackClick = (action, data) => window.analytics.trackClick(action, data);
window.setVariant = (variant) => window.analytics.setVariant(variant);
window.navigateWithTracking = (url, action, data) => window.analytics.navigateWithTracking(url, action, data);

// Initialize variant from URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const variantParam = urlParams.get('variant');
    if (variantParam && ['A', 'B'].includes(variantParam)) {
        window.analytics.setVariant(variantParam);
    } else {
        // Set to stored variant or default
        window.analytics.setVariant(window.analytics.sessionData.variant);
    }
});
