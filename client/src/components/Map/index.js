import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import propTypes from 'prop-types';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ';

function Map(props){
  

  let articlesCoordinates = [props.articlesCoordinates]

  console.log(articlesCoordinates);
  const [state, setState] = useState({lng: -122.51, lat: 47.62, zoom: 7.89});
 
  const mapContainerRef = useRef()

  useEffect(() =>{
    if(!props.userLatitude){
      return
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.userLongitude, props.userLatitude],
      zoom: 8
    });

  
    map.on('load',  function() { 

      new mapboxgl.Marker()
        .setLngLat({lon: props.userLongitude, lat: props.userLatitude})
        .addTo(map)

      map.addSource('articles', {
        'type': 'geojson',
        'data': '../articles/'
        //insert correct link to articles geojason data in quotes above
      });

      map.addLayer(
        {
          'id': 'articles-heat',
          'type': 'heatmap',
          'source': 'articles',
          'maxzoom': 9,
          'paint': {
            // Increase the heatmap weight based on frequency and num = number of articles
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'num'],
              0,
              1,
              2,
              3
            ],

            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3
            ],

            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],

            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20
            ],

            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0
            ]
          }
        },
        'waterway-label'
      );
      
      map.addLayer(
        {
          'id': 'article-point',
          'type': 'circle',
          'source': 'articles',
          'minzoom': 7,
          'paint': {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'num'], 1, 1, 6, 4],
              16,
              ['interpolate', ['linear'], ['get', 'num'], 1, 5, 6, 50]
            ],

            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'num'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)'
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,

            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              0,
              8,
              1
            ]
          }
        },
        'waterway-label'
      );
    });


    map.on('move', () => {
      setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  },[props])


  return(
    <div className="map_box_container">
      <div ref={mapContainerRef} className='mapContainer' />
      <div className='sidebarStyle'>
        <div>Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}</div>
      </div>
    
    </div>
  )
}
Map.propTypes={
  articlesCoordinates: propTypes.array,
  userLongitude: propTypes.number,
  userLatitude: propTypes.number
}

export default Map;