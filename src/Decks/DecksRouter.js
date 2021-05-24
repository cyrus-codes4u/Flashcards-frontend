import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import DeckRouter from "./DeckRouter"
import CreateDeck from "./EditCreate/CreateDeck"


function Decks () {
    const { url } = useRouteMatch() 
    return (
        <Switch>
            <Route path={`${url}/new`} >
                <CreateDeck />
            </Route>
            <Route path={`${url}/:deckId`}>
                <DeckRouter />
            </Route>
        </Switch>
    )
}

export default Decks