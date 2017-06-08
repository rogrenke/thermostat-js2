var thermostat = new Thermostat

$( document ).ready(function() {

  $( "#tempDisplay" ).text(thermostat.temperature);
  $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());

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
  });

  $( "#up" ).click(function( event ) {
    event.preventDefault()
    thermostat.up(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
  });

  $( "#down" ).click(function( event ) {
    event.preventDefault()
    thermostat.down(1)
    $( "#tempDisplay" ).text(thermostat.temperature)
  });

});
