class AgroMedPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 12;  // CHANGED FROM 11 TO 12
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');
        this.progressFill = document.getElementById('progressFill');

        // Animation and interaction states
        this.isTransitioning = false;
        this.autoAdvanceTimer = null;
        this.autoAdvanceEnabled = false;

        this.init();
    }

    init() {
        // Set initial state
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();

        // Add event listeners with improved handling
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.previousSlide();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.nextSlide();
        });

        // Also add mousedown events for better responsiveness
        this.prevBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.nextBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Touch/swipe support for mobile
        this.addTouchSupport();

        // Mouse wheel navigation
        this.addWheelSupport();

        // Visibility change handling (pause when tab is not active)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());

        // Set total slides display
        this.totalSlidesSpan.textContent = this.totalSlides;

        // Initialize accessibility features
        this.initAccessibility();

        // Add agricultural theme enhancements
        this.addThemeEnhancements();

        console.log('🌱 Agro Med Presentation initialized successfully!');
        console.log('Navigation: Arrow keys, mouse wheel, or touch gestures');
        console.log('Help: Press ? for keyboard shortcuts');
    }

    showSlide(slideNumber, direction = 'next') {
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return false;
        }

        // Prevent rapid clicking during transitions
        if (this.isTransitioning) {
            return false;
        }

        this.isTransitioning = true;

        // Remove active class from current slide
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index + 1 === this.currentSlide) {
                slide.classList.add(direction === 'next' ? 'prev' : 'next');
            }
        });

        // Add active class to target slide with animation
        const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (targetSlide) {
            // Reset animation delay for slide content
            this.resetContentAnimations(targetSlide);

            setTimeout(() => {
                targetSlide.classList.add('active');
                this.playSlideEntranceEffects(targetSlide);
            }, 50);
        }

        this.currentSlide = slideNumber;
        this.updateSlideCounter();
        this.updateProgressBar();
        this.updateNavigationButtons();

        // Update page title for better accessibility
        this.updatePageTitle();

        // Re-enable transitions after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 400);

        // Announce slide change for screen readers
        this.announceSlideChange();

        return true;
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides && !this.isTransitioning) {
            this.showSlide(this.currentSlide + 1, 'next');
            this.pauseAutoAdvance();
        }
    }

    previousSlide() {
        if (this.currentSlide > 1 && !this.isTransitioning) {
            this.showSlide(this.currentSlide - 1, 'prev');
            this.pauseAutoAdvance();
        }
    }

    goToSlide(slideNumber) {
        if (this.isTransitioning) return false;
        const direction = slideNumber > this.currentSlide ? 'next' : 'prev';
        return this.showSlide(slideNumber, direction);
    }

    updateSlideCounter() {
        this.currentSlideSpan.textContent = this.currentSlide;

        // Add slide type indicator
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        const slideTitle = currentSlideElement?.querySelector('.slide-title, .main-title')?.textContent || `Slide ${this.currentSlide}`;

        // Update browser history for bookmarking
        if (history.replaceState) {
            history.replaceState(null, slideTitle, `#slide-${this.currentSlide}`);
        }
    }

    updateProgressBar() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;

        // Add progress bar accessibility
        this.progressFill.setAttribute('aria-valuenow', this.currentSlide);
        this.progressFill.setAttribute('aria-valuemax', this.totalSlides);
    }

    updateNavigationButtons() {
        // Disable/enable navigation buttons based on current slide
        const isFirstSlide = this.currentSlide === 1;
        const isLastSlide = this.currentSlide === this.totalSlides;

        this.prevBtn.disabled = isFirstSlide;
        this.nextBtn.disabled = isLastSlide;

        // Update button accessibility
        this.prevBtn.setAttribute('aria-disabled', isFirstSlide);
        this.nextBtn.setAttribute('aria-disabled', isLastSlide);

        // Update button tooltips
        this.prevBtn.title = isFirstSlide ? 'Already at first slide' : 'Previous slide';
        this.nextBtn.title = isLastSlide ? 'Already at last slide' : 'Next slide';

        // Visual feedback for disabled state
        if (isFirstSlide) {
            this.prevBtn.style.opacity = '0.5';
            this.prevBtn.style.cursor = 'not-allowed';
        } else {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
        }

        if (isLastSlide) {
            this.nextBtn.style.opacity = '0.5';
            this.nextBtn.style.cursor = 'not-allowed';
        } else {
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        }
    }

    handleKeyboard(event) {
        // Prevent default behavior for navigation keys
        const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Space', 'Home', 'End', 'PageUp', 'PageDown'];
        if (navigationKeys.includes(event.key)) {
            event.preventDefault();
        }

        // Don't handle keyboard if transitioning
        if (this.isTransitioning) return;

        switch (event.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
            case 'PageDown':
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                this.previousSlide();
                break;
            case 'Home':
                this.goToSlide(1);
                break;
            case 'End':
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                this.hideKeyboardHelp();
                break;
            case '?':
                this.toggleKeyboardHelp();
                break;
            case 'f':
            case 'F':
                if (event.ctrlKey || event.metaKey) return; // Don't interfere with browser find
                this.toggleFullscreen();
                break;
            case 'a':
            case 'A':
                if (event.ctrlKey || event.metaKey) return; // Don't interfere with select all
                this.toggleAutoAdvance();
                break;
        }
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;

        const slidesContainer = document.getElementById('slidesContainer');

        const handleTouchStart = (e) => {
            const touch = e.changedTouches[0];
            touchStartX = touch.screenX;
            touchStartY = touch.screenY;
            touchStartTime = Date.now();
        };

        const handleTouchEnd = (e) => {
            if (this.isTransitioning) return; // Prevent during transitions

            const touch = e.changedTouches[0];
            touchEndX = touch.screenX;
            touchEndY = touch.screenY;

            const touchDuration = Date.now() - touchStartTime;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            const minSwipeDistance = 50;
            const maxSwipeTime = 500; // milliseconds

            // Ignore if touch was too long (likely scrolling)
            if (touchDuration > maxSwipeTime) return;

            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        // Swipe right (go to previous slide)
                        this.previousSlide();
                    } else {
                        // Swipe left (go to next slide)
                        this.nextSlide();
                    }
                }
            }
        };

        slidesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slidesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    addWheelSupport() {
        let wheelTimeout;
        let isWheelActive = false;

        document.addEventListener('wheel', (e) => {
            if (this.isTransitioning || isWheelActive) return;

            // Prevent default scrolling
            e.preventDefault();

            isWheelActive = true;

            // Debounce wheel events
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else if (e.deltaY < 0) {
                    this.previousSlide();
                }

                // Reset wheel active state
                setTimeout(() => {
                    isWheelActive = false;
                }, 100);
            }, 50);
        }, { passive: false });
    }

    initAccessibility() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'slide-announcer';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);

        // Add progress bar accessibility
        this.progressFill.setAttribute('role', 'progressbar');
        this.progressFill.setAttribute('aria-label', 'Presentation progress');
        this.progressFill.setAttribute('aria-valuemin', '1');
        this.progressFill.setAttribute('aria-valuenow', this.currentSlide);
        this.progressFill.setAttribute('aria-valuemax', this.totalSlides);

        // Add slide navigation landmarks
        this.slides.forEach((slide, index) => {
            slide.setAttribute('role', 'region');
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.totalSlides}`);
        });
    }

    updatePageTitle() {
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        const slideTitle = currentSlideElement?.querySelector('.slide-title, .main-title')?.textContent;

        if (slideTitle) {
            document.title = `${slideTitle} - Agro Med Presentation`;
        } else {
            document.title = `Slide ${this.currentSlide} - Agro Med Presentation`;
        }
    }

    announceSlideChange() {
        const announcer = document.getElementById('slide-announcer');
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        const slideTitle = currentSlideElement?.querySelector('.slide-title, .main-title')?.textContent || `Slide ${this.currentSlide}`;

        if (announcer) {
            announcer.textContent = `${slideTitle}, slide ${this.currentSlide} of ${this.totalSlides}`;
        }
    }

    resetContentAnimations(slideElement) {
        const elements = slideElement.querySelectorAll('.slide-content > *');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        });
    }

    playSlideEntranceEffects(slideElement) {
        // Add special effects for different slide types
        const slideIcon = slideElement.querySelector('.slide-icon, .title-icon, .closing-icon');
        if (slideIcon) {
            slideIcon.style.animation = 'bounceIn 0.8s ease-out';
        }

        // Animate list items sequentially
        const listItems = slideElement.querySelectorAll('.bullet-list li, .numbered-list li');
        listItems.forEach((item, index) => {
            item.style.animationDelay = `${0.4 + (index * 0.1)}s`;
        });
    }

    handleVisibilityChange() {
        if (document.hidden && this.autoAdvanceEnabled) {
            this.pauseAutoAdvance();
        } else if (!document.hidden && this.autoAdvanceEnabled) {
            this.startAutoAdvance();
        }
    }

    // Auto-advance functionality
    startAutoAdvance(delay = 10000) { // 10 seconds default
        this.pauseAutoAdvance(); // Clear any existing timer

        this.autoAdvanceTimer = setTimeout(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
                this.startAutoAdvance(delay);
            } else {
                this.autoAdvanceEnabled = false;
                this.showAutoAdvanceMessage('Presentation completed');
            }
        }, delay);

        this.autoAdvanceEnabled = true;
        this.showAutoAdvanceMessage(`Auto-advance enabled (${delay/1000}s intervals)`);
    }

    pauseAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }

    toggleAutoAdvance() {
        if (this.autoAdvanceEnabled) {
            this.pauseAutoAdvance();
            this.autoAdvanceEnabled = false;
            this.showAutoAdvanceMessage('Auto-advance disabled');
        } else {
            this.startAutoAdvance();
        }
    }

    showAutoAdvanceMessage(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 24px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Keyboard help functionality
    toggleKeyboardHelp() {
        let helpOverlay = document.querySelector('.keyboard-help-overlay');
        if (!helpOverlay) {
            helpOverlay = this.createKeyboardHelpOverlay();
            document.body.appendChild(helpOverlay);
        }

        helpOverlay.classList.toggle('hidden');
    }

    hideKeyboardHelp() {
        const helpOverlay = document.querySelector('.keyboard-help-overlay');
        if (helpOverlay) {
            helpOverlay.classList.add('hidden');
        }
    }

    createKeyboardHelpOverlay() {
        const helpOverlay = document.createElement('div');
        helpOverlay.className = 'keyboard-help-overlay hidden';

        helpOverlay.innerHTML = `
            <div class="keyboard-help-content">
                <h3>🌱 Keyboard Shortcuts</h3>
                <ul>
                    <li><span>Next slide</span><kbd>→</kbd></li>
                    <li><span>Previous slide</span><kbd>←</kbd></li>
                    <li><span>First slide</span><kbd>Home</kbd></li>
                    <li><span>Last slide</span><kbd>End</kbd></li>
                    <li><span>Auto-advance</span><kbd>A</kbd></li>
                    <li><span>Fullscreen</span><kbd>F</kbd></li>
                    <li><span>Close help</span><kbd>Esc</kbd></li>
                </ul>
            </div>
        `;

        // Close on outside click
        helpOverlay.addEventListener('click', (e) => {
            if (e.target === helpOverlay) {
                this.hideKeyboardHelp();
            }
        });

        return helpOverlay;
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    addThemeEnhancements() {
        // Add subtle background animations
        const backgroundElement = document.querySelector('.agricultural-background');
        if (backgroundElement) {
            setInterval(() => {
                backgroundElement.style.backgroundPosition = 
                    Math.random() * 100 + '% ' + Math.random() * 100 + '%';
            }, 5000);
        }

        // Add hover effects to navigation
        [this.prevBtn, this.nextBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('mouseenter', () => {
                    btn.style.transform = 'scale(1.1)';
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = btn.disabled ? 'scale(1)' : 'scale(1)';
                });
            }
        });

        // Add subtle parallax effect to background
        document.addEventListener('mousemove', (e) => {
            const backgroundElement = document.querySelector('.agricultural-background::before');
            if (backgroundElement) {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                backgroundElement.style.backgroundPosition = `${x}% ${y}%`;
            }
        });
    }

    // Utility methods for external control
    goToSlide(slideNumber) {
        this.showSlide(slideNumber);
    }

    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }

    // Export presentation data (useful for analytics or saving state)
    getState() {
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            autoAdvanceEnabled: this.autoAdvanceEnabled,
            timestamp: new Date().toISOString()
        };
    }

    // Load presentation state
    setState(state) {
        if (state.currentSlide && state.currentSlide >= 1 && state.currentSlide <= this.totalSlides) {
            this.showSlide(state.currentSlide);
        }

        if (state.autoAdvanceEnabled) {
            this.startAutoAdvance();
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global instance
    window.agroMedPresentation = new AgroMedPresentation();

    // Add some helpful global functions
    window.nextSlide = () => window.agroMedPresentation.nextSlide();
    window.prevSlide = () => window.agroMedPresentation.previousSlide();
    window.goToSlide = (n) => window.agroMedPresentation.goToSlide(n);
    window.toggleAutoAdvance = () => window.agroMedPresentation.toggleAutoAdvance();

    // Add debugging helpers (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🌱 Agro Med Presentation loaded in development mode');
        console.log('Available commands: nextSlide(), prevSlide(), goToSlide(n), toggleAutoAdvance()');

        // Add development shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                switch(e.key) {
                    case 'A':
                        e.preventDefault();
                        window.agroMedPresentation.toggleAutoAdvance();
                        console.log('Auto-advance toggled');
                        break;
                    case 'S':
                        e.preventDefault();
                        console.log('Presentation state:', window.agroMedPresentation.getState());
                        break;
                }
            }
        });
    }
});

// Handle page unload (save state if needed)
window.addEventListener('beforeunload', function() {
    if (window.agroMedPresentation) {
        // Could save state to localStorage here
        const state = window.agroMedPresentation.getState();
        sessionStorage.setItem('agroMedPresentationState', JSON.stringify(state));
    }
});

// Handle page load (restore state if needed)
window.addEventListener('load', function() {
    const savedState = sessionStorage.getItem('agroMedPresentationState');
    if (savedState && window.agroMedPresentation) {
        try {
            const state = JSON.parse(savedState);
            // Only restore if it's from the same session (within last 10 minutes)
            const stateTime = new Date(state.timestamp);
            const now = new Date();
            if (now - stateTime < 10 * 60 * 1000) { // 10 minutes
                window.agroMedPresentation.setState(state);
            }
        } catch (e) {
            console.log('Could not restore presentation state:', e);
        }
    }
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Agro Med Presentation Error:', e);
    // Could send error to analytics here
});