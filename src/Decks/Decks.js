import React, {useState} from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import SingleDeck from "./SingleDeck/SingleDeck"
import CreateDeck from "./CreateDeck"

function Decks () {
    const { url } = useRouteMatch()
    const [deck, setDeck] = useState({})

    return (
        
        <Switch>
            <Route path={`${url}/new`} >
                <CreateDeck deck={deck} setDeck={setDeck} />
            </Route>
            <Route path={`${url}/:deckId`}>
                <SingleDeck deck={deck} setDeck={setDeck}/>
            </Route>
        </Switch>
    )
}

export default Decks