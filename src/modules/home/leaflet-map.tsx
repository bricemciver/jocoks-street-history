import 'leaflet/dist/leaflet.css'

import React, { useRef, useEffect, useState } from 'react';
import * as L from 'leaflet';
import { FeatureCollection } from 'geojson';

import { makeStyles } from '@material-ui/core/styles';

const mapboxAccessToken = 'pk.eyJ1IjoiYnJpY2VtY2l2ZXIiLCJhIjoiY2owcTk1bTh0MDFucjJxbzZwbGVobGI3NCJ9.bW1ik7AcsZmUqOYOrypCVA';
const mapboxTiles = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
  attribution:
    '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  tileSize: 512,
  zoomOffset: -1,
});

const useStyles = makeStyles({
  root: (props: LeafletProps) => ({
    minHeight: '500px',
    height: props.height || '100%'
  })
})

export interface LeafletProps {
  height?: string,
  mapData: any,
  streetId?: string,
}

export const LeafletMap = (props: LeafletProps) => {
  const [leafletMap, setLeafletMap] = useState<L.Map>()
  const [geojsonLayer, setGeojsonLayer] = useState<L.GeoJSON>()
  const featureCollection = props.mapData as FeatureCollection
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current && !leafletMap) {
      const map = L.map(mapRef.current, { zoomSnap: 0 })
      const geoData = L.geoJSON()
      map.zoomControl.setPosition('bottomright')
      map.addLayer(mapboxTiles)
      map.fitBounds([[39.043589, -94.857366], [38.932293, -94.610127]])
      geoData.addTo(map)
      setLeafletMap(map)
      setGeojsonLayer(geoData)
    }
    return () => {
      if (leafletMap) {
        leafletMap.remove()
      }
    }
  }, [leafletMap])

  useEffect(() => {
    if (leafletMap && geojsonLayer) {
      // refilter based on selected street
      geojsonLayer.clearLayers()
      geojsonLayer.options = {
        filter: (feature) => feature.id === props.streetId
      }
      geojsonLayer.addData(featureCollection)
      const bounds = geojsonLayer.getBounds()
      if (bounds.isValid()) {
        leafletMap.fitBounds(bounds, { padding: [10, 10] })
      }
    }
  }, [featureCollection, leafletMap, geojsonLayer, props.streetId])

  const classes = useStyles(props)
  return (
    <div className={classes.root} ref={mapRef} />
  );
};

export default LeafletMap
