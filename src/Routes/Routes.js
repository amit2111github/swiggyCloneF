import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPg from '../Components/LandingPage/LandingPg.js'
import Home from '../Components/RestautantPage/Home.js'
import MenuPages from '../Components/MenuPage/MenuPages'
import CheckoutPage from '../Components/CheckoutPage/CheckoutPage.js'
import MyAccountPage from '../Components/MyAccount/MyAccountPage.js'
import Confirmation from '../Components/CheckoutPage/Customer/Confirmation.js'
import { getUser } from '../apicaller'
import Restrictedroute from '../Restrictedroutes'
const user = getUser()

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact component={user ? Home : LandingPg} />
        <Restrictedroute path='/Restaurants' exact component={Home} />
        <Restrictedroute path='/MenuPage' exact component={MenuPages} />
        <Restrictedroute path='/CheckoutPage' exact component={CheckoutPage} />
        <Restrictedroute path='/CheckoutPage' exact component={CheckoutPage} />
        <Restrictedroute path='/my-account' exact component={MyAccountPage} />
        <Restrictedroute path='/Confirmation' exact component={Confirmation} />
      </Switch>
    </>
  )
}
