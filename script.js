// Global state management
let currentVariant = 'A';
let selectedAge = '';
let analytics = {
    heroViews: 0,
    previewViews: 0,
    chooserViews: 0,
    captureViews: 0,
    thankyouViews: 0,
    heroToPreviewClicks: 0,
    previewToChooserClicks: 0,
    chooserToCaptureClicks: 0,
    emailSubmissions: 0,
    ageSelections: { '4-6': 0, '7-10': 0 },
    moreGamesClicks: 0,
    restartClicks: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setVariant('A'); // Default to variant A
    trackScreenView('hero');
});

function initializeApp() {
    // Initialize analytics display
    updateAnalyticsDisplay();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start with hero screen
    showScreen('hero-screen');
}

function setupEventListeners() {
    // Email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', submitEmail);
    }
}

// A/B Testing Variants
function setVariant(variant) {
    currentVariant = variant;
    
    // Update variant buttons
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="setVariant('${variant}')"]`).classList.add('active');
    
    // Update content based on variant - use language system for translations
    if (window.languageSystem && window.languageSystem.updateDynamicContent) {
        window.languageSystem.updateDynamicContent();
    } else {
        // Fallback if language system is not ready
        console.log('Language system not ready, content will be updated when language system loads');
    }
    
    // Update analytics display
    document.getElementById('current-variant').textContent = variant;
    
    // Track variant selection
    trackClick(`variant-${variant}-selected`);
}

// Screen Navigation
function nextScreen(screenId) {
    showScreen(screenId);
    trackScreenView(screenId.replace('-screen', ''));
}

function previousScreen(screenId) {
    showScreen(screenId);
    trackScreenView(screenId.replace('-screen', ''));
}

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Age Selection
function selectAge(age) {
    selectedAge = age;
    
    // Update visual selection
    document.querySelectorAll('.age-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.age-card').classList.add('selected');
    
    // Track age selection
    analytics.ageSelections[age]++;
    
    // Update pack content based on age
    updatePackContent(age);
    
    // Auto-advance after selection
    setTimeout(() => {
        nextScreen('capture-screen');
        trackClick('age-to-capture');
    }, 1000);
}

function updatePackContent(age) {
    const packTitle = document.getElementById('pack-title');
    const packContents = document.getElementById('pack-contents');
    
    if (age === '4-6') {
        packTitle.textContent = 'Ihr Starter-Pack für 4-6 Jahre:';
        packContents.innerHTML = `
            <div class="pack-item">
                <div class="icon">🐱</div>
                <span>Tier-Wörter Sortier-Spiel</span>
            </div>
            <div class="pack-item">
                <div class="icon">🌈</div>
                <span>Farben-Adjektive Memory</span>
            </div>
            <div class="pack-item">
                <div class="icon">🏃‍♂️</div>
                <span>Action-Verben Pantomime</span>
            </div>
            <div class="pack-item">
                <div class="icon">📖</div>
                <span>Eltern-Anleitung (einfach erklärt)</span>
            </div>
        `;
    } else if (age === '7-10') {
        packTitle.textContent = 'Ihr Starter-Pack für 7-10 Jahre:';
        packContents.innerHTML = `
            <div class="pack-item">
                <div class="icon">📝</div>
                <span>Sätze-Konstruktor Spiel</span>
            </div>
            <div class="pack-item">
                <div class="icon">⚡</div>
                <span>Zeit-Formen-Quiz Karten</span>
            </div>
            <div class="pack-item">
                <div class="icon">🔤</div>
                <span>Wortarten-Memory Advanced</span>
            </div>
            <div class="pack-item">
                <div class="icon">🎯</div>
                <span>Fortgeschrittene Anleitung</span>
            </div>
        `;
    }
}

// Email Submission
function submitEmail(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const nameInput = document.getElementById('name-input');
    const submitBtn = document.getElementById('submit-btn');
    
    // Validate email
    if (!emailInput.value || !emailInput.value.includes('@')) {
        alert(window.languageSystem.t('validEmailRequired'));
        return;
    }
    
    // Show loading state
    submitBtn.textContent = '📧 Wird gesendet...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Track successful submission
        analytics.emailSubmissions++;
        trackClick('email-submitted');
        
        // Update thank you screen with selected age
        updateThankYouScreen();
        
        // Navigate to thank you screen
        nextScreen('thankyou-screen');
        
        // Reset form
        emailInput.value = '';
        nameInput.value = '';
        submitBtn.textContent = '🎁 Kostenloses Starter-Pack erhalten';
        submitBtn.disabled = false;
    }, 1500);
}

function updateThankYouScreen() {
    const selectedAgeText = document.getElementById('selected-age-text');
    if (selectedAge) {
        selectedAgeText.textContent = `Spiele für ${selectedAge}-Jährige bereit`;
    }
}

// Analytics and Tracking
function trackClick(action) {
    console.log(`🎯 Click tracked: ${action} (Variant: ${currentVariant})`);
    
    // Update specific analytics
    switch (action) {
        case 'hero-to-preview':
            analytics.heroToPreviewClicks++;
            break;
        case 'preview-to-chooser':
            analytics.previewToChooserClicks++;
            break;
        case 'chooser-to-capture':
        case 'age-to-capture':
            analytics.chooserToCaptureClicks++;
            break;
        case 'more-games':
            analytics.moreGamesClicks++;
            break;
        case 'restart':
            analytics.restartClicks++;
            break;
    }
    
    updateAnalyticsDisplay();
}

function trackScreenView(screen) {
    console.log(`📊 Screen view: ${screen} (Variant: ${currentVariant})`);
    
    // Update screen view counts
    switch (screen) {
        case 'hero':
            analytics.heroViews++;
            break;
        case 'preview':
            analytics.previewViews++;
            break;
        case 'chooser':
            analytics.chooserViews++;
            break;
        case 'capture':
            analytics.captureViews++;
            break;
        case 'thankyou':
            analytics.thankyouViews++;
            break;
    }
    
    updateAnalyticsDisplay();
}

function updateAnalyticsDisplay() {
    // Calculate CTR percentages
    const heroCTR = analytics.heroViews > 0 ? 
        ((analytics.heroToPreviewClicks / analytics.heroViews) * 100).toFixed(1) : '0.0';
    
    const previewCTR = analytics.previewViews > 0 ? 
        ((analytics.previewToChooserClicks / analytics.previewViews) * 100).toFixed(1) : '0.0';
    
    const chooserCTR = analytics.chooserViews > 0 ? 
        ((analytics.chooserToCaptureClicks / analytics.chooserViews) * 100).toFixed(1) : '0.0';
    
    const emailSubmitRate = analytics.captureViews > 0 ? 
        ((analytics.emailSubmissions / analytics.captureViews) * 100).toFixed(1) : '0.0';
    
    // Update display
    document.getElementById('ctr-hero-preview').textContent = `${heroCTR}%`;
    document.getElementById('ctr-preview-chooser').textContent = `${previewCTR}%`;
    document.getElementById('ctr-chooser-capture').textContent = `${chooserCTR}%`;
    document.getElementById('email-submit-rate').textContent = `${emailSubmitRate}%`;
    
    // Color code based on targets (8-12% target for email submission)
    const emailRateElement = document.getElementById('email-submit-rate');
    const rate = parseFloat(emailSubmitRate);
    if (rate >= 12) {
        emailRateElement.style.color = '#4CAF50'; // Green - Excellent
    } else if (rate >= 8) {
        emailRateElement.style.color = '#FFC107'; // Yellow - Good
    } else {
        emailRateElement.style.color = '#ff6b6b'; // Red - Below target
    }
}

// Additional Features
function showMoreGames() {
    alert(window.languageSystem.t('additionalGamesMessage'));
    trackClick('more-games-modal-viewed');
}

function resetToHome() {
    // Reset state
    selectedAge = '';
    document.querySelectorAll('.age-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Go back to hero
    showScreen('hero-screen');
    trackScreenView('hero');
}

function toggleAnalytics() {
    const panel = document.getElementById('analytics-panel');
    const button = panel.querySelector('.toggle-btn');
    
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        button.textContent = 'Hide';
    } else {
        panel.classList.add('hidden');
        button.textContent = 'Show';
    }
}

// Utility Functions
function generateReport() {
    const report = {
        variant: currentVariant,
        timestamp: new Date().toISOString(),
        metrics: {
            totalViews: {
                hero: analytics.heroViews,
                preview: analytics.previewViews,
                chooser: analytics.chooserViews,
                capture: analytics.captureViews,
                thankyou: analytics.thankyouViews
            },
            clickthrough: {
                heroToPreview: `${((analytics.heroToPreviewClicks / analytics.heroViews) * 100).toFixed(1)}%`,
                previewToChooser: `${((analytics.previewToChooserClicks / analytics.previewViews) * 100).toFixed(1)}%`,
                chooserToCapture: `${((analytics.chooserToCaptureClicks / analytics.chooserViews) * 100).toFixed(1)}%`,
                emailSubmissions: `${((analytics.emailSubmissions / analytics.captureViews) * 100).toFixed(1)}%`
            },
            ageDistribution: analytics.ageSelections,
            totalEmailSubmissions: analytics.emailSubmissions,
            hypothesisValidation: {
                target: '8-12%',
                actual: `${((analytics.emailSubmissions / analytics.captureViews) * 100).toFixed(1)}%`,
                success: (analytics.emailSubmissions / analytics.captureViews) * 100 >= 8
            }
        }
    };
    
    return report;
}

// Debugging function for testing
function simulateUserJourney() {
    console.log('🤖 Simulating user journey...');
    
    // Simulate clicks through the funnel
    setTimeout(() => trackClick('hero-to-preview'), 500);
    setTimeout(() => nextScreen('preview-screen'), 1000);
    setTimeout(() => trackClick('preview-to-chooser'), 1500);
    setTimeout(() => nextScreen('chooser-screen'), 2000);
    setTimeout(() => selectAge('7-10'), 2500);
    setTimeout(() => {
        document.getElementById('email-input').value = 'test@example.com';
        submitEmail({ preventDefault: () => {} });
    }, 3500);
}

// Export for testing
window.grammarGamesPrototype = {
    analytics,
    generateReport,
    simulateUserJourney,
    setVariant,
    trackClick,
    trackScreenView
};
