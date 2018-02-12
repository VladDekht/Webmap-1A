var geocoder;

function initMap() {
    var leipzig = {
        lat: 51.343479,
        lng: 12.387772
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: leipzig
    });

    var firstZoneCoords = [
        {lat: 51.295495,lng: 12.240548}, 
        {lat: 51.313174,lng: 12.215440}, 
        {lat: 51.378974,lng: 12.225440}, 
        {lat: 51.418458,lng: 12.268922}, 
        {lat: 51.382608,lng: 12.476872}, 
        {lat: 51.385174,lng: 12.485440}, 
        {lat: 51.29859,lng: 12.487938}, 
        {lat: 51.265094,lng: 12.344004}, 
        {lat: 51.295495,lng: 12.240548}
      ];

    var secondZoneCoords = [
        {lat: 51.300823,lng: 12.374790}, 
        {lat: 51.307992,lng: 12.326445}, 
        {lat: 51.331267,lng: 12.311170}, 
        {lat: 51.388133,lng: 12.307198}, 
        {lat: 51.384003,lng: 12.389003}, 
        {lat: 51.327628,lng: 12.462070}, 
        {lat: 51.300823,lng: 12.374790}
    ];

    var thirdZoneCoords = [
        {lat: 51.314942,lng: 12.388721}, 
        {lat: 51.323195,lng: 12.357368}, 
        {lat: 51.350652,lng: 12.342421}, 
        {lat: 51.367195,lng: 12.366806}, 
        {lat: 51.356975,lng: 12.422221}, 
        {lat: 51.318552,lng: 12.423380}, 
        {lat: 51.314942,lng: 12.388721}
    ];

    var firstZone = new google.maps.Polygon({
        paths: firstZoneCoords,
        strokeColor: '#0de5db',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#0de5db',
        fillOpacity: 0.19,
        geodesic: true
    });

    var secondZone = new google.maps.Polygon({
        paths: secondZoneCoords,
        strokeColor: '#003366',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#003366',
        fillOpacity: 0.5,
        geodesic: true
    });

    var thirdZone = new google.maps.Polygon({
        paths: thirdZoneCoords,
        strokeColor: '#393877',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#393877',
        fillOpacity: 0.7,
        geodesic: true
    });

    firstZone.setMap(map);
    secondZone.setMap(map);
    thirdZone.setMap(map);

    document.getElementById('zone1-button-edit').addEventListener("click", function() {
        firstZone.setMap(null);
        firstZone = new google.maps.Polygon({
            paths: firstZoneCoords,
            strokeColor: '#0de5db',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#0de5db',
            fillOpacity: 0.19,
            editable: true,
            geodesic: true
        });
        firstZone.setMap(map);
        document.getElementById('zone1-button-save').style.visibility = "visible";
    })

    document.getElementById('zone1-button-save').addEventListener("click", function() {
        firstZone.setMap(null);
        firstZoneCoords = firstZone.getPath();
        firstZone = new google.maps.Polygon({
            paths: firstZoneCoords,
            strokeColor: '#0de5db',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#0de5db',
            fillOpacity: 0.19,
            geodesic: true,
            editable: false
        });
        firstZone.setMap(map);
        document.getElementById('zone1-button-save').style.visibility = "hidden";
    })

    document.getElementById('zone2-button-edit').addEventListener("click", function() {
        secondZone.setMap(null);
        secondZone = new google.maps.Polygon({
            paths: secondZoneCoords,
            strokeColor: '#003366',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#003366',
            fillOpacity: 0.5,
            editable: true,
            geodesic: true
        });
        secondZone.setMap(map);
        document.getElementById('zone2-button-save').style.visibility = "visible";
    })

    document.getElementById('zone2-button-save').addEventListener("click", function() {
        secondZone.setMap(null);
        secondZoneCoords = secondZone.getPath();
        secondZone = new google.maps.Polygon({
            paths: secondZoneCoords,
            strokeColor: '#003366',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#003366',
            fillOpacity: 0.5,
            editable: false,
            geodesic: true
        });
        secondZone.setMap(map);
        document.getElementById('zone2-button-save').style.visibility = "hidden";
    })

    document.getElementById('zone3-button-edit').addEventListener("click", function() {
        thirdZone.setMap(null);
        thirdZone = new google.maps.Polygon({
            paths: thirdZoneCoords,
            strokeColor: '#393877',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#393877',
            fillOpacity: 0.7,
            editable: true,
            geodesic: true
        });
        thirdZone.setMap(map);
        document.getElementById('zone3-button-save').style.visibility = "visible";
    })

    document.getElementById('zone3-button-save').addEventListener("click", function() {
        thirdZone.setMap(null);
        thirdZoneCoords = thirdZone.getPath();
        thirdZone = new google.maps.Polygon({
            paths: thirdZoneCoords,
            strokeColor: '#393877',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#393877',
            fillOpacity: 0.7,
            editable: false,
            geodesic: true
        });
        thirdZone.setMap(map);
        document.getElementById('zone3-button-save').style.visibility = "hidden";
    })

    var pos = {lat: 51.343479,lng: 12.387772};
    var marker = new google.maps.Marker({
                            position: pos,
                            map: map
                        });

    var contentString = "My latitude is " + pos.lat + " and langitude is " + pos.lng;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

    marker.addListener('click', function(){
        infowindow.open(map, marker);
    });

    document.getElementById('submit-button').onclick = function () {
        var address = document.getElementById('city-to').value + " " + document.getElementById('street-to').value + " " + document.getElementById('house-num-to').value;
        alert(document.getElementById('city-to').value + " " + document.getElementById('street-to').value + " " + document.getElementById('house-num-to').value);
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                alert('Geocode was succesful');
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
}