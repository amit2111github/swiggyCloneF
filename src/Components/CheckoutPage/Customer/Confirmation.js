import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Confirmation = () => {
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      history.push('/my-account')
    }, 3000)
  }, [])
  return (
    <div>
      <div className='container'>
        <div>
          <img
            src='https://trioangleblog.s3-us-west-2.amazonaws.com/trioangle/images/swiggy-banner.svg'
            alt='swiggy'
          />
          <div>
            <h2
              className='text-success'
              style={{
                fontFamily: 'sans-serif',
                fontSize: '50px'
              }}
            >
              ORDER CONFIRMED
            </h2>
          </div>
          <img
            src='data:image/png;base64,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'
            alt='CheckMark'
            style={{
              width: '80px',
              marginTop: '40px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Confirmation
