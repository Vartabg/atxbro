// Austin Location-Aware Service
class AustinLocationService {
  constructor() {
    this.austinBounds = {
      north: 30.5168,
      south: 30.0986,
      east: -97.5684,
      west: -97.9383
    };
    
    this.neighborhoods = [
      { name: "Downtown", lat: 30.2672, lng: -97.7431, vibe: "urban" },
      { name: "South Congress", lat: 30.2469, lng: -97.7501, vibe: "hip" },
      { name: "East Austin", lat: 30.2644, lng: -97.7186, vibe: "artsy" },
      { name: "Rainey Street", lat: 30.2634, lng: -97.7387, vibe: "nightlife" },
      { name: "The Domain", lat: 30.3991, lng: -97.7294, vibe: "upscale" },
      { name: "Zilker", lat: 30.2644, lng: -97.7698, vibe: "outdoorsy" },
      { name: "6th Street", lat: 30.2669, lng: -97.7428, vibe: "party" }
    ];
    
    this.currentLocation = null;
    this.currentNeighborhood = null;
    this.locationCallbacks = [];
  }

  async startTracking() {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      return false;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          this.updateNeighborhood();
          this.notifyCallbacks();
          resolve(true);
        },
        (error) => {
          console.log('Location error:', error);
          // Default to Austin center
          this.currentLocation = { lat: 30.2672, lng: -97.7431 };
          this.updateNeighborhood();
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  }

  updateNeighborhood() {
    if (!this.currentLocation) return;

    let closestNeighborhood = null;
    let minDistance = Infinity;

    this.neighborhoods.forEach(neighborhood => {
      const distance = this.calculateDistance(
        this.currentLocation.lat,
        this.currentLocation.lng,
        neighborhood.lat,
        neighborhood.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestNeighborhood = neighborhood;
      }
    });

    if (closestNeighborhood && minDistance < 2) { // Within 2 miles
      this.currentNeighborhood = closestNeighborhood;
    }
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRad(deg) {
    return deg * (Math.PI / 180);
  }

  isInAustin() {
    if (!this.currentLocation) return false;
    
    return (
      this.currentLocation.lat >= this.austinBounds.south &&
      this.currentLocation.lat <= this.austinBounds.north &&
      this.currentLocation.lng >= this.austinBounds.west &&
      this.currentLocation.lng <= this.austinBounds.east
    );
  }

  getLocationContext() {
    return {
      inAustin: this.isInAustin(),
      neighborhood: this.currentNeighborhood,
      coordinates: this.currentLocation
    };
  }

  onLocationUpdate(callback) {
    this.locationCallbacks.push(callback);
  }

  notifyCallbacks() {
    this.locationCallbacks.forEach(callback => {
      callback(this.getLocationContext());
    });
  }

  getNeighborhoodRecommendations() {
    if (!this.currentNeighborhood) return null;

    const recommendations = {
      "Downtown": ["Visit the State Capitol", "Walk Lady Bird Lake", "Check out food trucks"],
      "South Congress": ["Browse vintage shops", "Get tacos at Guero's", "See the SoCo vibe"],
      "East Austin": ["Explore street art", "Visit breweries", "Food truck parks"],
      "Rainey Street": ["Bar hopping", "Historic bungalows", "Night scene"],
      "The Domain": ["Upscale shopping", "Fine dining", "Modern Austin"],
      "Zilker": ["Barton Springs Pool", "Austin City Limits", "Outdoor activities"],
      "6th Street": ["Live music venues", "Historic bars", "Night entertainment"]
    };

    return recommendations[this.currentNeighborhood.name] || [];
  }
}

// Export for global use
window.AustinLocationService = new AustinLocationService();
