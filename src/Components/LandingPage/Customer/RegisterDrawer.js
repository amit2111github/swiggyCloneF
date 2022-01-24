import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import validator from 'validator'
//TODO:  phone number validation
// helpers method
const signup = (phoneNumber, name, email, password) => {
  return fetch(`https://sweggy-backend.herokuapp.com/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ phoneNumber, name, email, password })
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err)
    })
}
const signInAndVerifyOTP = (email, otp) => {
  return fetch(`https://sweggy-backend.herokuapp.com/user/login/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email, otp })
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const Div = styled.div`
  font-family: sans-serif;
`

const useStyles = makeStyles({
  list: {
    width: 450
  },
  fullList: {
    width: 'auto'
  }
})

const RegisterDrawer = () => {
  const classes = useStyles()
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [phNo, setPhNo] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState({
    bottom: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  // signup form
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      style={{ right: 0 }}
      role='presentation'
    >
      <Div className='container mt-3' style={{ width: '90%' }}>
        <Div className='row'>
          <Div className='col text-left'>
            <button
              type='button'
              className='btn btn-sm'
              onClick={(event) => {
                toggleDrawer(anchor, false)(event)
              }}
            >
              <i className='fas fa-times fa-lg'>{/*empty*/}</i>
            </button>
            <div className='container mt-2'>
              <div className='row'>
                <div className='col-lg-6 ml-3'>
                  <h3>Sign up</h3>
                  <small
                    onClick={(event) => {
                      toggleDrawer(anchor, false)(event)
                    }}
                  >
                    or <b style={{ color: '#fc8019' }}>login to your account</b>
                  </small>
                </div>
                <div className='col-lg-4 ml-3'>
                  <img
                    className='img-fluid'
                    style={{
                      width: '105px',
                      height: '100px',
                      borderRadius: '50%',
                      fload: 'right'
                    }}
                    src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'
                    alt='logo of wrap'
                  />
                </div>
              </div>
              <div className='container-fluid mt-3'>
                <div className='row'>
                  {/*phone no.*/}
                  <div className='col-lg-12'>
                    <TextField
                      label='Phone Number'
                      fullWidth
                      value={phNo}
                      variant='outlined'
                      error={phNo.length !== 10}
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setPhNo(e.target.value)
                      }}
                    />
                  </div>
                  {/*name*/}
                  <div className='col-lg-12'>
                    <TextField
                      label='Name'
                      placeholder=''
                      fullWidth
                      value={name}
                      error={name.length <= 0}
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                    />
                  </div>
                  {/*email*/}
                  <div className='col-lg-12'>
                    <TextField
                      label='Email'
                      placeholder=''
                      fullWidth
                      value={email}
                      error={isValidEmail}
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setIsValidEmail(!validator.isEmail(e.target.value))
                      }}
                    />
                  </div>
                  {/*password*/}
                  <div className='col-lg-12'>
                    <TextField
                      label='Password'
                      placeholder=''
                      fullWidth
                      value={password}
                      error={password.length < 4}
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                  <div className='col-lg-12 mt-3'>
                    <small
                      style={{
                        color: '#5d8ed5',
                        marginLeft: '1%',
                        fontWeight: 'bold'
                      }}
                    >
                      Have a referral code
                    </small>
                  </div>
                  {/*submit*/}
                  <div className='col-lg-12 text-center'>
                    <OtpDrawer
                      phoneNumber={phNo}
                      name={name}
                      email={email}
                      password={password}
                      setState={setState}
                      state={state}
                    />
                  </div>
                  <div>
                    <small
                      style={{
                        fontSize: '9px',
                        fontWeight: 'bold'
                      }}
                      className='text-muted mx-3'
                    >
                      By creating an account, I accept the{' '}
                      <small
                        style={{
                          color: '#5d8ed5',
                          fontSize: '9px',
                          fontWeight: 'bold'
                        }}
                      >
                        Terms & Conditions
                      </small>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </Div>
        </Div>
      </Div>
    </div>
  )

  return (
    <div>
      <button
        type='button'
        className=' btn btn-lg align-self-center font-weight-bold'
        onClick={(event) => {
          toggleDrawer('right', true)(event)
        }}
        style={{
          borderRadius: '0px',
          color: 'white',
          backgroundColor: 'black'
        }}
      >
        Sign Up
      </button>
      <Drawer
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  )
}

// otp sidebar
const OtpDrawer = ({ phoneNumber, name, email, password, setState, state }) => {
  const history = useHistory()
  const [otp, setOtp] = useState('')
  const classes = useStyles()
  const [state2, setState2] = useState({ bottom: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleOTPDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState2({ ...state2, [anchor]: open })
  }

  const signIn = async () => {
    setLoading(true)
    const data = await signInAndVerifyOTP(email, otp)
    setLoading(false)
    if (data.error) {
      setError(data.error)
      return
    }
    setState2({ ...state2, right: false })
    setState({ ...state, right: false })
    window.localStorage.setItem('user', JSON.stringify(data))
    history.push('/Restaurants')
  }
  const createAccount = async () => {
    if (!phoneNumber.match(/^\d{10}$/g)) {
      setError('Invalid phone number')
      return
    }
    if (!email) {
      setError('Email Required')
      return
    }
    if (!name) {
      setError('Name is Mandatory')
      return
    }
    if (password.length < 3) {
      setError('Password is too short.')
      return
    }
    setLoading(true)
    const data = await signup(phoneNumber, name, email, password)
    setLoading(false)
    if (data.error) {
      setError(data.error)
      return
    }
    setState2({ ...state2, right: true })
  }

  // form to show after otp ie.login
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      style={{ right: 0 }}
      role='presentation'
    >
      <Div className='container mt-3' style={{ width: '90%' }}>
        <Div className='row'>
          <Div className='col text-left'>
            <button
              type='button'
              className='btn btn-sm'
              onClick={toggleOTPDrawer(anchor, false)}
            >
              <i className='fas fa-arrow-left fa-lg'>{/*empty*/}</i>
            </button>
            <div className='container mt-2'>
              <div className='row'>
                <div className='col-lg-6 ml-3'>
                  <h3>Sign In</h3>
                  <p>Enter Otp</p>
                  <small>We've sent an OTP to your Email Address.</small>
                </div>
                <div className='col-lg-4 ml-4'>
                  <img
                    className='img-fluid'
                    style={{
                      width: '105px',
                      height: '100px',
                      borderRadius: '50%',
                      fload: 'right'
                    }}
                    src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'
                    alt='logo of wrap'
                  />
                </div>
              </div>
              <div className='container-fluid mt-5'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <TextField
                      label='Email'
                      value={email}
                      placeholder=''
                      fullWidth
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                    />
                  </div>
                  <div className='col-lg-12'>
                    <TextField
                      label='One time password'
                      placeholder=''
                      fullWidth
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setOtp(e.target.value)
                      }}
                    />
                  </div>

                  <div className='col-lg-12 text-center'>
                    {loading && (
                      <img src='https://icons8.com/preloaders/preloaders/1495/Spinner-3.gif' />
                    )}
                    <button
                      style={{
                        background: '#fc8019',
                        border: '1px solid #fc8019',
                        color: 'white',
                        marginTop: '15px',
                        width: '318px',
                        borderRadius: '2%'
                      }}
                      onClick={signIn}
                    >
                      <p
                        style={{
                          fontWeight: 'bold',
                          marginTop: '9px'
                        }}
                      >
                        VERIFY OTP
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Div>
        </Div>
      </Div>
    </div>
  )

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && (
        <img src='https://icons8.com/preloaders/preloaders/1495/Spinner-3.gif' />
      )}
      <button
        type='button'
        style={{
          background: '#fc8019',
          border: '1px solid #fc8019',
          color: 'white',
          marginTop: '15px',
          width: '318px',
          borderRadius: '2%'
        }}
        onClick={createAccount}
      >
        <p
          style={{
            fontWeight: 'bold',
            marginTop: '9px'
          }}
        >
          CONTINUE
        </p>
      </button>
      <Drawer
        anchor='right'
        open={state2.right}
        onClose={toggleOTPDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  )
}

export default RegisterDrawer
