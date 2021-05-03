import React, { useEffect, useState } from 'react'
import {Route, Switch, useRouteMatch, useParams} from "react-router-dom"
import DeckView from "./DeckView"
import {readDeck, listCards} from "../../utils/api/index"

function SingleDeck () {
    const { url } = useRouteMatch() //urls for following routes begin with /decks/:deckId/
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const {deckId} = useParams()

    /***
        Fetches the information for the Deck with ID matching the route paramater :deckId
        Sets state variable 'deck' to API info
        Cleans up and re-renders everytime url routes are visited
    ***/
    useEffect ( ()=> {
        const abortController = new AbortController();
        async function getDeck() {
            const deckFromAPI = await readDeck(deckId, abortController.signal)
            setDeck(deckFromAPI)
        }
        getDeck()
        return () => {
            setDeck({})
            abortController.abort()
        }
    }, [deckId])

    /***
        Fetches the information for the cards with deckId matching the route paramater :deckId
        Sets state variable 'cards' to API info
        Cleans up and re-renders with changes to route paramater
    ***/
    useEffect(() => {
        const abortController = new AbortController()
        async function getCards(id) {
            const cardsFromAPI = await listCards(id, abortController.signal)
            setCards(cardsFromAPI)
        }
        getCards(deckId)
        return () => {
            setCards([])
            abortController.abort()
        }
    }, [deckId])


    return (
        <Switch>
            <Route exact={true} path={url} >
                <DeckView deck={deck} cards={cards}/>
            </Route>
            {/* <Route path={`${url}study`} >

            </Route>
            <Route path={`${url}edit`} >

            </Route>
            <Route path={`${url}cards`} >

            </Route> */}
        </Switch>
    )
}

export default SingleDeck