import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  getcartItem,
  createPayment,
  makeOrder,
  getUser,
  getHotel,
  getDeliveryLocation
} from '../../../apicaller'
import { RAZORKEY } from '../../../config'

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

const Wallet = styled.img`
  height: 50px;
  width: 50px;
  vertical-align: inherit;
  margin-radius: 0px;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
`

const WarningText = styled.p`
  font-size: 13px;
  color: #93959f;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 16px;
  overflow: hidden;
  border: 1px dashed #60b246;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
`
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Payment = () => {
  const history = useHistory()
  const cartItem = getcartItem()
  const totalPrice = cartItem.reduce(
    (prev, cur) => prev + cur.qty * cur.price,
    0
  )

  const handlePayment = async (event) => {
    const user = getUser()
    event.preventDefault()
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }
    const data = await createPayment(totalPrice, user.token, user._id)
    if (data.error) {
      console.log(data)
      alert('Error')
      return
    }

    const options = {
      key: RAZORKEY,
      name: 'RazorPay',
      description: 'Food Order',
      order_id: data.id,
      handler: async (response) => {
        console.log(response)
        try {
          const { razorpay_payment_id, razorpay_signature } = response
          const order = assembleOrderData()
          const paymentData = await makeOrder(
            razorpay_payment_id,
            data.id,
            razorpay_signature,
            cartItem,
            user._id,
            order,
            user.token
          )
          if (paymentData.error) {
            alert(paymentData.error)
            return
          }
          cleanUp()
          history.push('/Confirmation')
        } catch (err) {
          console.log(err)
        }
      },
      theme: {
        color: '#e46d47'
      }
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  const cleanUp = () => {
    window.localStorage.setItem('cart', JSON.stringify([]))
    const address = getDeliveryLocation()
    address.forEach((location) => {
      if (location.opted) location.opted = false
    })
    window.localStorage.setItem('deliveryLocation', JSON.stringify(address))
  }
  const assembleOrderData = () => {
    const hotel = getHotel()
    const address = getDeliveryLocation().find((location) => location.opted)
    const items = []
    cartItem.forEach((item) => {
      const temp = {
        name: item.name,
        price: item.price,
        quantity: item.qty,
        veg: item.veg
      }
      items.push(temp)
    })

    const data = {
      restaurant_id: hotel._id,
      restaurant_name: hotel.name,
      location: hotel.geometry,
      address_1: address?.flat_no,
      address_2: address?.landmark,
      img_url: hotel.img_url,
      items: items
    }
    return data
  }

  return (
    <>
      <>
        <Wrapper className='container'>
          <div className='row'>
            <Logo className='col-1'>
              <Wallet src='Icons/wallet.svg' alt='placeholder' />
            </Logo>
            <div className='col-11'>
              <div className='row row-cols-1'>
                <div className='col'>
                  <Title>Payment</Title>
                </div>
                <WarningText className='col-10 ml-3 mb-3 '>
                  Please use RazorPay as Payment method as other services are
                  under Maintenance.
                </WarningText>
                <button
                  className='btn btn-success btn-sm col-3 ml-3 mt-4'
                  onClick={handlePayment}
                >
                  <img
                    src='https://razorpay.com/assets/razorpay-logo-white.svg'
                    alt='RazorPay'
                    style={{
                      width: 'inherit',
                      height: 'inherit'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </>
    </>
  )
}

export default Payment
