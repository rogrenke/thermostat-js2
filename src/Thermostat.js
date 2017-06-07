function Thermostat(temperature = 20) {
  this.temperature = temperature;
  this.powerSavingMode = true;
}

Thermostat.prototype.up = function(temp) {
  if(this.powerSavingMode && this.temperature + temp > 25) {
    throw Error("PSM - max temp exceeded")
  }else if (this.temperature + temp >32 ) {
    throw Error("Max temp exceeded")
  }
  this.temperature += temp;
}

Thermostat.prototype.down = function(temp) {
  if(this.temperature - temp < 11) {
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
