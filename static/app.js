// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"> 

let map;
let markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: Number(lattitude), lng: Number(longtitude)}, //these variables are being passed from trips.js 'show' function 
		zoom: 13,
	});
	let card = document.getElementById("pac-card");
	let input = document.getElementById("pac-input");
	let types = document.getElementById("type-selector");
	let strictBounds = document.getElementById("strict-bounds-selector");

	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

	let autocomplete = new google.maps.places.Autocomplete(input);

	// Bind the map's bounds (viewport) property to the autocomplete object,
	// so that the autocomplete requests use the current map bounds for the
	// bounds option in the request.
	autocomplete.bindTo("bounds", map);

	// Set the data fields to return when the user selects a place.
	autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

	let infowindow = new google.maps.InfoWindow();
	let infowindowContent = document.getElementById("infowindow-content");
	infowindow.setContent(infowindowContent);
	// let marker = new google.maps.Marker({
	// 	map: map,
	// 	anchorPoint: new google.maps.Point(0, -29),
	// });

	autocomplete.addListener("place_changed", function () {
		infowindow.close();
		// marker.setVisible(false);
		let place = autocomplete.getPlace();
		if (!place.geometry) {
			// User entered the name of a Place that was not suggested and
			// pressed the Enter key, or the Place Details request failed.
			window.alert("No details available for input: '" + place.name + "'");
			return;
		}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17); // Why 17? Because it looks good.
		}
		//marker.setPosition(place.geometry.location);
		console.log("Spot: " + place.geometry.location);
		//marker.setVisible(true);
		addMarker(place.geometry.location);

		let address = "";
		if (place.address_components) {
			address = [
				(place.address_components[0] &&
					place.address_components[0].short_name) ||
					"",
				(place.address_components[1] &&
					place.address_components[1].short_name) ||
					"",
				(place.address_components[2] &&
					place.address_components[2].short_name) ||
					"",
			].join(" ");
		}

		infowindowContent.children["place-icon"].src = place.icon;
		infowindowContent.children["place-name"].textContent = place.name;
		infowindowContent.children["place-address"].textContent = address;
		infowindow.open(map, marker);
	});

	// Sets a listener on a radio button to change the filter type on Places
	// Autocomplete.
	function setupClickListener(id, types) {
		let radioButton = document.getElementById(id);
		radioButton.addEventListener("click", function () {
			autocomplete.setTypes(types);
		});
	}

	setupClickListener("changetype-all", []);
	setupClickListener("changetype-address", ["address"]);
	setupClickListener("changetype-establishment", ["establishment"]);
	setupClickListener("changetype-geocode", ["geocode"]);

	document
		.getElementById("use-strict-bounds")
		.addEventListener("click", function () {
			console.log("Checkbox clicked! New state=" + this.checked);
			autocomplete.setOptions({ strictBounds: this.checked });
		});

	map.addListener("click", (event) => {
		addMarker(event.latLng);
	});
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
	});

	markers.push(marker);

	return marker;
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}
