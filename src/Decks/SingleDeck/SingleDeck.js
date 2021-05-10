import React, { useEffect, useState } from 'react'
import {Route, Switch, useRouteMatch, useParams} from "react-router-dom"
import DeckView from "./DeckView"
import Study from "../Study/Study"
import {readDeck, listCards} from "../../utils/api/index"

// TODO: IMPLEMENT OTHER ROUTES

function SingleDeck ({deck, setDeck}) {
    const { url } = useRouteMatch() //urls for following routes begin with /decks/:deckId/
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
            try{
                const cardsFromAPI = await listCards(id, abortController.signal)
                setCards(cardsFromAPI)
            }catch(err){
                console.log(err)
            }
        }
        getCards(deck.id)
        return () => {
            setCards([])
            abortController.abort()
        }
    }, [deck])
    

    return (
        <Switch>
            <Route exact={true} path={url} >
                <DeckView deck={deck} cards={cards}/>
                {/* <DeckView deck={deck}/> */}
            </Route>
            <Route path={`${url}/study`} >
                <Study url={url} deck={deck} cards={cards}/>
            </Route>
            {/*<Route path={`${url}edit`} >

            </Route>
            <Route path={`${url}cards`} >

            </Route> */}
        </Switch>
    )
}

export default SingleDeck