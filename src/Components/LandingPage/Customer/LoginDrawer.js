import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import validator from 'validator'

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
const getOtpForLogin = (email, password) => {
  return fetch(`https://sweggy-backend.herokuapp.com/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email, password })
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

const LoginDrawer = () => {
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
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
              onClick={toggleDrawer(anchor, false)}
            >
              <i className='fas fa-times fa-lg'></i>
            </button>
            <div className='container mt-2'>
              <div className='row'>
                <div className='col-lg-5 ml-3'>
                  <h3>Login</h3>
                  <small>
                    or <b style={{ color: '#fc8019' }}>create an account</b>
                  </small>
                </div>
                <div className='col-lg-5 ml-4'>
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
                  <div className='col-lg-12'>
                    <TextField
                      id='outlined-textarea'
                      label='Email'
                      placeholder=''
                      fullWidth
                      error={!isValidEmail}
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px',
                        marginBottom: '10px'
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setIsValidEmail(validator.isEmail(e.target.value))
                      }}
                    />
                  </div>
                  <div className='col-lg-12'>
                    <TextField
                      id='outlined-textarea'
                      label='password'
                      placeholder=''
                      fullWidth
                      error={password.length <= 0}
                      variant='outlined'
                      style={{
                        marginLeft: '0px',
                        borderRadius: '0px'
                      }}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                  <div className='col-lg-12 text-center'>
                    <OtpDrawer
                      email={email}
                      password={password}
                      setState={setState}
                      state={state}
                    />
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
        onClick={toggleDrawer('right', true)}
      >
        Login
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

const OtpDrawer = ({ email, setState, state, password }) => {
  const [otp, setOtp] = useState('')
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [state2, setState2] = React.useState({
    bottom: false
  })
  const [error, setError] = useState('')

  const toggleOTPDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState2({ ...state2, [anchor]: open })
  }

  const handleVerify = async () => {
    setError('')
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
    window.location.href = '/Restaurants'
  }

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
              <i className='fas fa-arrow-left fa-lg'></i>
            </button>
            <div className='container mt-2'>
              <div className='row'>
                <div className='col-lg-6 ml-3'>
                  <h3>Enter OTP</h3>
                  <small>We've sent an OTP to your Email</small>
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
                        borderRadius: '0px'
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                      style={{
                        background: '#fc8019',
                        border: '1px solid #fc8019',
                        color: 'white',
                        marginTop: '15px',
                        width: '318px',
                        borderRadius: '2%'
                      }}
                      onClick={handleVerify}
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
  const login = async () => {
    setLoading(true)
    setError('')
    const data = await getOtpForLogin(email, password)
    setLoading(false)
    if (data.error) {
      setError(data.error)
      return
    }
    setState2({ ...state2, right: true })
  }

  return (
    <div>
      {loading && (
        <img
          src='https://icons8.com/preloaders/preloaders/1495/Spinner-3.gif'
          alt='dan'
        />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        onClick={login}
      >
        <p
          style={{
            fontWeight: 'bold',
            marginTop: '9px'
          }}
        >
          LOGIN
        </p>
      </button>
      <Drawer
        anchor='right'
        open={state2['right']}
        onClose={toggleOTPDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  )
}

export default LoginDrawer
