const map = L.map("map").setView([1, 100], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/**creating a custom icon */
const myIcon = L.icon({
  iconUrl: "Iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

/**adding marker to the map with custom icon */
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

const getIssLoc = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const { latitude } = data;
  const { longitude } = data;
  const { velocity } = data;
  const { visibility } = data;
  const { altitude } = data;

  document.querySelector(".alt").innerText = `Altitude: ${altitude}`;
  document.querySelector(".lon").innerText = `Longitude: ${longitude}`;
  document.querySelector(".lat").innerText = `Latitude: ${latitude}`;
  document.querySelector(".vel").innerText = `Velocity: ${velocity}`;
  document.querySelector(".vis").innerText = `Iss is in ${visibility}`;

  /**map view to center around the marker */
  map.setView([latitude, longitude], map.getZoom());

  /**update the marker for every second */
  marker.setLatLng([latitude, longitude]);
};

getIssLoc();

setInterval(getIssLoc, 1000);
