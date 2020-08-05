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

//function that allows us to add sights to trip
function addToTrip(place) {
	let placeDiv = document.createElement("div");
	placeDiv.innerHTML = place.name;
	placeDiv.classList.add("card", "p-2", "rounded-0");

	let tripPanel = document.querySelector("#trip-panel");
	tripPanel.appendChild(placeDiv);

	tripArray.push(place);
}

// need to iterate over the array of sightseeings
// get the sightseeings.lat ,  sightseeings.long  and place them as a Points on the map

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

//new function
//purpose saves sightseeings to database
function sightMarker(place) {
	fetch("/trips/api/", {
		//post method
		//body attribute (place)
		//content type header (check docs)
	});
}
