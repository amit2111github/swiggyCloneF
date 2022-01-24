import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHotel, getHotelDetails } from '../../../apicaller'

const Wrapper = styled.div`
  padding-left: 0px !important;
  div {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
`

const Logo = styled.img`
  width: 50px;
  height: 50px;
  padding-left: 0px !important;
`

const Title = styled.p`
  margin-top: 5px;
  margin-bottom: 1px;
  font-size: 17px !important;
  color: #282c3f;import { getHotel } from 'frontend\src\apicaller';
import { useEffect } from 'react';

  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1rem;
`

const Hotel = () => {
  const hotel = getHotel()
  const [placeName, setPlaceName] = useState('')
  useEffect(async () => {
    const data = await getHotelDetails(hotel._id)
    if (data.error) {
      alert('Error')
      return
    }
    setPlaceName(data.geometry.place_name)
  }, [])
  return (
    <Wrapper>
      <div className='row mb-3'>
        <div className='col-2 col-md-auto'>
          <Logo src={hotel.img_url} alt='Hotel' />
        </div>
        <div
          className='col row-cols-1 text-truncate ml-2'
          style={{ maxWidth: '60%', borderBottom: '2px solid black' }}
        >
          <div className='col'>
            <Title>{hotel.name}</Title>
          </div>
          <div className='col text-truncate text-muted font-weight-light'>
            {placeName}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Hotel
