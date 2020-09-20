import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import LeafletMap from './leaflet-map'
import StreetList from './street-list'

import streetNames from '../../resources/streetnames.json'

export interface HomeProps extends RouteComponentProps<{}> {}

export const Home = (props: HomeProps) => {
  const [streetId, setStreetId] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(props.location.search)
    if (params) {
      setStreetId(params.get('street') || '')
    }
  }, [props.location.search])

  return (
  <>
    <LeafletMap mapData={streetNames} streetId={streetId} />
    <StreetList mapData={streetNames} streetId={streetId} />
  </>
)}

export default Home
