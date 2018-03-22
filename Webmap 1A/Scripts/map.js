var geocoder;
var map;
var mark;
var pubnub;
var placeSearch, autocompleteTo, autocompleteFrom;
var markersNewTwo = [null, null];
var wreckersMarkers = [];
var webmapConnection;

$(function () {
    webmapConnection = $.connection.webmapHub; // Hub's name must begin with the lowercase letter
    webmapConnection.client.SendLocation = function () {
        
    }
    $.connection.hub.start()
        .done(function () {
        })
        .fail(function () {
            alert("Failed to start hub");
        })

    $.connection.webmapHub.client.sendLocation = function (id, location) {
        updateWreckerMarker(id, location);
    }
});

function updateWreckerMarker(id, location) {
        var wreckerToUpdate = wreckersMarkers.find(function (obj) {
            return obj.WreckerId === id;
        });
        if (wreckerToUpdate != undefined) {
            wreckerToUpdate.Lat = location.Lat;
            wreckerToUpdate.Lng = location.Lng;
            wreckerToUpdate.marker.setPosition({ lat: wreckerToUpdate.Lat, lng: wreckerToUpdate.Lng });
        }
    }

function initMap() {
    initAutocomplete();
    
    var leipzig = {
        lat: 51.343479,
        lng: 12.387772
    };  

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: leipzig
    });

    

    var firstZoneCoords = [
        { lat: 51.295495, lng: 12.240548 }, 
        { lat: 51.313174, lng: 12.215440 },
        { lat: 51.378974, lng: 12.225440 },
        { lat: 51.418458, lng: 12.268922 },
        { lat: 51.382608, lng: 12.476872 },
        { lat: 51.385174, lng: 12.485440 },
        { lat: 51.29859, lng: 12.487938 },
        { lat: 51.265094, lng: 12.344004 },
        { lat: 51.295495, lng: 12.240548 }
    ];

    var secondZoneCoords = [
        { lat: 51.300823, lng: 12.374790 },
        { lat: 51.307992, lng: 12.326445 },
        { lat: 51.331267, lng: 12.311170 },
        { lat: 51.388133, lng: 12.307198 },
        { lat: 51.384003, lng: 12.389003 },
        { lat: 51.327628, lng: 12.462070 },
        { lat: 51.300823, lng: 12.374790 }
    ];

    var thirdZoneCoords = [
        { lat: 51.314942, lng: 12.388721 },
        { lat: 51.323195, lng: 12.357368 },
        { lat: 51.350652, lng: 12.342421 },
        { lat: 51.367195, lng: 12.366806 },
        { lat: 51.356975, lng: 12.422221 },
        { lat: 51.318552, lng: 12.423380 },
        { lat: 51.314942, lng: 12.388721 }
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

    document.getElementById('zone1-button-edit').addEventListener("click", function () {
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

    document.getElementById('zone1-button-save').addEventListener("click", function () {
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

    document.getElementById('zone2-button-edit').addEventListener("click", function () {
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

    document.getElementById('zone2-button-save').addEventListener("click", function () {
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

    document.getElementById('zone3-button-edit').addEventListener("click", function () {
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

    document.getElementById('zone3-button-save').addEventListener("click", function () {
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

    function initializeWreckersMarkers() {
        var actionUrl = "../api/me/GetWreckers";
        $.getJSON(actionUrl, function (res) {
            $.each(res, function (i) {
                var wrecker = { WreckerId: res[i].WreckerId, Lat: res[i].CurrentLocation.Lat, Lng: res[i].CurrentLocation.Lng, marker: createWreckerMarker(res[i] ,{ lat: res[i].CurrentLocation.Lat, lng: res[i].CurrentLocation.Lng })};
                wreckersMarkers.push(wrecker);
            });
        });
    }
    initializeWreckersMarkers();
    
    //document.getElementById('get-markers-button').addEventListener("click", wreckersMarkers);
}

function closeOrdersList() {
        var menu = document.getElementById("show-orders-container");
        menu.style.display = "none";
    }

var INTERVAL = 2000;

function getMarkers() {
    var actionUrl = "../api/Me/ShowDemo";
    $.getJSON(actionUrl, function (res) {
        //for (var i = 0, len = res.length; i < len; i++) {
        //console.log(res.CurLocation.Lat);
        //console.log(res.CurLocation.Lng);
        mark.setMap(null);
            mark= new google.maps.Marker({
                position: new google.maps.LatLng(res.CurLocation.Lat, res.CurLocation.Lng),
                //icon: "../Content/Images/trucker.png",
                map: map
            });
        //}
        window.setTimeout(getMarkers, INTERVAL);
    }, "json");
}

function openOrderForm() {
    var menu = document.getElementById("form-menu");
    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.margin = "-88vh 0 0 1vh";
    //menu.style.opacity = "0.75";
}

function closeOrderForm() {
    var menu = document.getElementById("form-menu");
    menu.style.display = "none";
}

function clearList() {
    document.getElementById('address-list-container').innerHTML = "";
}

function createMarker(LatLng) {
    //centering the map by new marker position can be added 
    var marker = new google.maps.Marker({
        position: LatLng,
        map: map
    });

    marker.addListener('click', function () {
        var contentString = LatLng.toString();//"My latitude is " + LatLng.lat + " and langitude is " + LatLng.lng;
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
    });

    marker.addListener('dblclick', function () {
        marker.setMap(null);
    });

    return marker;
}

function createWreckerMarker(wrecker, LatLng) {
    //centering the map by new marker position can be added 
    var marker = new google.maps.Marker({
        position: LatLng,
        title: wrecker.PlateNum,
        icon: {
            url: "../Images/WUnloaded.png",
            size: new google.maps.Size(50,50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 25)
        },
        map: map
    });

    marker.addListener('click', function () {
        var contentString = wrecker.PlateNum + " Lat: " + LatLng.lat + " Lng: " + LatLng.lng;//"My latitude is " + LatLng.lat + " and langitude is " + LatLng.lng;
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
    });
    

    return marker;
}


document.getElementById("show-button-from").addEventListener("click", function () {
    var address = document.getElementById('autocompleteFrom').value;
    if (address) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                if (markersNewTwo[0])
                    markersNewTwo[0].setMap(null);
                document.getElementById('lat_from').value = results[0].geometry.location.lat();
                document.getElementById('lng_from').value = results[0].geometry.location.lng();
                markersNewTwo[0] = createMarker(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
});

document.getElementById("show-button-to").addEventListener("click", function () {
    var address = document.getElementById('autocompleteTo').value;
    if (address) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                if (markersNewTwo[1])
                    markersNewTwo[1].setMap(null);
                document.getElementById('lat_to').value = results[0].geometry.location.lat();
                document.getElementById('lng_to').value = results[0].geometry.location.lng();
                markersNewTwo[1] = createMarker(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
});

//document.getElementById("show-button-2").addEventListener("click", function () {
//    var address = document.getElementById('city-to').value + " " + document.getElementById('street-to').value + " " + document.getElementById('house-num-to').value;
//    geocoder = new google.maps.Geocoder();
//    geocoder.geocode({ 'address': address }, function (results, status) {
//        if (status == 'OK') {
//            for (var i = 0; i < results.length; i++) {
//                var elem = document.createElement("a");
//                elem.class = "list-group-item list-group-item-action";
//                var res = results[i];
//                var h5 = document.createElement('h5');
//                h5.innerHTML = results[i].formatted_address;

//                elem.appendChild(h5);
//                h5.addEventListener("click", listItemClicked(results[i]));
//                document.getElementById("address-list-container").appendChild(elem);
//            }
//            createListBox(2);
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
//});
