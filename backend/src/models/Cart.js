/**
 * Cart Class - Object-Oriented Cart Management
 * 
 * Represents a single cart instance with its own state, movement logic, and lifecycle.
 * Each cart manages its own location, status, and movement between route stops.
 * 
 * @file Cart.js
 * @class Cart
 * @author Campus Connect Team
 */

const { getRouteB } = require('./routeModel');
const { calculateDistance } = require('../utils/distanceCalculator');

class Cart {
  constructor(id, name, routeId, capacity, initialStopIndex, speed) {
    this.id = id;
    this.name = name;
    this.routeId = routeId;
    this.capacity = capacity;
    this.currentPassengers = Math.floor(Math.random() * (capacity - 1)) + 1; // Random 1 to capacity-1
    this.speed = speed; // km/h
    this.status = 'moving'; // 'moving', 'stopped', 'idle'
    
    const routeB = getRouteB();
    const initialStop = routeB.stops[initialStopIndex];
    
    this.currentLocation = {
      lat: initialStop.coordinates.lat,
      lng: initialStop.coordinates.lng,
      heading: 0
    };
    
    this.currentStop = initialStop.id;
    this.nextStop = initialStopIndex < routeB.stops.length - 1 
      ? routeB.stops[initialStopIndex + 1].id 
      : initialStop.id;
    
    // Movement state
    this.movement = {
      currentStopIndex: initialStopIndex,
      direction: 1, // 1 for forward, -1 for backward
      progress: 0, // 0 to 1, progress between current and next stop
      isAtStop: false,
      stopWaitTime: 0 // Time to wait at stop (in intervals)
    };
    
    this.routeB = routeB;
    this.intervalId = null;
    this.startMovement();
  }
  
  startMovement() {
    if (this.intervalId) return; // Already running
    
    this.intervalId = setInterval(() => {
      this.updatePosition();
    }, 3000); // Update every 3 seconds
  }
  
  stopMovement() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  updatePosition() {
    if (this.status !== 'moving') {
      return;
    }
    
    // If waiting at a stop
    if (this.movement.isAtStop) {
      this.movement.stopWaitTime--;
      if (this.movement.stopWaitTime <= 0) {
        // Finished waiting, check if we need to reverse direction
        const nextStopIndex = this.movement.currentStopIndex + this.movement.direction;
        
        if (nextStopIndex < 0 || nextStopIndex >= this.routeB.stops.length) {
          // Reached boundary, reverse direction
          this.movement.direction *= -1;
        }
        
        // Now calculate the valid next stop
        const validNextIndex = this.movement.currentStopIndex + this.movement.direction;
        
        if (validNextIndex >= 0 && validNextIndex < this.routeB.stops.length) {
          // Set up to move to next stop
          this.movement.isAtStop = false;
          this.movement.progress = 0;
          
          const currentStop = this.routeB.stops[this.movement.currentStopIndex];
          const nextStop = this.routeB.stops[validNextIndex];
          
          this.currentStop = currentStop.id;
          this.nextStop = nextStop.id;
        }
      }
      return;
    }
    
    // Cart is moving between stops
    const currentStop = this.routeB.stops[this.movement.currentStopIndex];
    const nextStopIndex = this.movement.currentStopIndex + this.movement.direction;
    
    // Safety check - should not happen, but reverse if needed
    if (nextStopIndex < 0 || nextStopIndex >= this.routeB.stops.length) {
      this.movement.direction *= -1;
      return; // Will try again next interval
    }
    
    const nextStop = this.routeB.stops[nextStopIndex];
    
    // Calculate distance and movement increment
    const distance = calculateDistance(currentStop.coordinates, nextStop.coordinates);
    const speedMs = this.speed / 3.6; // Convert km/h to m/s
    const timeToTravel = distance / speedMs; // Time in seconds
    const intervalSeconds = 3; // Update interval
    const progressIncrement = intervalSeconds / timeToTravel;
    
    // Update progress
    this.movement.progress += progressIncrement;
    
    // If reached next stop
    if (this.movement.progress >= 1) {
      // Arrived at next stop
      this.movement.progress = 1;
      this.movement.isAtStop = true;
      this.movement.stopWaitTime = 5; // Wait 5 intervals (15 seconds) at each stop
      
      // Update current stop index to the stop we just reached
      this.movement.currentStopIndex = nextStopIndex;
      
      // Update location to exact stop position
      this.currentLocation.lat = nextStop.coordinates.lat;
      this.currentLocation.lng = nextStop.coordinates.lng;
      this.currentStop = nextStop.id;
      
      // Calculate next stop (for display purposes, will be validated when leaving)
      const futureNextIndex = nextStopIndex + this.movement.direction;
      if (futureNextIndex >= 0 && futureNextIndex < this.routeB.stops.length) {
        this.nextStop = this.routeB.stops[futureNextIndex].id;
      } else {
        // At boundary - will reverse when leaving this stop
        this.nextStop = nextStop.id; // Same as current for now
      }
    } else {
      // Interpolate position between stops
      this.currentLocation.lat = currentStop.coordinates.lat + 
        (nextStop.coordinates.lat - currentStop.coordinates.lat) * this.movement.progress;
      this.currentLocation.lng = currentStop.coordinates.lng + 
        (nextStop.coordinates.lng - currentStop.coordinates.lng) * this.movement.progress;
      
      // Calculate heading (direction of travel)
      const dLat = nextStop.coordinates.lat - currentStop.coordinates.lat;
      const dLng = nextStop.coordinates.lng - currentStop.coordinates.lng;
      this.currentLocation.heading = Math.atan2(dLng, dLat) * 180 / Math.PI;
    }
  }
  
  start() {
    if (this.status === 'stopped') {
      this.status = 'moving';
      this.startMovement();
      return true;
    }
    return false;
  }
  
  stop() {
    if (this.status === 'moving') {
      this.status = 'stopped';
      // Cart maintains its current position - no reset needed
      return true;
    }
    return false;
  }
  
  resetRoute() {
    // Reset to first stop
    this.movement.currentStopIndex = 0;
    this.movement.direction = 1;
    this.movement.progress = 0;
    this.movement.isAtStop = false;
    this.movement.stopWaitTime = 0;
    
    // Reset cart location to first stop
    const firstStop = this.routeB.stops[0];
    this.currentLocation.lat = firstStop.coordinates.lat;
    this.currentLocation.lng = firstStop.coordinates.lng;
    this.currentStop = firstStop.id;
    this.nextStop = this.routeB.stops[1].id;
    
    return true;
  }
  
  toggleStatus() {
    // Toggle between 'moving', 'stopped', 'idle'
    if (this.status === 'moving') {
      this.status = 'stopped';
      this.stopMovement();
    } else if (this.status === 'stopped') {
      this.status = 'idle';
    } else {
      this.status = 'moving';
      this.startMovement();
    }
    return this.status;
  }
  
  getData() {
    return {
      id: this.id,
      name: this.name,
      routeId: this.routeId,
      capacity: this.capacity,
      currentPassengers: this.currentPassengers,
      currentLocation: { ...this.currentLocation },
      currentStop: this.currentStop,
      nextStop: this.nextStop,
      status: this.status,
      speed: this.speed
    };
  }
  
  getMovement() {
    return { ...this.movement };
  }
}

module.exports = Cart;

