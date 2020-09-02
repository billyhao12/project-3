import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import propTypes from 'prop-types';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ';

function Map(props){
  
  let userLatitude = props.userLatitude
  let userLongitude = props.userLongitude
  let articlesCoordinates = [props.articlesCoordinates]

  console.log(articlesCoordinates);
  const [state, setState] = useState({lng: -122.51, lat: 47.62, zoom: 7.89});

  const mapContainerRef = useRef()

  useEffect(() => {


    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [state.lng, state.lat],
      zoom: state.zoom
    });

    
    // var articleMarker = new mapboxgl.Marker()
    //     .setLngLat([{}])

    map.on('load',  function() { 
      setState({
        lng: userLongitude,
        lat: userLatitude
      })
      //  new mapboxgl.Marker().setLngLat({lng: userLongitude, lat: userLatitude})
      //   .addTo(map)
      map.resize();
    });

    map.on('move', () => {
      setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    console.log(props.coordinates)
  
  },[props.coordinates] )


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