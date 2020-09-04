'use strict';

class Thermostat {

  constructor() {
    this.temp = 20;
    this.MIN_TEMPERATURE = 10;
    this.powerSavingMode = true;
    this.PS_MAX_TEMPERATURE = 25;
    this.DEF_MAX_TEMPERATURE = 32;
  };

  reset() {
    this.temp = 20
  };

  isPowerSaveOn() {
    return this.powerSavingMode === true;
  };

  switchPowerSaveOn() {
    this.powerSavingMode = true;

  };

  switchPowerSaveOff() {
    this.powerSavingMode = false;
  };

  getCurrentTemp() {
    return this.temp;
  };

  isMaximumTemp(amount) {
    if(this.isPowerSaveOn() === false) {
      return (this.temp + amount) > this.DEF_MAX_TEMPERATURE;
    }
    return (this.temp + amount) > this.PS_MAX_TEMPERATURE;
  };

  theMaximumTemp() {
    if(this.isPowerSaveOn() === false) {
      return this.DEF_MAX_TEMPERATURE;
    }
    return this.PS_MAX_TEMPERATURE;
  };

  isMinimumTemp() {
    this.temp = this.MIN_TEMPERATURE
  };

  increaseTemp(by) {
    if(this.isMaximumTemp(by)) {
      this.temp = this.theMaximumTemp();
      throw new Error(`unable to increase above ${this.theMaximumTemp()} degrees.`)
    }
    this.temp += by
  };

  decreaseTemp(by) {
    if(this.temp - by >= this.MIN_TEMPERATURE) {
      this.temp -= by
    } else {
      this.isMinimumTemp()
      throw new Error('unable to lower below 10 degrees.');
    };
  };

  energyUsage() {
    if(this.getCurrentTemp() < 18) {
      return "low-usage";
    } else if(this.getCurrentTemp() >= 18 && (this.getCurrentTemp() <= 25)) {
      return "medium-usage";
    } else {
      return "high-usage";
    };
  };

};