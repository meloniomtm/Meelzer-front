import React, { useReducer, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import SplashScreen from '../pages/SplashScreen'

const Router = () => {
    const [state, dispatch] = useReducer()
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <SplashScreen />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router