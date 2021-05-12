import React, {useEffect, useState} from 'react'
import {Route, Switch, useRouteMatch, useParams, useHistory} from "react-router-dom"
import DeckView from "./DeckView/DeckView"
import DeckCard from "./DeckView/DeckCard"
import Cards from "../DeckCards/Cards"
import CardList from "./DeckView/CardList"
import Study from "./Study/Study"
import BreadcrumbNav from "../Common/BreadcrumbNav"
import {readDeck, deleteDeck} from '../utils/api/index'

function DeckRouter ({}) {
    const { url } = useRouteMatch() //urls for following routes begin with /decks/:deckId/
    const [deck, setDeck] = useState([])
    const navigation1 = [{name: "Home", route: "/"}, {name: deck.name}]
    const {deckId} = useParams()
    const history = useHistory()
    
    /***
        Fetches the information for the Deck with ID matching the route paramater :deckId
        Sets state variable 'deck' to API info
        Cleans up and re-renders everytime url routes are visited
    ***/
    useEffect ( ()=> {
        setDeck({})
        const abortController = new AbortController();
        async function getDeck(id) {
            try{
                const deckFromAPI = await readDeck(id, abortController.signal)
                setDeck(deckFromAPI)
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        if(deckId) { getDeck(deckId) }
        return () => abortController.abort()
    }, [deckId])

    // handles delete deck 
    const deleteDeckHandle = async (id) =>{
        const reply = window.confirm("Are you sure you want to delete this deck?")
        if (reply){
            await deleteDeck(id)
            history.push("/")
        }
    }
    // handles update deck 
    const editDeckHandle = (id) => {

    }

    return (
        <Switch>
            <Route exact={true} path={url} >
                <BreadcrumbNav namesRoutes={navigation1} />
                <DeckView deck={deck} url={url} deleteDeckHandle={() => deleteDeckHandle(deck.id)} deckId={deck.id} />
                {/* <DeckCard deck={deck} url={url} deleteDeckHandle={() => deleteDeckHandle(deck.id) }/>
                <CardList deckId={deckId}/>         */}
            </Route>
            <Route path={`${url}/study`} >
                <Study url={url} deck={deck}/>
            </Route>
            {/*<Route path={`${url}/edit`} >
                <EditDeck deck={deck} edit={() => editDeckHandle(deck.id)}/>
            </Route>*/}
            <Route path={`${url}/cards`} >
                <Cards deck={deck} />
            </Route> 
        </Switch>
    )
}

export default DeckRouter