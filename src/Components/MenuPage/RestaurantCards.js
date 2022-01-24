/* eslint-disable */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  isFoodInCart,
  addInCart,
  increaseQuantity,
  decreaseQuantity,
  getFoodQtyInCart
} from '../../apicaller'

const Wrapper = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  border-left: 2px solid #e9eaec;
  margin-left: -8%;
  h2 {
    font-size: 32px;
    letter-spacing: -0.3px;
    font-weight: bolder;
    color: #282c3f;
    line-height: 1.2;
    margin-bottom: 0px;
  }
  small {
    color: #686b78;
    margin-top: 0px;
    font-weight: bolder;
  }

  .veg {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: green;
  }

  .nonVeg {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: red;
  }

  h6 {
    color: #282c57;
    margint-top: 3px;
  }

  img {
    width: 150px;
    height: 130px;
    border-radius: 15px;
  }

  .row {
    border-bottom: 2px solid #e9eaec;
  }

  .addCart {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: -25px;
    background: white;
    margin-left: 30px;
  }

  .buttoncart {
    margin-left: 0;
    margin-right: 0;
    border: none;
    background: white;
    padding: 5%;
    color: green;
  }
`

const RestaurantCards = ({ food, reload, setReload }) => {
  const [showAddButton, setShowAddButton] = useState(null)
  useEffect(() => {
    setShowAddButton(!isFoodInCart(food))
    setCurrentQuanyity(getFoodQtyInCart(food))
  }, [reload])
  const [currentQuanyity, setCurrentQuanyity] = useState(0)

  const handleAdd = (food) => {
    addInCart(food)
    setCurrentQuanyity((prev) => prev + 1)
    setShowAddButton(!showAddButton)
    setReload((val) => !val)
  }

  const handleInc = () => {
    increaseQuantity(food)
    setCurrentQuanyity((prev) => prev + 1)
    setReload((val) => !val)
  }

  const handleDec = () => {
    decreaseQuantity(food)
    setCurrentQuanyity((prev) => prev - 1)
    if (currentQuanyity === 1) setShowAddButton(true)
    setReload((val) => !val)
  }

  return (
    <Wrapper>
      <div className='container-fluid'>
        <div className='row'>
          {/*left */}
          <div className='col-lg-7 mt-5'>
            {food.veg ? (
              <div
                className='p-1'
                style={{
                  border: '1px solid green',
                  width: '20px',
                  marginLeft: '11%'
                }}
              >
                <div className='veg'>{/*empt box*/}</div>
              </div>
            ) : (
              <div
                className='p-1'
                style={{
                  border: '1px solid red',
                  width: '20px',
                  marginLeft: '11%'
                }}
              >
                <div className='nonVeg'>{/*nonVeg*/}</div>
              </div>
            )}
            {/*food details */}
            <div style={{ marginLeft: '11%' }}>
              <h6 className='mt-2'>{food.name}</h6>
              <h5>
                <small>
                  <i className='fas fa-rupee-sign mr-1'></i>
                  {food.price}
                </small>
              </h5>
              <h5>
                <small className='mb-5'>{food.description}</small>
              </h5>
            </div>
          </div>
          {/*right*/}
          <div className='col-lg-5 mt-4 mb-5 position-relative'>
            <img src={food.img_url} alt='item' className='p-2' />
            <div>
              {showAddButton ? (
                <div
                  className='addCart col-5 text-center py-2 text-success'
                  onClick={() => handleAdd(food)}
                >
                  ADD
                </div>
              ) : (
                <div className='addCart'>
                  <button className='buttoncart' onClick={handleDec}>
                    -
                  </button>
                  <button className='buttoncart'>{currentQuanyity}</button>
                  <button className='buttoncart' onClick={handleInc}>
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default RestaurantCards
