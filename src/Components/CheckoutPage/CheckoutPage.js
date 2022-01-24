import React, { useState, useEffect } from 'react'
import CheckoutNavigator from './CheckoutNavigator.js'
import styled from 'styled-components'
import Login from './Customer/Login.js'
import Address from './Customer/Address.js'
import Payment from './Customer/Payment.js'
import Orders from './Customer/Orders.js'
import MainFooter from '../LandingPage/MainFooter.js'
import { setUserCoordinates } from '../../apicaller'
const token =
  process.env.REACT_APP_MAP_TOKEN ||
  'pk.eyJ1IjoiYW1pdDIxMTEiLCJhIjoiY2t4enYybXNuMzhsdzMycDRrYzZ4YWtqdSJ9.pK-SzZf5jFOYBF_EzpegsA'

const Wrapper = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  min-height: 100%;
  background: #e9ecee;
  margin-top: 5.2%;
  padding-bottom: 10%;
  font-size: 14px;
  line-height: 1.2;
  min-height: 100%;
`
const CheckoutPage = (props) => {
  const getAddress = (lat, lon) => {
    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=poi&access_token=${token}`
    )
      .then((res) => res.json())
      .then((res) => {
        return res.features[0]
      })
      .catch((err) => console.log(err))
  }
  const [isAddrSelected, setIsAddrSelected] = useState(false)
  useEffect(() => {
    setIsAddrSelected(props.location.isAddrSelected || false)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const data = await getAddress(coords.latitude, coords.longitude)
          setUserCoordinates(data)
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      )
    }
  }, [props.location.isAddrSelected])
  return (
    <>
      <CheckoutNavigator />
      <Wrapper className='container-fluid'>
        <div className='container'>
          <div className='row'>
            <div className='col-8'>
              <div className='row row-cols-1 text-left'>
                <div className='col'>
                  <Login />
                </div>
                {!isAddrSelected && (
                  <div className='col'>
                    <Address flag={isAddrSelected} />
                  </div>
                )}
                {isAddrSelected && (
                  <div className='col'>
                    <Payment />
                  </div>
                )}
              </div>
            </div>
            <div className='col-4'>
              <Orders />
            </div>
          </div>
        </div>
      </Wrapper>
      <MainFooter />
    </>
  )
}
export default CheckoutPage
