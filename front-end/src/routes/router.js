import React, { useReducer, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import SplashScreen from '../pages/SplashScreen'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'

const Router = () => {
    const [state, dispatch] = useReducer()
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <SplashScreen />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/signup'>
                    <SignUp />
                </Route>
                <Route exact path='/home'>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router