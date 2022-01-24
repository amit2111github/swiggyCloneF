import React from 'react'
import { useHistory } from 'react-router-dom'
import MiniCartOrders from '../CheckoutPage/Customer/MiniCartOrders.js'
import EmptyCart from './EmptyCart'
import { getcartItem } from '../../apicaller'

const MiniCart = () => {
  const cart = getcartItem()
  const history = useHistory()
  const handleCheckout = () => {
    history.push('/CheckoutPage')
  }
  return (
    <div>
      {cart && cart.length > 0 && (
        <div className='container'>
          <div className='row'>
            <MiniCartOrders />
          </div>
          <div className='row'>
            <div className='col' />
          </div>
          <div className='row'>
            <div className='col-9 text-left'>
              <h6 className='mt-3 font-weight-bold mb-0'>Subtotal</h6>
              <small className='text-muted font-weight-normal'>
                Extra charges may apply
              </small>
            </div>
            <div className='col-3 mt-3 text-right mb-3'>
              <b> ₹{cart.reduce((a, b) => a + b.qty * b.price, 0)}</b>
            </div>
            <div className='col-12 p-2 mt-3'>
              <button
                className='btn btn-block btn-lg'
                style={{
                  borderRadius: '0px',
                  background: '#fc8019',
                  color: 'white'
                }}
                onClick={handleCheckout}
              >
                <h6 className='mt-2' style={{ background: '#fc8019' }}>
                  CHECKOUT
                </h6>
              </button>
            </div>
          </div>
        </div>
      )}
      {(!cart || cart.length <= 0) && <EmptyCart />}
    </div>
  )
}

export default MiniCart
