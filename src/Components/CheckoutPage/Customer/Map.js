/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl
} from 'react-map-gl'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { getUserCoordinates, setDeliveryCoorrd } from '../../../apicaller'
import { MAP_TOKEN } from '../../../config'

const Loc = styled.img`
  height: 20px;
  width: 20px;
`

const Map = () => {
  const [customerCoords, setCustomerCoords] = useState(() => {
    const data = getUserCoordinates().center
    return { lat: data[0], long: data[1] }
  })
  const [placeName, setPlaceName] = useState('')
  const [viewPort, setViewPort] = useState({
    width: 'inherit',
    height: 'inherit',
    latitude: customerCoords.lat,
    longitude: customerCoords.long,
    zoom: 10
  })

  const geolocateStyle = {
    position: 'absolute',
    right: -3,
    bottom: 30,
    margin: 10
  }

  const navStyle = {
    position: 'absolute',
    right: -3,
    bottom: 70,
    margin: 10
  }

  useEffect(() => {
    Geolocation(customerCoords)
  }, [customerCoords])

  const Geolocation = ({ lat, long }) => {
    const config = {
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?country=IN&access_token=${MAP_TOKEN}`,
      headers: {}
    }

    axios(config)
      .then(function (response) {
        console.log('Geolocation', response.data)
        getLocation(response.data.features[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getLocation = (item) => {
    const long = item.center[0]
    const lat = item.center[1]
    const placeName = item.place_name
    setPlaceName(placeName)

    const Coordinates = {
      lat,
      long,
      placeName
    }
    setDeliveryCoorrd(Coordinates)
  }
  return (
    <>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={MAP_TOKEN}
        onViewportChange={(viewport) => {
          setViewPort(viewport)
        }}
        mapStyle='mapbox://styles/mapbox/light-v10'
      >
        <Marker
          key={customerCoords.lat}
          latitude={customerCoords.lat}
          longitude={customerCoords.long}
        >
          <Loc src='/Icons/mapbox.svg' alt='location' />
          {customerCoords?.area}
        </Marker>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          onGeolocate={(e) => {
            console.log('onGeolocate', e)
            setCustomerCoords({
              lat: e.coords.latitude,
              long: e.coords.longitude
            })
          }}
        />

        <div style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
      <div
        className='col mb-5'
        style={{
          padding: '0px'
        }}
      >
        <TextField
          label='Address'
          placeholder=''
          fullWidth
          constiant='outlined'
          style={{
            marginLeft: '0px',
            marginTop: '5px',
            borderRadius: '0px'
          }}
          value={placeName}
        />
      </div>
    </>
  )
}
export default Map
