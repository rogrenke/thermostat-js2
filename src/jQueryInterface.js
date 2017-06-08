var thermostat = new Thermostat

$( document ).ready(function() {

  $( "#currenttemp" ).click(function( event ) {
    event.preventDefault()
    alert( thermostat.temperature );
  });

  $( "#psmon" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOn()
    alert( thermostat.powerSavingMode );
  });

  $( "#psmoff" ).click(function( event ) {
    event.preventDefault()
    thermostat.powerSavingModeOff()
    alert( thermostat.powerSavingMode );
  });

  $( "#energyusage" ).click(function( event ) {
    event.preventDefault()
    alert( thermostat.energyUsage() );
  });

  $( "#reset" ).click(function( event ) {
    event.preventDefault()
    thermostat.reset()
    alert( "Temperature reset" );
  });

  $( "#up" ).click(function( event ) {
    event.preventDefault()
    thermostat.up(1)
    alert( thermostat.temperature );
  });

  $( "#down" ).click(function( event ) {
    event.preventDefault()
    thermostat.down(1)
    alert( thermostat.temperature );
  });

});
