import React from 'react'
import styled from 'styled-components'
import Hotel from './Hotel.js'
import BillItems from './BillItems.js'
import { getcartItem } from '../../../apicaller'

const Wrapper1 = styled.div`
    overflow: hidden;
    font-family: sans-serif;
    margin-top: 31px !important;
    padding-top: 15px;
    background: #fff !important;
    margin-top: 5.2%;
    font-size: 14px;
    line-height: 1.2;
    box-shadow:  7px -7px 14px #b8b8ba, 
             -7px 7px 14px #ffffff;
             -7px -7px 14px #b8b8ba, 
             7px 7px 14px #ffffff;
`

const Wrapper2 = styled.div`
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  font-family: sans-serif;
  margin-top: 0px !important;
  padding-top: 15px;
  background: #fff !important;
  margin-top: 5.2%;
  font-size: 14px;
  line-height: 1.2;
  max-height: 623px;
`

const Wrapper3 = styled.div`
    overflow: hidden;
    font-family: sans-serif;
    margin-top: 0px !important;
    padding-top: 12px;
    background: #fff !important;
    font-size: 14px;
    line-height: 1.2;
    z-index: 1;
    width: 100%;
    font-weight: 600;
    box-shadow:  7px 7px 14px #b8b8ba, 
             -7px -7px 14px #ffffff;
             -7px 7px 14px #b8b8ba, 
             7px -7px 14px #ffffff;
`

const SuggessionsWrapper = styled.div`
  cursor: pointer;
  background: #e9ecee;
  padding: 10px;
  margin: 20px;
  margin-right: 0px !important;
  margin-left: 0px !important;
  height: 45px;
  margin-bottom: 20px;
`

const Quotes = styled.img`
  width: 11px;
  height: 11px;
  margin-top: 8px;
  margin-right: 6px;
  margin-left: 8px;
`

const NoContactWrapper = styled.div`
  cursor: pointer;
  border: 1px solid #a9abb2;
  padding: 10px;
  margin: 20px;
  margin-right: 0px !important;
  margin-left: 0px !important;
  margin-bottom: 20px;

  div {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
  &:hover {
    box-shadow: 0 3px 8px #e9e9eb;
  }
`

const Title = styled.p`
  font-size: 14px;
  font-weight: 550;
  color: #3e4152;
  margin-bottom: 3px !important;
`

const Text = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #3e4152;
  margin-bottom: 0px !important;
`

const CouponWrapper = styled.div`
  cursor: pointer;
  border: 1px dashed #a9abb2;
  padding: 10px;
  margin-right: 0px !important;
  margin-left: 0px !important;
  height: 55px;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0 3px 8px #e9e9eb;
  }
`

const Info = styled.img`
  width: 17px;
  height: 17px;
  margin-top: -3px;
  margin-left: 5px;
`

const Orders = () => {
  const cartItem = getcartItem()
  const totalAmount = cartItem.reduce(
    (prev, cur) => prev + cur.qty * cur.price,
    0
  )

  return (
    <>
      <Wrapper1 className='container'>
        <div className='col text-left'>
          <Hotel />
        </div>
      </Wrapper1>
      <Wrapper2 className='container'>
        <div className='row  text-left'>
          <div className='col'>
            {cartItem.map((item, index) => {
              item.quantity = item.qty
              return <BillItems item={item} key={index} />
            })}
          </div>
          <div class='w-100'>{/*rmpty*/}</div>
          <div className='col'>
            <SuggessionsWrapper className='row text-muted text-center'>
              {' '}
              <Quotes src='/Icons/left.svg' alt='quotes' />
              <p className='mt-1'>Any Suggestions? We will pass it on...</p>
            </SuggessionsWrapper>
          </div>
          <div class='w-100'>{/*empty */}</div>
          <div className='col'>
            <NoContactWrapper className='row mt-0'>
              <div className='form-check col-md-auto'>
                <input
                  class='form-check-input position-static'
                  type='checkbox'
                  id='blankCheckbox'
                  value='NoContact'
                  aria-label='No-contact Delivery'
                  checked
                  style={{
                    marginLeft: '5px',
                    marginRight: '10px'
                  }}
                />
              </div>
              <div className='col'>
                <Title>Opt in for No-contact Delivery</Title>
                <Text className='text-muted'>
                  Our delivery partner will call (or ring your doorbell) after
                  reaching and leave the order at your door/gate
                  <br /> (Not applicable for COD).
                </Text>
              </div>
            </NoContactWrapper>
          </div>
          <div class='w-100'>{/*empty  */}</div>
          <div className='col'>
            <CouponWrapper className='row text-muted text-center'>
              {' '}
              <img
                src='percentage.svg'
                alt='percentage'
                width='20px'
                style={{
                  marginRight: '10px',
                  marginLeft: '5px'
                }}
              />{' '}
              <Title className='mt-2'>Apply Coupon</Title>
            </CouponWrapper>
          </div>
          <div class='w-100'>{/*empty */}</div>
          <div className='col mb-2'>
            <Title>Bill Details</Title>
          </div>
          <div class='w-100'>{/*empty */}</div>
          <div className='col row justify-content-between pr-0 mb-1'>
            <div className='col text-muted'>
              Item Total
              <Info src='/Icons/information.svg' alt='info' />
            </div>
            <div className='col-4 text-right pr-0 text-muted'>
              ₹{totalAmount}
            </div>
          </div>
          <div class='w-100'>{/*empty */}</div>
          <div className='col row justify-content-between pr-0 mb-3'>
            <div className='col text-muted'>
              Delivery partner fee
              <Info src='/Icons/information.svg' alt='info' />
            </div>
            <div className='col-4 text-right pr-0 text-muted'>₹ 0</div>
            <div class='w-100'>{/*empty */}</div>
          </div>
          <div class='w-100'>{/*empty */}</div>
          <div className='col'>
            <div
              className='col'
              style={{
                border: '1.5px solid black',
                backgroundColor: 'black',
                paddingBottom: '1px'
              }}
            >
              {/*empty */}
            </div>
          </div>
        </div>
      </Wrapper2>
      <Wrapper3 className='container'>
        <div className='row'>
          <div className='col row justify-content-between pr-0 mb-3 text-uppercase'>
            <div className='col text-left'>To pay</div>
            <div className='col-4 text-right pr-0'>₹{totalAmount}</div>
            <div class='w-100'>{/*empty */}</div>
          </div>
        </div>
      </Wrapper3>
    </>
  )
}

export default Orders
