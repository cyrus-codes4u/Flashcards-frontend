import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import SingleDeck from "./SingleDeck"
import CreateDeck from "./CreateDeck"

function Decks () {
    const { url } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${url}/new`} >
                <CreateDeck />
            </Route>
            <Route path={`${url}/:deckId`}>
                <SingleDeck />
            </Route>
        </Switch>
    )
}

export default Decks