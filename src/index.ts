/**
 * Converts coordinates to DIGIPIN codes and vice versa
 */

// Single grid for all encoding/decoding
const DIGIPIN_GRID = [
  ['F', 'C', '9', '8'],
  ['J', '3', '2', '7'],
  ['K', '4', '5', '6'],
  ['L', 'M', 'P', 'T']
];

// Updated boundary values
const BOUNDS = {
  minLat: 2.5,
  maxLat: 38.5,
  minLon: 63.5,
  maxLon: 99.5
};

/**
 * Converts latitude and longitude to a DIGIPIN code
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {string} DIGIPIN code
 */
export function getDIGIPINFromLatLon(lat: number, lon: number): string {
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat) {
    return 'Out of Bound';
  }
  if (lon < BOUNDS.minLon || lon > BOUNDS.maxLon) {
    return 'Out of Bound';
  }

  let minLat = BOUNDS.minLat;
  let maxLat = BOUNDS.maxLat;
  let minLon = BOUNDS.minLon;
  let maxLon = BOUNDS.maxLon;

  let digiPin = '';

  for (let level = 1; level <= 10; level++) {
    const latDiv = (maxLat - minLat) / 4;
    const lonDiv = (maxLon - minLon) / 4;

    // Using reversed row logic as in updated algorithm
    let row = 3 - Math.floor((lat - minLat) / latDiv);
    let col = Math.floor((lon - minLon) / lonDiv);

    // Ensure values are within bounds
    row = Math.max(0, Math.min(row, 3));
    col = Math.max(0, Math.min(col, 3));

    digiPin += DIGIPIN_GRID[row][col];

    // Add hyphens after 3rd and 6th characters
    if (level === 3 || level === 6) {
      digiPin += '-';
    }

    // Update bounds for next level
    maxLat = minLat + latDiv * (4 - row);
    minLat = minLat + latDiv * (3 - row);

    minLon = minLon + lonDiv * col;
    maxLon = minLon + lonDiv;
  }

  return digiPin;
}

/**
 * Converts a DIGIPIN code to latitude and longitude
 * @param {string} digipin - DIGIPIN code
 * @returns {Object} Object with latitude and longitude
 */
export function getLatLonFromDIGIPIN(digipin: string): { latitude: number; longitude: number } | 'Invalid DIGIPIN' {
  const pin = digipin.replace(/-/g, '');
  
  if (pin.length !== 10) {
    return 'Invalid DIGIPIN';
  }

  let minLat = BOUNDS.minLat;
  let maxLat = BOUNDS.maxLat;
  let minLon = BOUNDS.minLon;
  let maxLon = BOUNDS.maxLon;

  for (let i = 0; i < 10; i++) {
    const char = pin[i];
    let found = false;
    let ri = -1, ci = -1;

    // Find character in grid
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (DIGIPIN_GRID[r][c] === char) {
          ri = r;
          ci = c;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) return 'Invalid DIGIPIN';

    const latDiv = (maxLat - minLat) / 4;
    const lonDiv = (maxLon - minLon) / 4;

    const lat1 = maxLat - latDiv * (ri + 1);
    const lat2 = maxLat - latDiv * ri;
    const lon1 = minLon + lonDiv * ci;
    const lon2 = minLon + lonDiv * (ci + 1);

    // Update bounding box for next level
    minLat = lat1;
    maxLat = lat2;
    minLon = lon1;
    maxLon = lon2;
  }

  const centerLat = (minLat + maxLat) / 2;
  const centerLon = (minLon + maxLon) / 2;

  return {
    latitude: parseFloat(centerLat.toFixed(6)),
    longitude: parseFloat(centerLon.toFixed(6))
  };
}

// Create an object containing the functions
const digipin = {
  getDIGIPINFromLatLon,
  getLatLonFromDIGIPIN,
};

// Export the object as the default export
export default digipin;