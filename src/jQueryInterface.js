var thermostat = new Thermostat
var test;

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

  var currentCity = "london";
  var jsonToPost;

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=01dcdbda41e274135f151befa25ccaf0', function(response) {
    apiData2 = response;
    $( "#cityTemp" ).text("London, " + (response.main.temp - 273.15).toFixed(0) + " °C");
  });

  $( "#load" ).click(function(event){
    event.preventDefault()
    $.getJSON("http://localhost:4567/users/1", function(data){
      test = data;
      thermostat.temperature = data.current_temp;
      currentCity = data.current_city;
      thermostat.powerSavingMode = data.power_saving;
      displayWeather(currentCity);
      $( "#tempDisplay" ).text(thermostat.temperature);
      $( "#powerSaving" ).text("Power Saving: " + thermostat.powerSavingModeString());
      var url = "url('" + changeBackground(currentCity) + "') no-repeat"
      $("body").css({ "background": url, "background-size": "cover"});
    });
  });

  $( "#save" ).click(function(event){
    event.preventDefault()
    jsonToPost = { current_temp: thermostat.temperature, power_saving: thermostat.powerSavingMode, current_city: currentCity };
    $.post("http://localhost:4567/users/", jsonToPost);
  });


  $( "#citySearch" ).submit(function(event) {
    event.preventDefault();
    currentCity = $("#searchText").val();
    displayWeather(currentCity);
    var url = "url('" + changeBackground(currentCity) + "') no-repeat"
    $("body").css({ "background": url, "background-size": "cover"});
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
      return "https://userscontent2.emaze.com/images/9ad354ea-2ea0-4012-8193-51d7faf0a74d/50fd40af-ea5b-4aa0-baba-58d6b38ddc09.jpg";
    };
  };

});

var cityPictureMapper = {
  london: "http://www.stgiles.com/wp-content/uploads/2016/02/londonA6.jpg",
  paris: "http://handluggageonly.co.uk/wp-content/uploads/2016/01/Paris-3.jpg",
  newyork: "https://www.city-journal.org/sites/cj/files/New-York.jpg",
  losangeles: "https://www.homeadvisor.com/images/consumer/hhi/hero-photos/city/LosAngeles.jpg",
  sanfrancisco: "http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg",
  stockholm: "http://static.thousandwonders.net/Stockholm.original.14849.jpg",
  berlin: "https://www.emnify.com/wp-content/uploads/2015/11/Blog-Berlin-move.jpg",
  rome: "https://www.thetimes.co.uk/travel/s3/growthtravel-prod/uploads/2016/04/Rome-on-a-budget.jpg",
  dubai: "http://images.kuoni.co.uk/73/dubai-37075265-1494255242-ImageGalleryLightboxLarge.jpg0",
  sydney: "http://www.australia.com/content/australia/de_de/places/sydney/_jcr_content/hero/image.adapt.1663.medium.jpg",
  shanghai: "http://tilomitra.com/wp-content/uploads/2015/01/Shanghai.jpg",
  hongkong: "https://www.whitecase.com/sites/whitecase/files/images/locations/HongKong_Tablet_1920x960.jpg",
  singapore: "https://absoluteinternship.com/wp-content/uploads/abs-singapore-program-hdr.jpg"
};
