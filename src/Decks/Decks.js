import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import SingleDeck from "./SingleDeck/SingleDeck"
import CreateDeck from "./CreateDeck"

function Decks () {
    const { url } = useRouteMatch()
    return (
        
        <Switch>
            {url}
            <Route path={`${url}/new`} >
                {/* <CreateDeck /> */}
            </Route>
            <Route path={`${url}/:deckId`}>
                <SingleDeck />
            </Route>
        </Switch>
    )
}

export default Decks