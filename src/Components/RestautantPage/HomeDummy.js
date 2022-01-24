import React, { useEffect, useState } from 'react'
import Promotions from './Promotions.js'
import styled from 'styled-components'
import HotelCard from './HotelCard.js'
import MoreCard from './MoreCard.js'
import { getFood, getUser } from '../../apicaller'

const Wrapper = styled.div`
  color: #535665;
  font-family: sans-serif;

  p {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 1px;
  }

  small {
    color: 'light grey';
    font-size: 10px;
    opacity: 0.8;
    text-transform: uppercase;
    margin-top: 1px;
    font-weight: 300;
  }

  .item {
    padding-left: 25px;
    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
      color: #e46d47;
    }
  }

  .topHeader {
    margin-top: 1px;
    position: sticky;
    top: 90px;
  }

  .active {
    background: #e46d47;
    margin-right: 15px;
    color: #fff;
    &:hover {
      color: #fff !important;
    }
  }

  .content {
    p {
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.2;
    }
    small {
      margin: 0;
    }
  }

  .img-wrap {
    img {
      width: 40px;
      border: 1px solid #e26d4d;
      border-radius: 50%;
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
`

const Section = styled.div`
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #bebfc5;
`

const Title = styled.p`
  font-size: 28px !important;
  font-weight: 600;
  color: #282c3f;
  line-height: 1.2;
  margin-left: 12px;
`

const HomeDummy = () => {
  const user = getUser()
  const [topPicks, setTopPicks] = useState([])
  const [exclusive, setExclusive] = useState([])
  const [premium, setPremium] = useState([])
  const [veg, setVeg] = useState([])
  const [error, setError] = useState(false)

  const [totalTopPicks, setTotalTopPicks] = useState([])
  const [totalExclusive, setTotalExclusive] = useState([])
  const [totalPremium, setTotalPremium] = useState([])
  const [totalVeg, setTotalVeg] = useState([])

  const loadFood = async (setter) => {
    const data = await getFood(user.token)
    if (!data.error) {
      setter((val) => [...val, ...data])
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    setError(false)
    loadFood(setTopPicks)
    loadFood(setExclusive)
    loadFood(setPremium)
    loadFood(setVeg)
    loadFood(setTotalTopPicks)
    loadFood(setTotalExclusive)
    loadFood(setTotalPremium)
    loadFood(setTotalVeg)

    return () => {
      setTopPicks([])
      setExclusive([])
      setPremium([])
      setVeg([])
      setTotalTopPicks([])
      setTotalExclusive([])
      setTotalVeg([])
      setTotalPremium([])
    }
  }, [])
  return (
    <>
      {/* static data */}
      <Promotions />

      <div className='container'>
        <Wrapper>
          <div className='row'>
            {/* left card */}
            <div className='col-3'>
              <div className='border-left border-right border-bottom shadow topHeader pt-5'>
                <div className='item active' href='topPicks'>
                  <div className='row' id='list'>
                    <div className='col-3 p-1 img-wrap nohover'>
                      <img
                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/rng/md/carousel/production/vt13uzhjrg5r49kh9oru'
                        alt='Img1'
                      />
                    </div>
                    <div className='col-9 text-left content'>
                      <p>Top Picks</p>
                      <small>{totalTopPicks.length} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className='item' href='Exclusive'>
                  <div className='row'>
                    <div className='col-3 text-center img-wrap'>
                      <img
                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/hxizld3pqhnk0smw27sl'
                        alt='Img'
                      />
                    </div>
                    <div className='col-9 text-left content'>
                      <p>Exclusive</p>
                      <small>{totalExclusive.length} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className='item ' href='Premium'>
                  <div className='row'>
                    <div className='col-3 text-right img-wrap'>
                      <img
                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/marketing-dashboard/carousel/ftnsdmo6fotidtzobbm2'
                        alt='Img'
                      />
                    </div>
                    <div className='col-9 text-left content'>
                      <p>Premium</p>
                      <small>{totalPremium.length} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className='item' href='vegOnly'>
                  <div className='row'>
                    <div className='col-3 text-center img-wrap'>
                      <img
                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/qtjc8dzfexg72lug37a0'
                        alt='Img'
                      />
                    </div>
                    <div className='col-9 text-left content'>
                      <p>Veg Only</p>
                      <small>{totalVeg.length} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className='item' href='allItems'>
                  <div className='row'>
                    <div className='col-3 text-center img-wrap '>
                      <img
                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/See_all_cj8kln'
                        alt='Img'
                      />
                    </div>
                    <div className='col-9 text-left  mb-5 content'>
                      <p>SEE ALL</p>
                      <small>RESTAURANTS</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right card */}
            {error && (
              <div className='d-flex justify-content-center'>
                <h2>Oops Something Went Wrong..</h2>
              </div>
            )}
            {!error && (
              <div
                className='col-9'
                data-spy='scroll'
                data-target='#list'
                data-offset='0'
              >
                <Section className='row'>
                  <Title>Top Pics</Title>
                  <div className='row row-cols-3' id='topPicks'>
                    {topPicks &&
                      topPicks.map((item) => {
                        return item && <HotelCard data={item} key={item._id} />
                      })}
                    <MoreCard
                      filter='top_pick'
                      more={totalTopPicks.length - 8}
                    />
                  </div>
                </Section>
                <Section className='row'>
                  <Title>Exclusive</Title>
                  <div
                    className='row row-cols-3 justify-content-center'
                    id='Exclusive'
                  >
                    {exclusive &&
                      exclusive.map((item) => {
                        return item && <HotelCard data={item} key={item._id} />
                      })}
                    <MoreCard
                      filter='exclusive'
                      more={totalExclusive.length - 8}
                    />
                  </div>
                </Section>
                <Section className='row'>
                  <Title>Premium</Title>
                  <div
                    className='row row-cols-3 justify-content-center'
                    id='Premium'
                  >
                    {premium &&
                      premium.map((item) => {
                        return item && <HotelCard data={item} key={item._id} />
                      })}
                    <MoreCard
                      filter='newly_added'
                      more={totalPremium.length - 8}
                    />
                  </div>
                </Section>
                <Section className='row'>
                  <Title>Veg Only</Title>
                  <div
                    className='row row-cols-3 justify-content-center'
                    id='vegOnly'
                  >
                    {veg &&
                      veg.map((item) => {
                        return item && <HotelCard data={item} key={item._id} />
                      })}
                    <MoreCard filter='veg' more={totalVeg.length - 8} />
                  </div>
                </Section>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default HomeDummy
