import React from 'react'
import styled from 'styled-components'
import Location from './Location.js'
import { useHistory } from 'react-router-dom'
import { getDeliveryLocation } from '../../../apicaller'

const Wrapper = styled.div`
  font-family: system-ui !important;
  line-height: 1.2;
  background: #fff;
  margin-bottom: 20px;
  padding-top: 35px;
  padding-bottom: 39px;
`
const Logo = styled.div`
  left: -35px;
  width: 0px;
  height: 0px;
  background-color: #282c3f;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
  top: -10px;
  padding: 0px !important;
`
const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: #282c3f;
`
const LocationIcon = styled.img`
  height: 50px;
  width: 50px;
  vertical-align: inherit;
  margin-radius: 0px;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
`
const AddressTitle = styled.p`
  margin-bottom: 4px;
  font-size: 17px;
  font-weight: 600 !important;
  color: #282c3f;
  line-height: 1.18;
`
const AddressText = styled.p`
  font-size: 13px;
  color: #93959f;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 16px;
  overflow: hidden;
`
const AddressContainer = styled.button`
  border: 1px dashed #e9e9eb;
  padding: 0px;
  background: white;
  &:hover {
    box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
  }
`
const AddLocation = styled.img`
  height: 25px;
  width: 25px;
  vertical-align: inherit;
  margin-radius: 0px;
`
const Tick = styled.img`
  margin-left: 15px;
  height: 20px;
  width: 20px;
  vertical-align: inherit;
`
const Change = styled.button`
  border: 1px solid #fc8019;
  font-family: system-ui !important;
  font-weight: 500;
  border-radius: 0px;
  color: #fc8019;
  &:hover {
    background-color: #fc8019;
    color: #fff !important;
  }
`
const Address = (props) => {
  const history = useHistory()
  const { flag } = props

  const AddrSelected = (selectedAddress) => {
    const array = getDeliveryLocation()
    array.forEach((element) => {
      if (element.lat === selectedAddress.lat) {
        element.opted = true
      }
    })
    window.localStorage.setItem('deliveryLocation', JSON.stringify(array))
    history.push({
      pathname: '/CheckoutPage',
      isAddrSelected: !flag
    })
  }

  let addresses = getDeliveryLocation()
  if (addresses && addresses.length > 0) {
    addresses = addresses.slice(0, Math.min(addresses.length, 2))
  }

  return (
    <>
      <Wrapper className='container'>
        <div className='row'>
          <Logo className='col-1'>
            <LocationIcon src='Icons/placeholder.svg' alt='placeholder' />
          </Logo>
          <div className='col-11'>
            <div className='row '>
              <div className='col'>
                <Title>
                  Delivery Address
                  <Tick src='Icons/checkmark.svg' alt='Check' />
                </Title>
              </div>
              <div className='w-100' />
              {addresses &&
                addresses.map((address, index) => (
                  <React.Fragment key={index}>
                    <div className='col-6 mt-2'>
                      <div className='container'>
                        <AddressContainer type='button' className='row py-3'>
                          <div className='col-1'>
                            <AddLocation
                              src='Icons/location.svg'
                              alt='placeholder'
                            />
                          </div>
                          <div className='col'>
                            <div className='row row-cols-1'>
                              <AddressTitle className='col text-left'>
                                Home
                              </AddressTitle>
                              <AddressText>
                                <div className='col text-left text-capitalize'>
                                  {address.flat_no}, {address.landmark},
                                  {address.placeName}
                                </div>
                                <div className='col mb-3 text-left text-capitalize'>
                                  {address.type} Address
                                </div>
                              </AddressText>
                              <b className='col mb-1 text-left'>30 mins</b>
                            </div>
                          </div>
                        </AddressContainer>
                      </div>
                    </div>
                    <div className='col-5'>
                      <Change
                        type='button'
                        className='btn'
                        onClick={() => AddrSelected(address)}
                      >
                        CHECKOUT
                      </Change>
                    </div>
                  </React.Fragment>
                ))}
              <div className='col-6 mt-2'>
                <div className='container'>
                  <Location />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Address
