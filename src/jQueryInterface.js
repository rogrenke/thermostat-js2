var thermostat = new Thermostat

var energyColorDisplay = function() {
  $( "#EnergyUsage" ).text("Energy Usage: " + thermostat.energyUsage());
  if (thermostat.energyUsage() === "low-usage") {
    $( "#EnergyUsage" ).css({"color": "green"});
  } else if (thermostat.energyUsage() === "medium-usage") {
    $( "#EnergyUsage" ).css({"color": "black"});
  } else {
    $( "#EnergyUsage" ).css({"color": "red"});
  };
};

$( document ).ready(function() {

  $( "#tempDisplay" ).text(thermostat.temperature);
  $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  energyColorDisplay();

  $( "#psmon" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOn()
    $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  });

  $( "#psmoff" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOff()
    $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
  });

  $( "#energyusage" ).click(function( event ) {
    event.preventDefault()
    alert( thermostat.energyUsage() );
  });

  $( "#reset" ).click(function( event ) {
    event.preventDefault()
    thermostat.reset()
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });

  $( "#up" ).click(function( event ) {
    event.preventDefault()
    thermostat.up(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });

  $( "#down" ).click(function( event ) {
    event.preventDefault()
    thermostat.down(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
    energyColorDisplay();
  });



});
