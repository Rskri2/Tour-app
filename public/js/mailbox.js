/* eslint-disable  */


export const displayMap = (locations) => {
  mapboxgl.accessToken =
    '';
  
  const map = new mapboxgl.Map({
    container: 'map',
    style: '',
    scrollZoom:false
  });
  
  const bounds = new mapboxgl.LngLatBounds();
  
  locations.forEach((loc) => {
    //creating a marker
    const el = document.createElement('div');
    el.className = 'marker';
    //add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
  
    //add popup
    new mapboxgl.Popup({
      offset:30
    })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)
    //extend map bounds to include the current location
    bounds.extend(loc.coordinates);
  });
  
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    }
  });
}
