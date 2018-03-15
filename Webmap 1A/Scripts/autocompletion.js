
//var placeSearch,autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    //city_to: 'short_name',
    //country: 'long_name',
    postal_code: 'short_name'
};

var autocompleteFromInputs = { street_number: 'street_number_from', route: 'route_from', postal_code: 'postal_code_from', locality: 'locality_from' };
var autocompleteToInputs = { street_number: 'street_number_to', route: 'route_to', postal_code: 'postal_code_to', locality:'locality_to'};


function initAutocomplete() {
    autocompleteTo = new google.maps.places.Autocomplete(
        document.getElementById('autocompleteTo'),
        { types: ['geocode'] });
    autocompleteTo.addListener('place_changed', fillInAddressTo);
    autocompleteFrom = new google.maps.places.Autocomplete(
        document.getElementById('autocompleteFrom'),
        { types: ['geocode'] });
    autocompleteFrom.addListener('place_changed', fillInAddressFrom);
}




function fillInAddressFrom() {
    var place = autocompleteFrom.getPlace()

    for (var component in autocompleteFromInputs) {
        document.getElementById(autocompleteFromInputs[component]).value = '';
    }

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(autocompleteFromInputs[addressType]).value = val;
        }
    }
}

function fillInAddressTo() {
    var place = autocompleteTo.getPlace()

    for (var component in autocompleteToInputs) {
        document.getElementById(autocompleteToInputs[component]).value = '';
    }

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(autocompleteToInputs[addressType]).value = val;
        }
    }
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

//initAutocomplete();
