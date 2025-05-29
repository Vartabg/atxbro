// ATXBRO Austin Location-Aware Experience
class ATXBROApp {
  constructor() {
    this.currentCard = 0;
    this.totalCards = 6;
    this.cardContainer = document.getElementById('cardContainer');
    this.progressDots = document.querySelectorAll('.progress-dots .dot');
    this.weirdLevel = 3;
    this.easterEggCount = 0;
    this.currentNeighborhood = null;
    
    this.austinNeighborhoods = {
      downtown: {
        name: "Downtown",
        vibe: "urban core",
        colors: ["#4A90A4", "#2C5F70"],
        emoji: "🏛️",
        recommendations: [
          "🏛️ Texas State Capitol tours",
          "🚶‍♀️ Lady Bird Lake hike & bike trail",
          "🌮 Congress Avenue food trucks",
          "🦇 Congress Bridge bats at sunset"
        ]
      },
      sixthst: {
        name: "6th Street",
        vibe: "party district",
        colors: ["#FF6B9D", "#8B5A96"],
        emoji: "🎸",
        recommendations: [
          "🎵 Live music at historic venues",
          "🍺 Craft cocktails at rooftop bars",
          "🌮 Late night taco trucks",
          "📸 Neon sign photo ops"
        ]
      },
      soco: {
        name: "South Congress",
        vibe: "keep it weird",
        colors: ["#E8A87C", "#C44536"],
        emoji: "🛍️",
        recommendations: [
          "👢 Allen's Boots - iconic cowboy gear",
          "🛍️ Vintage shopping and boutiques",
          "🌮 Food trailers at SoCo",
          "📷 'I love you so much' mural"
        ]
      },
      east: {
        name: "East Austin",
        vibe: "artsy & hip",
        colors: ["#7BA05B", "#39FF14"],
        emoji: "🎨",
        recommendations: [
          "🎨 Street art and mural tours",
          "🍺 Craft brewery hopping",
          "🚚 Food truck park adventures",
          "🎪 Unique vintage finds"
        ]
      },
      rainey: {
        name: "Rainey Street",
        vibe: "bungalow bars",
        colors: ["#8B5A96", "#FF6B9D"],
        emoji: "🍻",
        recommendations: [
          "🏠 Historic bungalow bars",
          "🍹 Container bar experiences",
          "🌅 Rooftop patios with skyline views",
          "🎵 Live music in intimate venues"
        ]
      },
      zilker: {
        name: "Zilker",
        vibe: "outdoorsy",
        colors: ["#7BA05B", "#4A90A4"],
        emoji: "🌳",
        recommendations: [
          "🏊‍♀️ Barton Springs Pool year-round",
          "⛳ Disc golf at Zilker Park",
          "🎪 Austin City Limits festival grounds",
          "🧘‍♀️ Yoga on the great lawn"
        ]
      }
    };

    this.init();
  }

  init() {
    this.setupSwipeHandlers();
    this.updateProgressDots();
    this.showGestureHints();
    
    // Make visitNeighborhood globally accessible
    window.visitNeighborhood = (neighborhoodKey) => {
      this.visitNeighborhood(neighborhoodKey);
    };
  }

  visitNeighborhood(neighborhoodKey) {
    const neighborhood = this.austinNeighborhoods[neighborhoodKey];
    if (!neighborhood) return;

    this.currentNeighborhood = neighborhood;
    this.onNeighborhoodChange(neighborhood);
  }

  onNeighborhoodChange(neighborhood) {
    // Update location display
    document.getElementById('currentLocation').textContent = 
      `${neighborhood.name} - ${neighborhood.vibe}`;

    // Change card colors
    const welcomeCard = document.getElementById('welcomeCard');
    welcomeCard.style.background = 
      `linear-gradient(135deg, ${neighborhood.colors[0]}, ${neighborhood.colors[1]})`;

    // Show location-specific recommendations
    this.showLocationRecommendations(neighborhood);

    // Show discovery notification
    this.showLocationDiscovery(neighborhood);

    // Trigger location emoji
    this.createFloatingEmoji(neighborhood.emoji);

    // Increase weird level
    this.increaseWeirdLevel();
  }

  showLocationRecommendations(neighborhood) {
    const container = document.getElementById('locationRecommendations');
    container.innerHTML = `
      <h3>Explore ${neighborhood.name}</h3>
      ${neighborhood.recommendations.map(rec => 
        `<div class="recommendation">${rec}</div>`
      ).join('')}
    `;
    container.style.display = 'block';
  }

  showLocationDiscovery(neighborhood) {
    const discovery = document.createElement('div');
    discovery.style.cssText = `
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, ${neighborhood.colors[0]}, ${neighborhood.colors[1]});
      color: white;
      padding: 1rem 2rem;
      border-radius: 25px;
      z-index: 10000;
      font-weight: bold;
      animation: slideInOut 4s ease-out;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    discovery.innerHTML = `
      <div>📍 Welcome to ${neighborhood.name}</div>
      <div style="font-size: 0.9rem; opacity: 0.9;">${neighborhood.vibe}</div>
    `;

    // Add animation if not exists
    if (!document.getElementById('location-animations')) {
      const style = document.createElement('style');
      style.id = 'location-animations';
      style.textContent = `
        @keyframes slideInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(discovery);
    setTimeout(() => discovery.remove(), 4000);
  }

  setupSwipeHandlers() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.cardContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    });

    this.cardContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      const currentTranslate = -this.currentCard * 100;
      const dragTranslate = (diffX / window.innerWidth) * 100;
      this.cardContainer.style.transform = `translateX(${currentTranslate + dragTranslate}vw)`;
    });

    this.cardContainer.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;
      const threshold = 50;

      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
        if (diffY < 0) { // Swipe up
          this.triggerSwipeUpEasterEgg();
        }
      } else if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && this.currentCard > 0) {
          this.currentCard--;
        } else if (diffX < 0 && this.currentCard < this.totalCards - 1) {
          this.currentCard++;
        }
      }

      this.updateCardPosition();
      this.updateProgressDots();
    });

    this.progressDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentCard = index;
        this.updateCardPosition();
        this.updateProgressDots();
      });
    });
  }

  triggerSwipeUpEasterEgg() {
    const austinEmojis = ['🤠', '🌮', '🎸', '🦇', '🛸', '🎪', '👽', '🌵', '🔥', '⚡'];
    const randomEmoji = austinEmojis[Math.floor(Math.random() * austinEmojis.length)];
    this.createFloatingEmoji(randomEmoji);
    this.increaseWeirdLevel();
    this.easterEggCount++;
  }

  createFloatingEmoji(emoji) {
    const eggElement = document.createElement('div');
    eggElement.className = 'easter-egg';
    eggElement.textContent = emoji;
    eggElement.style.cssText = `
      position: fixed;
      font-size: 2rem;
      animation: easterEggFloat 3s ease-out forwards;
      pointer-events: none;
      z-index: 9999;
      left: ${Math.random() * 80 + 10}%;
      top: ${Math.random() * 60 + 20}%;
    `;
    
    document.getElementById('easterEggs').appendChild(eggElement);
    setTimeout(() => eggElement.remove(), 3000);
  }

  increaseWeirdLevel() {
    if (this.weirdLevel < 5) {
      this.weirdLevel++;
      this.updateWeirdMeter();
    }
  }

  updateWeirdMeter() {
    const dots = document.querySelectorAll('#weirdDots .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index < this.weirdLevel);
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

  showGestureHints() {
    setTimeout(() => {
      const hints = document.querySelector('.gesture-hints');
      if (hints) hints.style.opacity = '0';
    }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ATXBROApp();
});
