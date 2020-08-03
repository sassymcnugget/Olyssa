// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

//google.maps.event.addDomListeneer(window, "load", initMap());

function initMap() {
	const sydney = new google.maps.LatLng(-33.867, 151.195);
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById("map"), {
		center: sydney,
		zoom: 15,
	});

	const request = {
		query: "chuck e cheese",
		fields: ["name", "geometry"],
	};
	service = new google.maps.places.PlacesService(map);
	service.findPlaceFromQuery(request, (results, status) => {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
			map.setCenter(results[0].geometry.location);
		}
	});

	createPlaceAutoComplete();
}

function createPlaceAutoComplete() {
	let defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-33.8902, 151.1759),
		new google.maps.LatLng(-33.8474, 151.2631)
	);

	let options = { bounds: defaultBounds };

	let input = document.getElementById("pac-input");
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	autocomplete = new google.maps.places.Autocomplete(input, {});
}

function createMarker(place) {
	const marker = new google.maps.Marker({
		map,
		position: place.geometry.location,
	});
	google.maps.event.addListener(marker, "click", () => {
		infowindow.setContent(place.name);
		infowindow.open(map);
	});
}
