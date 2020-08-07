let map;
let markers = [];
let allMarkersBounds;

let infoWindow;
let infowindowContent;

async function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: Number(lattitude), lng: Number(longtitude) }, //these variables are being passed from trips.js 'show' function
		zoom: 13,
	});

	let card = document.getElementById("pac-card");
	let input = document.getElementById("pac-input");
	let types = document.getElementById("type-selector");
	let strictBounds = document.getElementById("strict-bounds-selector");

	if (currentUser) {
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
	}

	allMarkersBounds = new google.maps.LatLngBounds();

	let autocomplete = new google.maps.places.Autocomplete(input);

	// Bind the map's bounds (viewport) property to the autocomplete object,
	// so that the autocomplete requests use the current map bounds for the
	// bounds option in the request.
	autocomplete.bindTo("bounds", map);

	// Set the data fields to return when the user selects a place.
	autocomplete.setFields([
		"address_components",
		"geometry",
		"icon",
		"name",
		"photos",
	]);

	infowindow = new google.maps.InfoWindow();
	infowindowContent = document.getElementById("infowindow-content");
	infowindow.setContent(infowindowContent);

	autocomplete.addListener("place_changed", function () {
		infowindow.close();
		let place = autocomplete.getPlace();
		focusPlace(place);
		// addToTrip(place);
		sightMarker(place);
	});

	await addSightSeeingMarkers();

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
}

function focusPlace(place) {
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
		map.setZoom(17);
	}
	let marker = addMarker(place.geometry.location);

	let address = getAddressComponents(place);

	infowindowContent.children["place-icon"].src = place.icon;
	infowindowContent.children["place-name"].textContent = place.name;
	infowindowContent.children["place-address"].textContent = address;
	infowindow.open(map, marker);
}

function backgroundChange() {
	document.body.style.backgroundImage = "url('img_tree.png')";
}

function getAddressComponents(place) {
	let address = "";
	if (place.address_components) {
		address = [
			(place.address_components[0] && place.address_components[0].short_name) ||
				"",
			(place.address_components[1] && place.address_components[1].short_name) ||
				"",
			(place.address_components[2] && place.address_components[2].short_name) ||
				"",
		].join(" ");
	}
	return address;
}
