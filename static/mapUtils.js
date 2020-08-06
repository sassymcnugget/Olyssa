//const sightseeings = require("../controllers/sightseeings");

//temporary array to contain map information
let tripArray = [];

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

function addSightSeeingMarkers() {
	return fetch("/trips/api/" + tripId)
		.then((data) => {
			console.log(data);
			return data.json();
		})
		.then((tripData) => {
			console.log(tripData);
			for (i = 0; i < tripData.sightseeing.length; i++) {
				const marker = new google.maps.Marker({
					name: tripData.sightseeing[i].name,
					position: new google.maps.LatLng(
						tripData.sightseeing[i].lat,
						tripData.sightseeing[i].lng
					),
					map: map,
				});
				markers.push(marker);
			}
		});
}

function sightMarker(place) {
	console.log("Posting the data from place");
	place.tripId = tripId;
	let data = {
		tripId: tripId,
		name: place.name,
		address: getAddressComponents(place),
		lat: place.geometry.location.lat(),
		lng: place.geometry.location.lng(),
		img: place.photos[0].getUrl(),
	};
	console.log("sightMarker Data: ", data);
	fetch("/sightseeings/api/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}
