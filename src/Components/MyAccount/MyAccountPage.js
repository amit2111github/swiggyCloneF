import React from 'react'
import MyAccNavigator from './MyAccNavigator.js'
import Container from './Container.js'
import MainFooter from '../LandingPage/MainFooter.js'
import styled from 'styled-components'
import { getUser } from '../../apicaller'

const Wrapper = styled.div`
  font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
  letter-spacing: 0;
  background: #35728a;
  min-height: calc(100vh - 368px);
  position: relative;
  z-index: 2;
  padding-bottom: 60px;
  h4 {
    text-transform: capitalize;
  }
`

const Title = styled.div`
  height: 130px;
  background: inherit;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  margin: auto;
  margin-top: 110px;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  contain: strict;
`

const Edit = styled.button`
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  border-radius: 0;
  padding: '12px !important';
  margin-bottom: '20px';
`

const MyAccountPage = ({ history }) => {
  const user = getUser()
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    history.push('/')
  }

  return (
    <>
      <MyAccNavigator />
      <Wrapper>
        <div className='container-fluid' style={{ width: '90%' }}>
          <div className='row row-cols-1'>
            <Title className='col row-cols-1'>
              <div className='row'>
                <div className='col'>
                  <div className='col text-left text-capitalize'>
                    {user.name}
                  </div>
                  <div class='w-100'>{/*rmpty */}</div>
                  <p
                    className='col text-left'
                    style={{
                      fontSize: '16px',
                      fontWeight: 300
                    }}
                  >
                    {user.phoneNumber}
                    <span
                      className='align-items-end mb-2 mr-3 ml-3'
                      style={{
                        fontSize: '20px'
                      }}
                    >
                      |
                    </span>{' '}
                    {user.email}
                  </p>
                </div>
                <div
                  className='col-md-auto align-self-center'
                  onClick={handleLogOut}
                >
                  <Edit type='button' className='btn btn-lg '>
                    LOGOUT
                  </Edit>
                </div>
              </div>
            </Title>
            <div
              className='col'
              style={{
                backgroundColor: 'white'
              }}
            >
              <Container />
            </div>
          </div>
        </div>
      </Wrapper>
      <MainFooter />
    </>
  )
}

export default MyAccountPage
