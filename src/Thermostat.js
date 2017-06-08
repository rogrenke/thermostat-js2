function Thermostat(temperature = 20) {
  this.MIN_TEMPERATURE = 10;
  this.MAX_ECO_TEMPERATURE = 25;
  this.MAX_REGULAR_TEMPERATURE = 32;
  this.temperature = temperature;
  this.powerSavingMode = true;
}

Thermostat.prototype.up = function(temp) {
  if(this.powerSavingMode && this.temperature + temp > this.MAX_ECO_TEMPERATURE) {
    throw Error("PSM - max temp exceeded")
  }else if (this.temperature + temp > this.MAX_REGULAR_TEMPERATURE ) {
    throw Error("Max temp exceeded")
  }
  this.temperature += temp;
}

Thermostat.prototype.down = function(temp) {
  if(this.temperature - temp < this.MIN_TEMPERATURE) {
    throw Error("It is too cold!");
  };
  this.temperature -= temp;
}

Thermostat.prototype.powerSavingModeOn = function() {
  this.powerSavingMode = true;
}

Thermostat.prototype.powerSavingModeOff = function() {
  this.powerSavingMode = false;
}
Thermostat.prototype.reset = function() {
  this.temperature = 20;
}

Thermostat.prototype.energyUsage = function() {
  if(this.temperature < 18) {
    return "low-usage";
  } else if(this.temperature > 24) {
    return "high-usage";
  } else {
    return "medium-usage";
  }
}

Thermostat.prototype.powerSavingModeString = function () {
  if (this.powerSavingMode) {
    return "on"
  } else {
    return "off"
  };
};
