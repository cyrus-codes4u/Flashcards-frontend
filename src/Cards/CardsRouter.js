import React from 'react'
import {Route, Switch, useRouteMatch} from "react-router-dom"
import BreadcrumbNav from '../Common/BreadcrumbNav'
import EditCard from "./EditCard"
import CreateCard from "./CreateCard"

function CardsRouter ({deck}) {
    const { url } = useRouteMatch() // the url route is /decks/:deckId/cards/
    const navigations = [
        [{name: "Home", route: "/"},{name: deck.name, route:`/decks/${deck.id}`},{name: "Add Card"}],
        [{name: "Home", route: "/"},{name: deck.name, route:`/decks/${deck.id}`},{name: "Edit Card"}],
    ]
    
    return (
        <Switch>
            <Route path={`${url}/new`} >
                <BreadcrumbNav namesRoutes={navigations[0]} />
                <CreateCard deck={deck} />
            </Route>
            <Route path={`${url}/:cardId/edit`} >
                <BreadcrumbNav namesRoutes={navigations[1]} />
                <EditCard deck={deck} />
            </Route>
        </Switch>
    )
}

export default CardsRouter