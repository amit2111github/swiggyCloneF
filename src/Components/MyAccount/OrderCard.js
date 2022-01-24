import React, { useState } from 'react'
import styled from 'styled-components'
import BillItems from '../CheckoutPage/Customer/BillItems.js'

const Wrapper = styled.div`
  font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
  letter-spacing: 0;
  color: #171a29;
  font-family: sans-serif;
  border: 1px solid #d4d5d9;
`

const Image = styled.img`
  width: inherit;
`

const Tick = styled.img`
  margin-left: 15px;
  height: 20px;
  width: 20px;
  vertical-align: text-bottom;
`

const Name = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #171a29;
  margin-bottom: 0px;
  cursor: pointer;
  &:hover {
    color: #fc8019;
  }
`

const Info = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0px;
  cursor: pointer;
`

const Dets = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #fc8019;
  margin-bottom: 0px;
  cursor: pointer;
  &:hover {
    color: #171a29;
  }
`

const Reorder = styled.button`
  font-size: 16px;
  font-weight: 600;
  border-radius: 0px;
  color: #fff;
  background: #fc8019;
  &:hover {
    box-shadow: 0 2px 8px #d4d5d9;
    color: #fff;
  }
`

const Help = styled.button`
  font-size: 16px;
  font-weight: 600;
  border-radius: 0px;
  border: 1px solid #fc8019;
  color: #fc8019;
  &:hover {
    box-shadow: 0 2px 8px #d4d5d9;
    color: #fc8019;
  }
`

const OrderCard = ({ order }) => {
  console.log(order)
  const totalAmount = order.items.reduce(
    (prev, cur) => prev + cur.quantity * cur.price,
    0
  )
  const [showDeatils, setShowDetails] = useState(false)
  return (
    <Wrapper className='container text-left mb-5'>
      <div className='row p-4'>
        <div className='col-3 pl-0'>
          <Image src={order.image_url} alt='Hotel' />
        </div>
        <div className='col row-cols-1 pl-0'>
          <div className='col'>
            <div className='row justify-content-between'>
              <div className='col-md-auto'>
                <Name>{order.restaurant_name}</Name>
              </div>
              <div className='col-md-auto text-right mt-1 text-muted'>
                Delivered
                <Tick src='Icons/checkmark.svg' alt='Check' />
              </div>
            </div>
          </div>
          <div className='col text-capitalize text-muted'>
            <Info>
              ORDER_ID # {order._id} | {order.date.toLocaleString()}
            </Info>
          </div>
          <div
            className='col text-uppercase mt-3'
            onClick={() => setShowDetails((val) => !val)}
          >
            <Dets>view details</Dets>
          </div>
        </div>
      </div>
      <div className='row-cols-1'>
        <div className='col mt-3 mb-3' style={{ border: '1px dashed #d4d5d9' }}>
          {/*empty */}
        </div>
        {showDeatils && (
          <div className='col' style={{ fontWeight: 300 }}>
            {order.items.map((item, index) => (
              <BillItems item={item} key={index} />
            ))}
          </div>
        )}

        <div className='col'>
          <div className='row justify-content-end'>
            <div
              className='col-md-auto text-right text-muted'
              style={{ borderTop: '2px solid #d4d5d9' }}
            >
              Total Paid: ₹ {totalAmount}
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div className='row ml-1'>
            <Reorder
              type='button'
              className='btn col-2 p-2 mr-4 text-uppercase'
            >
              reorder
            </Reorder>
            <Help type='button' className='btn col-2 p-2 mr-4 text-uppercase'>
              help
            </Help>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default OrderCard
