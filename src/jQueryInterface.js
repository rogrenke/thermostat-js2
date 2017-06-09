var thermostat = new Thermostat
var cityPictureMapper = {london: "http://www.stgiles.com/wp-content/uploads/2016/02/londonA6.jpg", paris: "http://handluggageonly.co.uk/wp-content/uploads/2016/01/Paris-3.jpg", newyork: "https://www.city-journal.org/sites/cj/files/New-York.jpg", losangeles: "https://www.homeadvisor.com/images/consumer/hhi/hero-photos/city/LosAngeles.jpg", sanfrancisco: "http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg"};

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

apiData1 = $.get('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=01dcdbda41e274135f151befa25ccaf0');

$( document ).ready(function() {

  var loadTemp;
  var loadPowerSaving;
  var loadCity;

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=01dcdbda41e274135f151befa25ccaf0', function(response) {
    apiData2 = response;
    $( "#cityTemp" ).text("London, " + (response.main.temp - 273.15).toFixed(0) + " °C");
  });

  $( "#load" ).click(function(event){
    event.preventDefault()
    $.getJSON("http://localhost:4567/users/1", function(data){
      thermostat.temperature = data.current_temp;
      loadCity = data.current_city;
      thermostat.powerSavingMode = data.power_saving;
      displayWeather(loadCity);
      $( "#tempDisplay" ).text(thermostat.temperature);
      $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
    });
  });

  $( "#citySearch" ).submit(function(event) {
    event.preventDefault();
    console.log($("#searchText").val());
    searchTerm = $("#searchText").val();
    displayWeather(searchTerm);
    $("body").css({ "background": "url('http://handluggageonly.co.uk/wp-content/uploads/2016/01/Paris-3.jpg') no-repeat"});
  });

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


  function displayWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city
    var token = "&APPID=01dcdbda41e274135f151befa25ccaf0"
    $.get(url + token, function(response) {
      $( "#cityTemp" ).text(city + " " + (response.main.temp - 273.15).toFixed(0) + " °C");
    });
  };

  function changeBackground(city) {
    var normalizedString = city.toLowerCase().replace(" ", "");
    if (typeof cityPictureMapper[normalizedString] === "string") {
      return cityPictureMapper[normalizedString]
    } else {
      return "http://assets.worldwildlife.org/photos/13148/images/hero_full/17_292_Earth_Hour_Web_Images_1600x600_v4.jpg?1487079364";
    };
  };



});
