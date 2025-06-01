import 'mocha';
import { assert } from 'chai';
import { getDIGIPINFromLatLon, getLatLonFromDIGIPIN } from '../src/index';
import digipin from '../src/index';

describe('DIGIPIN Package', () => {
  it('should be an object', () => {
    assert.isObject(digipin);
  });

  it('should have getDIGIPINFromLatLon and getLatLonFromDIGIPIN properties', () => {
    assert.property(digipin, 'getDIGIPINFromLatLon');
    assert.property(digipin, 'getLatLonFromDIGIPIN');
  });
});

describe('getDIGIPINFromLatLon Function', () => {
  it('should be a function', () => {
    assert.isFunction(getDIGIPINFromLatLon);
  });

  it('should return a valid DIGIPIN code for valid coordinates', () => {
    const lat = 20;
    const lon = 80;
    const result = getDIGIPINFromLatLon(lat, lon);
    assert.isString(result);
    assert.match(result, /^[FCJKLMPT2-9]{3}-[FCJKLMPT2-9]{3}-[FCJKLMPT2-9]{4}$/);
  });

  it('should return "Out of Bound" for invalid coordinates', () => {
    assert.equal(getDIGIPINFromLatLon(1, 80), 'Out of Bound');
    assert.equal(getDIGIPINFromLatLon(40, 80), 'Out of Bound');
    assert.equal(getDIGIPINFromLatLon(20, 60), 'Out of Bound');
    assert.equal(getDIGIPINFromLatLon(20, 100), 'Out of Bound');
  });
});

describe('getLatLonFromDIGIPIN Function', () => {
  it('should be a function', () => {
    assert.isFunction(getLatLonFromDIGIPIN);
  });

  it('should return coordinates for a valid DIGIPIN', () => {
    const digipin = 'F3M-P6T-FCJK';
    const result = getLatLonFromDIGIPIN(digipin);
    assert.isObject(result);
    assert.notEqual(result, 'Invalid DIGIPIN');
    if (typeof result !== 'string') {
      assert.property(result, 'latitude');
      assert.property(result, 'longitude');
      assert.isNumber(result.latitude);
      assert.isNumber(result.longitude);
    }
  });

  it('should return "Invalid DIGIPIN" for invalid input', () => {
    assert.equal(getLatLonFromDIGIPIN('ABC'), 'Invalid DIGIPIN');
    assert.equal(getLatLonFromDIGIPIN('123-456-WXYZ'), 'Invalid DIGIPIN');
  });

  it('should handle round trip conversion', () => {
    const originalLat = 20;
    const originalLon = 80;
    const digipin = getDIGIPINFromLatLon(originalLat, originalLon);
    const result = getLatLonFromDIGIPIN(digipin);
    assert.isObject(result);
    assert.notEqual(result, 'Invalid DIGIPIN');
    if (typeof result !== 'string') {
      assert.approximately(result.latitude, originalLat, 0.1);
      assert.approximately(result.longitude, originalLon, 0.1);
    }
  });
});
