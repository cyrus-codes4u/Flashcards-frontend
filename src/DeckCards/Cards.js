import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"

function Cards () {
    const { url } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${url}/:cardId/edit`} >

            </Route>
            <Route path={`${url}/new`} >

            </Route>
        </Switch>
    )
}

export default Cards