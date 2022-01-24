import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: sans-serif;

  p {
    margin-left: 13%;
    font-size: 18px;
    color: #282c3f;
    margin-bottom: 5px;
    font-weight: bold;
    &:hover {
      color: #fc8019;
    }
  }
`

const Options = ({ food }) => {
  return (
    <div className='text-right mr-5 mt-2 ml-0'>
      <Wrapper>
        {food.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
      </Wrapper>
    </div>
  )
}

export default Options
