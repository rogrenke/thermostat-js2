'use strict';

describe("Thermostat", function() {

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it("should start at 20 degrees", function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it("should increase temperature by 1", function() {
    thermostat.up(1);
    expect(thermostat.temperature).toEqual(21);
  });

  it("should decrease temperature by 1", function() {
    thermostat.down(1);
    expect(thermostat.temperature).toEqual(19);
  });

  it("should prevent temperature's below 10 degrees", function() {
    var thermostatlow = new Thermostat(10);
    expect(function() {thermostatlow.down(1)}).toThrowError('It is too cold!');
  });

  it("has a maximum temperature of 25 degrees when in power saving mode", function() {
    expect(function() {thermostat.up(6)}).toThrowError('PSM - max temp exceeded');
  });

  it("has a maximum temperature of 32 degrees when power saving mode is off ", function() {
      thermostat.powerSavingModeOff();
    expect(function() {thermostat.up(13)}).toThrowError('Max temp exceeded');
  });

  it("is in PSM at the start ", function() {
    expect(thermostat.powerSavingMode).toEqual(true);
  });

  it("should reset the temperature to 20", function() {
    thermostat.down(1);
    thermostat.reset();
    expect(thermostat.temperature).toEqual(20);
  });

  it('returns current energy usage', function() {
    expect(thermostat.energyUsage()).toEqual('medium-usage');
  });
  it('returns current energy usage', function() {
    thermostat.down(3)
    expect(thermostat.energyUsage()).toEqual('low-usage');
  });
  it('returns current energy usage', function() {
    thermostat.powerSavingModeOff();
    thermostat.up(6);
    expect(thermostat.energyUsage()).toEqual('high-usage');
  });
});
