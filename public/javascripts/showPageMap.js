// const campground = require("../../models/campground");

maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS, //SATELLITE
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 13, // starting zoom
});

//To add a marker
const marker = new maptilersdk.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })
      .setLngLat(campground.geometry.coordinates)
      .setHTML(`<h3>${campground.title}</h3> <p>${campground.location}</p>`)
  )
  .addTo(map);

console.log(campground.geometry.coordinates);
