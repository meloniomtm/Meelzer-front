import React, { useReducer, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import SplashScreen from '../pages/SplashScreen'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Approve from '../pages/Approve'
import Profile from '../pages/Profile'
import Add from '../pages/Add'
import Search from '../pages/Search'
import Release from '../pages/Release'
import Artist from '../pages/Artist'
import Genre from '../pages/Genre'
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
                <Route exact path='/approve'>
                    <Approve />
                </Route>
                <Route exact path='/profile'>
                    <Profile />
                </Route>
                <Route exact path='/add'>
                    <Add />
                </Route>
                <Route exact path='/search'>
                    <Search />
                </Route>
                <Route exact path='/release'>
                    <Release />
                </Route>
                <Route exact path='/artist/:id'>
                    <Artist />
                </Route>
                <Route exact path='/genre/:id'>
                    <Genre />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router