'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starting temp is 20c', function() {
    expect(thermostat.getCurrentTemp()).toEqual(20);

  });

  describe('increaseTemp', function() {
    it('increases the current temp', function() {
      thermostat.increaseTemp(5);
      expect(thermostat.getCurrentTemp()).toEqual(25);
    });
  });

  describe('decreaseTemp', function() {
    it('decreases the current temp', function(){
      thermostat.decreaseTemp(5);
      expect(thermostat.getCurrentTemp()).toEqual(15)
    });

    it('does not drop below 10', function() {
      expect(function() { thermostat.decreaseTemp(11); } ).toThrowError('unable to lower below 10 degrees.');
      expect(thermostat.getCurrentTemp()).toEqual(10)
    });
  });

  describe('powerSaving is on', function() {
    it('sets maximum temp to 25', function() {
      expect(function() { thermostat.increaseTemp(6); } ).toThrowError('unable to increase above 25 degrees.')
      expect(thermostat.getCurrentTemp()).toEqual(25)
    });
  });
  describe('powerSavingOff', function() {
    it('sets maximum temp to 32', function() {
      thermostat.switchPowerSaveOff();
      expect(function() { thermostat.increaseTemp(13); } ).toThrowError('unable to increase above 32 degrees.')
      expect(thermostat.getCurrentTemp()).toEqual(32)
    });
  });
  
  it('resets temp to default temp when called', function() {
    thermostat.increaseTemp(5);
    thermostat.reset()
    expect(thermostat.getCurrentTemp()).toEqual(20)
  });

  describe('Energy Usage', function() {
    it('shows low-usage when < 18', function() {
      thermostat.decreaseTemp(3);
      expect(thermostat.energyUsage()).toEqual("low-usage")
    });
    it('shows medium-usage when between 18-25', function() {
      expect(thermostat.energyUsage()).toEqual("medium-usage")
    });
    it('shows high-usage when > 25', function() {
      thermostat.switchPowerSaveOff();
      thermostat.increaseTemp(6);
      expect(thermostat.energyUsage()).toEqual("high-usage")
    });

  });
});