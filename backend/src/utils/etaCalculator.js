const { getRouteB } = require('../models/routeModel');
const { calculateDistance } = require('./distanceCalculator');

// Calculate ETA considering cart direction and route path
function calculateETAWithDirection(
  currentStopIndex,
  targetStopIndex,
  currentDirection,
  progress,
  isAtStop,
  remainingWaitTime,
  cartData
) {
  // If cart is already at the target stop, ETA is 0
  if (currentStopIndex === targetStopIndex) {
    // Check if cart is at the stop or very close to it
    if (isAtStop || progress >= 0.95) {
      return {
        distance: 0,
        etaMinutes: 0,
        etaSeconds: 0
      };
    }
  }
  
  const routeB = getRouteB();
  const speedMs = cartData.speed / 3.6; // Convert km/h to m/s
  const stopWaitTimeSeconds = 15; // Wait time at each stop in seconds
  const updateIntervalSeconds = 3; // Update interval
  
  let totalDistance = 0; // in meters
  let totalTime = 0; // in seconds
  let currentIndex = currentStopIndex;
  let direction = currentDirection;
  
  // If cart is at a stop and waiting, add remaining wait time
  if (isAtStop) {
    totalTime += remainingWaitTime * updateIntervalSeconds;
  }
  
  // If cart is moving between stops, calculate distance to next stop first
  if (!isAtStop && progress < 1) {
    const currentStop = routeB.stops[currentIndex];
    const nextStopIndex = currentIndex + direction;
    
    if (nextStopIndex >= 0 && nextStopIndex < routeB.stops.length) {
      const nextStop = routeB.stops[nextStopIndex];
      const segmentDistance = calculateDistance(currentStop.coordinates, nextStop.coordinates);
      const remainingProgress = 1 - progress;
      const distanceToNextStop = segmentDistance * remainingProgress;
      
      totalDistance += distanceToNextStop;
      totalTime += distanceToNextStop / speedMs;
      
      // Check if target is between current position and next stop
      const targetStop = routeB.stops[targetStopIndex];
      
      // If target is the next stop, we're done
      if (nextStopIndex === targetStopIndex) {
        // Already calculated distance to target
        const etaMinutes = Math.ceil(totalTime / 60);
        return {
          distance: totalDistance,
          etaMinutes: etaMinutes,
          etaSeconds: Math.ceil(totalTime)
        };
      }
      
      // Cart will arrive at next stop
      currentIndex = nextStopIndex;
      totalTime += stopWaitTimeSeconds; // Wait at the stop
    }
  }
  
  // Now calculate path from current position to target
  // Check if target is ahead in current direction
  const stopsToTargetForward = (targetStopIndex - currentIndex) * direction;
  
  if (stopsToTargetForward > 0) {
    // Target is ahead in current direction - simple path
    for (let i = currentIndex; i !== targetStopIndex; i += direction) {
      const fromStop = routeB.stops[i];
      const toStop = routeB.stops[i + direction];
      const segmentDistance = calculateDistance(fromStop.coordinates, toStop.coordinates);
      totalDistance += segmentDistance;
      totalTime += segmentDistance / speedMs;
      totalTime += stopWaitTimeSeconds; // Wait at each stop
    }
  } else if (stopsToTargetForward < 0) {
    // Target is behind - need to go to end, reverse, then to target
    // Go to boundary in current direction
    const boundaryIndex = direction === 1 ? routeB.stops.length - 1 : 0;
    
    for (let i = currentIndex; i !== boundaryIndex; i += direction) {
      const fromStop = routeB.stops[i];
      const toStop = routeB.stops[i + direction];
      const segmentDistance = calculateDistance(fromStop.coordinates, toStop.coordinates);
      totalDistance += segmentDistance;
      totalTime += segmentDistance / speedMs;
      totalTime += stopWaitTimeSeconds; // Wait at each stop
    }
    
    // Reverse direction
    direction *= -1;
    totalTime += stopWaitTimeSeconds; // Wait at boundary stop
    
    // Now go from boundary to target
    for (let i = boundaryIndex; i !== targetStopIndex; i += direction) {
      const fromStop = routeB.stops[i];
      const toStop = routeB.stops[i + direction];
      const segmentDistance = calculateDistance(fromStop.coordinates, toStop.coordinates);
      totalDistance += segmentDistance;
      totalTime += segmentDistance / speedMs;
      totalTime += stopWaitTimeSeconds; // Wait at each stop
    }
  } else {
    // Already at target stop (or very close)
    // If cart is at the stop and waiting, ETA is 0
    if (isAtStop && currentIndex === targetStopIndex) {
      return {
        distance: 0,
        etaMinutes: 0,
        etaSeconds: 0
      };
    }
    
    // Calculate distance from current position to target (if very close but not exactly at stop)
    const targetStop = routeB.stops[targetStopIndex];
    totalDistance = calculateDistance(cartData.currentLocation, targetStop.coordinates);
    totalTime += totalDistance / speedMs;
    
    // If distance is very small (less than 10 meters), consider it arrived
    if (totalDistance < 10) {
      return {
        distance: 0,
        etaMinutes: 0,
        etaSeconds: 0
      };
    }
  }
  
  // Convert to minutes and round up
  const etaMinutes = Math.ceil(totalTime / 60);
  
  return {
    distance: totalDistance,
    etaMinutes: etaMinutes,
    etaSeconds: Math.ceil(totalTime)
  };
}

module.exports = {
  calculateETAWithDirection
};

