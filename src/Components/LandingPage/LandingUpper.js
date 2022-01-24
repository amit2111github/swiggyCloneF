import React, { useState } from 'react'
import {
  Div,
  InnerDiv,
  MainImg,
  Logo,
  Search,
  City,
  CardContainer,
  Card,
  CardImg
} from './LandingStyledComponents'
import LoginDrawer from './Customer/LoginDrawer.js'
import RegisterDrawer from './Customer/RegisterDrawer.js'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const LandingUpper = ({ history }) => {
  const [data, setData] = useState([])
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const getLocation = (data) => {
    if (data.length > 0) {
      const long = data[0].center[0]
      const lat = data[0].center[1]
      const temp = data[0].place_name.split(', ')
      const area = temp[0]
      temp.shift()
      const placeName = temp.join(', ')

      const Coordinates = {
        lat,
        long,
        area,
        placeName
      }
      localStorage.setItem('Coordinates', JSON.stringify(Coordinates))
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getLocation(data)
    }
  }
  const goTo = () => {
    history.push('/Restaurants')
  }
  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos)
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos.coords.latitude},${pos.coords.longitude}.json`,
        {
          method: 'get',
          params: {
            access_token:
              'pk.eyJ1IjoiZmFoZHNoYWlraCIsImEiOiJja2gzYzB3a3YwaXlsMnJvaWJ3ZDdiYzBpIn0.EC5-vAFFL-32D0ZCkCkQFg'
          }
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
    })
  }

  const handleInputChange = (event) => {
    axios({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json`,
      params: {
        access_token:
          'pk.eyJ1IjoiZmFoZHNoYWlraCIsImEiOiJja2gzYzB3a3YwaXlsMnJvaWJ3ZDdiYzBpIn0.EC5-vAFFL-32D0ZCkCkQFg'
      }
    })
      .then((res) => {
        setData([...res.data.features])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Div className='container-fluid'>
        <div className='row'>
          <div className='col-6  ml-auto'>
            {/* LOGO */}
            <InnerDiv className='container'>
              <div className='row '>
                <div className='col-1 mr-auto align-self-start'>
                  <Logo
                    src='https://d2sj89osparb2a.cloudfront.net/images/media/swiggy-cashback-coupons.png'
                    alt='logo'
                  />
                </div>
                <div
                  className='col-lg-2 btn btn-lg align-self-center font-weight-bold '
                  style={{ textAlign: 'right' }}
                >
                  <LoginDrawer
                    setShowLogin={setShowLogin}
                    showLogin={showLogin}
                    setShowSignUp={setShowSignUp}
                  />
                  {/* Login */}
                </div>
                <div
                  className='col-lg-3 btn btn-lg align-self-center font-weight-bold'
                  style={{
                    // border: '1px solid red',
                    textAlign: 'left'
                  }}
                >
                  <RegisterDrawer
                    setShowSignUp={setShowSignUp}
                    showSignUp={showSignUp}
                    setShowLogin={setShowLogin}
                  />
                </div>
              </div>
            </InnerDiv>

            {/* SOME TEXT & TAG LINE */}
            <InnerDiv className='container'>
              <div className='row align-self-start row-cols-1'>
                <div className='col text-left text-wrap  mb-1'>
                  <p className='h2 font-weight-bold'> Cooking gone wrong ? </p>
                </div>
                <div className='col text-left text-wrap'>
                  <p className='h4 text-muted'>
                    Order food from favourite restaurants near you.
                  </p>
                </div>
              </div>
            </InnerDiv>

            {/* SEARCH BAR */}
            <div className='container'>
              <Search className='row ' style={{ border: '1px solid #fc8019' }}>
                <div className='col-10 text-left align-self-center'>
                  <div className='row'>
                    <Autocomplete
                      className='col-lg-9 col-md-8 col-sm-8 mr-0  text-left form-control-plaintext form-control-lg ml-2  text-muted font-weight-bold'
                      freeSolo
                      id='free-solo-2-demo'
                      disableClearable
                      options={data.map((place) => place.place_name)}
                      renderInput={(params) => (
                        <TextField
                          className='text-left form-control-plaintext form-control-lg text-muted font-weight-bold'
                          id='outlined-helperText'
                          placeholder='Enter Your delivery location'
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search'
                          }}
                          fullWidth
                          style={{
                            fontSize: '20px'
                          }}
                        />
                      )}
                    />
                    <button
                      type='button'
                      className='col-2  btn btn-sm align-self-center text-right ml-4'
                      onClick={handleGetCurrentLocation}
                    >
                      Locate Me
                    </button>
                  </div>
                </div>
                <button
                  type='button'
                  className='col-2 btn btn-lg'
                  onClick={goTo}
                  style={{
                    height: '100%',
                    color: 'white',
                    backgroundColor: '#fc8019',
                    borderRadius: '0px'
                  }}
                >
                  <h6 className='font-weight-bold'>FIND FOOD</h6>
                </button>
              </Search>
            </div>

            {/* POPULAR CITIES */}
            <City className='container'>
              <div className='row row-cols-1'>
                <div className='col text-left text-wrap mb-1 text-uppercase h6 text-muted '>
                  Popular cities in India
                </div>
                <div
                  className='container'
                  style={{
                    marginLeft: '0px'
                  }}
                >
                  <ul
                    className='list-inline d-flex justify-content-space-between'
                    style={{
                      marginLeft: '0px',
                      textAlign: 'left'
                    }}
                  >
                    <li
                      className='list-inline-data[0] font-weight-bold'
                      style={{
                        marginRight: '5px'
                      }}
                    >
                      Ahmedabad
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold text-muted'
                      style={{ marginRight: '5px' }}
                    >
                      Bangalore
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold'
                      style={{ marginRight: '5px' }}
                    >
                      Chennai
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold text-muted'
                      style={{ marginRight: '5px' }}
                    >
                      Delhi
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold'
                      style={{ marginRight: '5px' }}
                    >
                      Gurgaon
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold text-muted'
                      style={{ marginRight: '5px' }}
                    >
                      Hyderabad
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold'
                      style={{ marginRight: '5px' }}
                    >
                      Kolkata
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold text-muted'
                      style={{ marginRight: '5px' }}
                    >
                      Mumbai
                    </li>
                    <br />
                    <li
                      className='list-inline-data[0] font-weight-bold'
                      style={{ marginRight: '5px' }}
                    >
                      Pune
                    </li>
                    <li
                      className='list-inline-data[0] font-weight-bold text-muted'
                      style={{ marginRight: '5px' }}
                    >
                      &more
                    </li>
                  </ul>
                </div>
              </div>
            </City>
          </div>
          {/* MAIN IMAGE */}
          <div className='col-5'>
            <MainImg
              src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Dinner1-new_s93yyf'
              alt='swiggy main'
            />
          </div>
        </div>

        {/* MIDDLE PART */}
        <CardContainer className='row justify-content-around pb-2'>
          <div className='col-3 ml-2 mt-3 pb-5'>
            <Card className='card'>
              <CardImg
                src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf'
                className='card-img-top align-self-center'
                alt='No Minimum Order'
              />
              <div className='card-body' style={{ color: 'white' }}>
                <p className='card-title h4 font-weight-bold mt-2'>
                  No Minimum Order
                </p>
                <p className='card-text'>
                  Order in for yourself or for the group, with no restrictions
                  on order value
                </p>
              </div>
            </Card>
          </div>
          <div className='col-3 mt-3'>
            <Card className='card'>
              <CardImg
                src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy'
                className='card-img-top align-self-center'
                alt='Live Order Tracking'
              />
              <div className='card-body' style={{ color: 'white' }}>
                <h5 className='card-title h4 font-weight-bold mt-2'>
                  Live Order Tracking
                </h5>
                <p className='card-text'>
                  Know where your order is at all times, from the restaurant to
                  your doorstep
                </p>
              </div>
            </Card>
          </div>
          <div className='col-3 mr-2 mt-3'>
            <Card className='card'>
              <CardImg
                src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn'
                className='card-img-top align-self-center'
                alt='Lightning-Fast Delivery'
              />
              <div className='card-body' style={{ color: 'white' }}>
                <h5 className='card-title h4 font-weight-bold mt-2'>
                  Lightning-Fast Delivery
                </h5>
                <p className='card-text'>
                  Experience Swiggy's superfast delivery for food delivered
                  fresh & on time
                </p>
              </div>
            </Card>
          </div>
        </CardContainer>
      </Div>
    </>
  )
}

export default withRouter(LandingUpper)
