import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import * as React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa'
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeForm, mapSelector, setCoordinate } from './mapSlice'
function SlideTransition(props) {
  return <Slide {...props} direction="up" timeout={200} />
}
const option = { enableHighAccuracy: true }
export default function Map(props) {
  const [viewport, setViewport] = React.useState({
    latitude: 16.054407,
    longitude: 108.202164,
    zoom: 10,
  })
  const { onSubmit, longitude, latitude } = useSelector(mapSelector)
  const [currentLat, setCurrentLat] = React.useState(16.054407)
  const [currentLng, setCurrentLng] = React.useState(108.202164)
  const addMarker = (lat, lng) => {
    setCurrentLat(lat)
    setCurrentLng(lng)
    dispatch(setCoordinate({ latitude: currentLat, longitude: currentLng }))
  }
  useEffect(() => {
    if (latitude && longitude) {
      setCurrentLat(latitude)
      setCurrentLng(longitude)
    }
  }, [longitude, latitude])
  const mapRef = useRef()
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  )
  const dispatch = useDispatch()
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    })
  }, [])

  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={Boolean(onSubmit)}
        onClose={() => {
          dispatch(closeForm())
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
            padding: 8,
            borderRadius: 17,
            height: '75vh',
          },
        }}
        TransitionComponent={SlideTransition}
      >
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              dispatch(closeForm())
            }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <DialogTitle>{'Map'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please choose one position</DialogContentText>
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            width="100%"
            height="340px"
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken="pk.eyJ1IjoibHZkMTgxMjk5IiwiYSI6ImNrd3VpNzgwNjEzNnIydXNlemRvcGhzZ3MifQ.Xy01Uv62oCHU4qS7rf2mBw"
            onClick={(event) => {
              addMarker(event.lngLat[1], event.lngLat[0])
            }}
          >
            <GeolocateControl positionOption={option} />
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken="pk.eyJ1IjoibHZkMTgxMjk5IiwiYSI6ImNrd3VpNzgwNjEzNnIydXNlemRvcGhzZ3MifQ.Xy01Uv62oCHU4qS7rf2mBw"
              position="top-right"
              onResult={(result) => console.log(result.result)}
            />
            <Marker
              offsetTop={-48}
              offsetLeft={-24}
              latitude={currentLat}
              longitude={currentLng}
            >
              <img src=" https://img.icons8.com/color/48/000000/marker.png" />
            </Marker>
          </ReactMapGL>
          <Box position="absolute" bottom={16} right={16}>
            <Button
              variant="text"
              style={{
                height: 36,
                width: 90,
                borderRadius: 10,
                fontSize: 13,
                boxShadow: 'none',
              }}
              onClick={() => {
                dispatch(closeForm())
              }}
            >
              CANCEL
            </Button>
            <Button
              style={{
                height: 36,
                width: 90,
                marginLeft: 20,
                borderRadius: 10,
                fontSize: 13,
                boxShadow: 'none',
                color: 'white',
                marginRight: 16,
              }}
              onClick={() => {
                dispatch(
                  setCoordinate({ latitude: currentLat, longitude: currentLng })
                )
                dispatch(closeForm())
              }}
              variant="contained"
              color="primary"
            >
              CHOOSE
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
