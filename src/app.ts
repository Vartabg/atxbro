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
        emoji: "ðŸ›ï¸",
        recommendations: [
          "ðŸ›ï¸ Texas State Capitol tours",
          "ðŸš¶â€â™€ï¸ Lady Bird Lake hike & bike trail",
          "ðŸŒ® Congress Avenue food trucks",
          "ðŸ¦‡ Congress Bridge bats at sunset"
        ]
      },
      sixthst: {
        name: "6th Street",
        vibe: "party district",
        colors: ["#FF6B9D", "#8B5A96"],
        emoji: "ðŸŽ¸",
        recommendations: [
          "ðŸŽµ Live music at historic venues",
          "ðŸº Craft cocktails at rooftop bars",
          "ðŸŒ® Late night taco trucks",
          "ðŸ“¸ Neon sign photo ops"
        ]
      },
      soco: {
        name: "South Congress",
        vibe: "keep it weird",
        colors: ["#E8A87C", "#C44536"],
        emoji: "ðŸ›ï¸",
        recommendations: [
          "ðŸ‘¢ Allen's Boots - iconic cowboy gear",
          "ðŸ›ï¸ Vintage shopping and boutiques",
          "ðŸŒ® Food trailers at SoCo",
          "ðŸ“· 'I love you so much' mural"
        ]
      },
      east: {
        name: "East Austin",
        vibe: "artsy & hip",
        colors: ["#7BA05B", "#39FF14"],
        emoji: "ðŸŽ¨",
        recommendations: [
          "ðŸŽ¨ Street art and mural tours",
          "ðŸº Craft brewery hopping",
          "ðŸšš Food truck park adventures",
          "ðŸŽª Unique vintage finds"
        ]
      },
      rainey: {
        name: "Rainey Street",
        vibe: "bungalow bars",
        colors: ["#8B5A96", "#FF6B9D"],
        emoji: "ðŸ»",
        recommendations: [
          "ðŸ  Historic bungalow bars",
          "ðŸ¹ Container bar experiences",
          "ðŸŒ… Rooftop patios with skyline views",
          "ðŸŽµ Live music in intimate venues"
        ]
      },
      zilker: {
        name: "Zilker",
        vibe: "outdoorsy",
        colors: ["#7BA05B", "#4A90A4"],
        emoji: "ðŸŒ³",
        recommendations: [
          "ðŸŠâ€â™€ï¸ Barton Springs Pool year-round",
          "â›³ Disc golf at Zilker Park",
          "ðŸŽª Austin City Limits festival grounds",
          "ðŸ§˜â€â™€ï¸ Yoga on the great lawn"
        ]
      }
    };

    // Initialize properties for MythBuster
    this.myths = [];
    this.currentMythIndex = 0;
    this.factRevealed = false;

    this.init();
  }

  init() {
    this.setupSwipeHandlers();
    this.updateProgressDots();
    this.showGestureHints();
    this.setupVetNavCollapsibles(); 
    this.setupInteractiveMythBuster(); 
    
    // Make visitNeighborhood globally accessible
    window.visitNeighborhood = (neighborhoodKey) => {
      this.visitNeighborhood(neighborhoodKey);
    };
  }

  // Method to set up VetNav collapsible sections
  setupVetNavCollapsibles() {
    const triggers = document.querySelectorAll('.vetnav-collapsible-trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = document.getElementById(trigger.getAttribute('aria-controls'));
        const icon = trigger.querySelector('.vetnav-toggle-icon');
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          content.style.display = 'none';
          trigger.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = 'â–¼';
        } else {
          content.style.display = 'block';
          trigger.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = 'â–²';
        }
      });
    });
  }

  // Method to set up Interactive Myth Buster
  setupInteractiveMythBuster() {
    this.myths = [
        {
            myth: "I make too much money for VA benefits.",
            fact: "Income doesn't disqualify you from many earned VA benefits like disability compensation or general healthcare enrollment. Eligibility often depends on service history and disability, not just income. Some programs, like Pension, do have income limits."
        },
        {
            myth: "I have been out of the military for too long to be eligible.",
            fact: "For most core VA benefits like healthcare and disability compensation, there's no 'expiration date' based on how long you've been out of the service."
        },
        {
            myth: "I'm not eligible because I never deployed or was in combat.",
            fact: "Deployment to a combat zone or direct combat experience is not a requirement for general VA healthcare eligibility or for many other VA benefits. Eligibility is typically rooted in active military service and discharge status."
        }
    ];
    this.currentMythIndex = 0;
    this.factRevealed = false;

    const mythTextElement = document.getElementById('current-myth-text');
    const factTextParagraphElement = document.getElementById('current-fact-text');
    const factContentElement = document.getElementById('current-fact-content');
    const button = document.getElementById('myth-buster-button');

    if (!mythTextElement || !factTextParagraphElement || !factContentElement || !button) {
        // console.warn("VetNav MythBuster elements not all found. Feature may not work correctly.");
        return;
    }

    const displayMyth = () => {
        mythTextElement.textContent = this.myths[this.currentMythIndex].myth;
        factContentElement.textContent = this.myths[this.currentMythIndex].fact;
        factTextParagraphElement.style.display = 'none';
        button.textContent = 'Reveal Fact';
        this.factRevealed = false;
    };

    button.addEventListener('click', () => {
        if (!this.factRevealed) {
            factTextParagraphElement.style.display = 'block';
            button.textContent = 'Next Myth';
            this.factRevealed = true;
        } else {
            this.currentMythIndex = (this.currentMythIndex + 1) % this.myths.length;
            displayMyth();
        }
    });

    if (this.myths.length > 0) {
        displayMyth();
    } else {
        const mythBusterContainer = document.querySelector('.vetnav-myth-buster');
        if (mythBusterContainer) mythBusterContainer.style.display = 'none';
    }
  }

  visitNeighborhood(neighborhoodKey) {
    const neighborhood = this.austinNeighborhoods[neighborhoodKey];
    if (!neighborhood) return;

    this.currentNeighborhood = neighborhood;
    this.onNeighborhoodChange(neighborhood);
  }

  onNeighborhoodChange(neighborhood) {
    document.getElementById('currentLocation').textContent = 
      `${neighborhood.name} - ${neighborhood.vibe}`;
    const welcomeCard = document.getElementById('welcomeCard');
    welcomeCard.style.background = 
      `linear-gradient(135deg, ${neighborhood.colors[0]}, ${neighborhood.colors[1]})`;
    this.showLocationRecommendations(neighborhood);
    this.showLocationDiscovery(neighborhood);
    this.createFloatingEmoji(neighborhood.emoji);
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
      <div>ðŸ“ Welcome to ${neighborhood.name}</div>
      <div style="font-size: 0.9rem; opacity: 0.9;">${neighborhood.vibe}</div>
    `;
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
      this.cardContainer.style.transform = `translateX(\${currentTranslate + dragTranslate}vw)`;
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
        if (diffY < 0) { this.triggerSwipeUpEasterEgg(); }
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
    const austinEmojis = ['ðŸ¤ ', 'ðŸŒ®', 'ðŸŽ¸', 'ðŸ¦‡', 'ðŸ›¸', 'ðŸŽª', 'ðŸ‘½', 'ðŸŒµ', 'ðŸ”¥', 'âš¡'];
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
      left: \${Math.random() * 80 + 10}%;
      top: \${Math.random() * 60 + 20}%;
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
    this.cardContainer.style.transform = `translateX(\${translateX}vw)`;
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
EOF