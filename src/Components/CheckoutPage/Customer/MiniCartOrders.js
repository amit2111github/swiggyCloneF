import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Hotel from './Hotel.js'
import BillItems from './BillItems.js'
import { getcartItem } from '../../../apicaller.js'

const Wrapper1 = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  line-height: 1.2;
`

const Wrapper2 = styled.div`
  font-family: sans-serif;
`

const Orders = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(getcartItem())
  }, [])
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
            {cart.map((item) => item.qty > 0 && <BillItems item={item} />)}
          </div>
        </div>
      </Wrapper2>
    </>
  )
}

export default Orders
