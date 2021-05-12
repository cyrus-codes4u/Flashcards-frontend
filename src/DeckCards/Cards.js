import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import CreateCard from "./CreateCard"

function Cards ({deck}) {
    const { url } = useRouteMatch() // the url route is /decks/:deckId/cards/
    
    return (
        <Switch>
            <Route path={`${url}/new`} >
                <CreateCard deck={deck}/>
            </Route>
            {/* <Route path={`${url}/:cardId/edit`} >
                <EditCard />
            </Route> */}
        </Switch>
    )
}

export default Cards