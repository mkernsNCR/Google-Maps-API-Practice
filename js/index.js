console.log("Hello World! JS is working...");

function reloadPage() {
    location.reload();
};

function initMap() {
  var myHood = {lat:38.8048, lng: -77.0469};
  // var thaTrap = {lat:38.7993, lng: -77.0670};
  var options = {
    zoom: 14,
    center: myHood
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  infoWindow = new google.maps.InfoWindow;

  // Array of Markers
  var markers = [
    {
      coords: myHood,
      content: '<h1 class="marker-txt">Alexandria, VA.</h1>',
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }
  ];

  // Loop through markers
  for (var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
    console.log([i]);
  }

  // Add Marker Function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      // icon: props.iconImage
    });

    // Checks if Icon Image exist
    if (props.iconImage) {
      // Set Icon Image
      marker.setIcon(props.iconImage);
    }

    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }

  // Get Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('<h2 id="my-pos">You are here.</h2>');
      infoWindow.open(map);
      map.setCenter(pos);
    },  function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
