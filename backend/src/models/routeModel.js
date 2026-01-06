// Route B data configured for MMDU, Mullana, Ambala, Haryana
// Approximate campus center: 30.27241 N, 77.05043 E
const routeB = {
  id: 'route-b',
  name: 'Route B',
  stops: [
    {
      id: 'stop-1',
      name: 'Main Gate',
      order: 1,
      // Near main entrance of MMDU
      coordinates: { lat: 30.2730, lng: 77.0495 }
    },
    {
      id: 'stop-2',
      name: 'Library',
      order: 2,
      coordinates: { lat: 30.2723, lng: 77.0512 }
    },
    {
      id: 'stop-3',
      name: 'A1 Cafe',
      order: 3,
      coordinates: { lat: 30.2728, lng: 77.0518 }
    },
    {
      id: 'stop-4',
      name: 'OBC Cafe',
      order: 4,
      coordinates: { lat: 30.2734, lng: 77.0509 }
    },
    {
      id: 'stop-5',
      name: 'Engineering Block 1',
      order: 5,
      coordinates: { lat: 30.2721, lng: 77.0499 }
    }
  ]
};

const getRouteB = () => routeB;

module.exports = {
  getRouteB
};

