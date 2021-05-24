import React, {useEffect, useState} from 'react'
import {Route, Switch, useRouteMatch, useParams, useHistory} from "react-router-dom"
import DeckView from "./DeckView/DeckView"
import {readDeck, updateDeck, deleteDeck, listCards} from '../utils/api/index'
import EditDeck from "./EditCreate/EditDeck"
import CardsRouter from "../Cards/CardsRouter"
import Study from "./Study/Study"
import BreadcrumbNav from "../Common/BreadcrumbNav"


function DeckRouter () {
    const { url } = useRouteMatch() //urls for following routes begin with /decks/:deckId/
    // const initialDeck = ({name: "", description: "", cards: []})
    const [deck, setDeck] = useState({name: "", description: "", cards: []})
    const navigations = [
        [{name: "Home", route: "/"}, {name: deck.name}],
        [{name: "Home", route: "/"}, {name: deck.name, route: url }, {name: "Study"}],
        [{name: "Home", route: "/"},{name: deck.name, route: `/decks/${deck.id}`}, {name: "Edit Deck"}]
    ]
    const { deckId } = useParams()
    const history = useHistory()

    useEffect(() => {
        setDeck({name: "", description: "", cards: []})
        const abortController = new AbortController();
        async function loadDeck(){
            try{
                const {id, name, description} = await readDeck(deckId, abortController.signal)
                const cardsFromAPI = await listCards(deckId, abortController.signal)
                setDeck({id: id, name:name, description:description, cards: cardsFromAPI})
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        loadDeck()
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
    const editDeckHandle = async (updatedDeck) => {
        const {newName, newDescription} = await updateDeck(updatedDeck)
        setDeck({...deck, name:newName, description: newDescription})
        console.log(deck)
        history.push(url)
    }

    // handles card creation
    // const updateCardsInDeckHandle= (newCards) =>{
    //     setDeck({...deck, cards: newCards})
    // }

    return (
        <Switch>
            <Route exact={true} path={url} >
                <BreadcrumbNav namesRoutes={navigations[0]} />
                <DeckView deck={deck} deleteDeckHandle={deleteDeckHandle} />
            </Route>
            <Route path={`${url}/study`} >
                <BreadcrumbNav namesRoutes={navigations[1]} />
                <Study deck={deck} cards={deck.cards} />
            </Route>
            <Route path={`${url}/edit`} >
                <BreadcrumbNav namesRoutes={navigations[2]} />
                <EditDeck deck={deck} update={editDeckHandle}/>
            </Route>  
            <Route path={`${url}/cards`} >
                <CardsRouter deck={deck} />
            </Route>
        </Switch>
    )
}

export default DeckRouter