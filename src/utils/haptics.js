// Austin-themed haptic feedback system
class AustinHaptics {
  constructor() {
    this.isSupported = 'vibrate' in navigator;
    this.patterns = {
      // Austin-themed vibration patterns
      welcome: [100, 50, 100], // Two quick pulses
      swipe: [50], // Quick tap
      easterEgg: [100, 100, 200, 100, 300], // "Keep Austin Weird" rhythm
      achievement: [200, 100, 200, 100, 200], // Achievement unlocked
      error: [300, 100, 300], // Error pattern
      success: [100, 50, 100, 50, 200] // Success pattern
    };
  }

  trigger(pattern) {
    if (!this.isSupported) return;
    
    if (this.patterns[pattern]) {
      navigator.vibrate(this.patterns[pattern]);
    } else {
      navigator.vibrate(50); // Default short vibration
    }
  }

  // Austin-specific feedback
  keepAustinWeird() {
    this.trigger('easterEgg');
  }

  swipeFeedback() {
    this.trigger('swipe');
  }

  achievementUnlocked() {
    this.trigger('achievement');
  }

  welcomeToAustin() {
    this.trigger('welcome');
  }
}

// Export for global use
window.AustinHaptics = new AustinHaptics();
