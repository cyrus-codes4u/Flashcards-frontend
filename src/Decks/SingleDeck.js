import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"

function SingleDeck () {
    const { url } = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={url} >

            </Route>
            <Route path={`${url}/study`} >

            </Route>
            <Route path={`${url}/edit`} >

            </Route>
            <Route path={`${url}/cards`} >

            </Route>
        </Switch>
    )
}

export default SingleDeck