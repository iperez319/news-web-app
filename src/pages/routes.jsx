import React  from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import HomePage from './index';

const Routes = props => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage}/>
        </Switch>
    )
}
export default Routes
