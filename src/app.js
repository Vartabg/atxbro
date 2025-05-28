// Simple swipe functionality
class ATXBROCardApp {
  constructor() {
    this.currentCard = 0;
    this.totalCards = 6;
    this.cardContainer = document.getElementById('cardContainer');
    this.progressDots = document.querySelectorAll('.progress-dots .dot');
    
    this.setupSwipeHandlers();
    this.updateProgressDots();
  }

  setupSwipeHandlers() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.cardContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.cardContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      // Real-time drag effect
      const currentTranslate = -this.currentCard * 100;
      const dragTranslate = (diffX / window.innerWidth) * 100;
      this.cardContainer.style.transform = `translateX(${currentTranslate + dragTranslate}vw)`;
    });

    this.cardContainer.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      const threshold = 50;

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && this.currentCard > 0) {
          // Swipe right - go to previous card
          this.currentCard--;
        } else if (diffX < 0 && this.currentCard < this.totalCards - 1) {
          // Swipe left - go to next card
          this.currentCard++;
        }
      }

      this.updateCardPosition();
      this.updateProgressDots();
    });

    // Progress dot navigation
    this.progressDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentCard = index;
        this.updateCardPosition();
        this.updateProgressDots();
      });
    });
  }

  updateCardPosition() {
    const translateX = -this.currentCard * 100;
    this.cardContainer.style.transform = `translateX(${translateX}vw)`;
  }

  updateProgressDots() {
    this.progressDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentCard);
    });
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ATXBROCardApp();
});
