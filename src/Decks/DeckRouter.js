import React, {useEffect, useState} from 'react'
import {Route, Switch, useRouteMatch, useParams, useHistory} from "react-router-dom"
import DeckView from "./DeckView/DeckView"
import {readDeck, updateDeck, deleteDeck, listCards, deleteCard} from '../utils/api/index'
import EditDeck from "./EditCreate/EditDeck"
import CardsRouter from "../Cards/CardsRouter"
import Study from "./Study/Study"
import BreadcrumbNav from "../Common/BreadcrumbNav"


function DeckRouter ({}) {
    const { url } = useRouteMatch() //urls for following routes begin with /decks/:deckId/
    const initialDeck = ({name: "", description: "", cards: []})
    const [deck, setDeck] = useState({...initialDeck})
    const navigations = [
        [{name: "Home", route: "/"}, {name: deck.name}],
        [{name: "Home", route: "/"}, {name: deck.name, route: url }, {name: "Study"}],
        [{name: "Home", route: "/"},{name: deck.name, route: `/decks/${deck.id}`}, {name: "Edit Deck"}]
    ]
    const { deckId } = useParams()
    const deckNumberId = parseInt(deckId)
    const history = useHistory()
    
    

    useEffect(() => {
        setDeck({...initialDeck})
        const abortController = new AbortController();
        async function loadDeck(){
            try{
                const {id, name, description} = await readDeck(deckNumberId, abortController.signal)
                const cardsFromAPI = await listCards(deckNumberId, abortController.signal)
                setDeck({id: id, name:name, description:description, cards: cardsFromAPI})
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckNumberId])    

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
        console.log("New Deck Deets", newName, newDescription, updatedDeck)
        setDeck({...deck, name:newName, description: newDescription})
        history.push(url)
    }

    const deleteCardHandle = async (cardId) => {
        const reply = window.confirm("Are you sure you want to delete this card?")
        if (reply){
            await deleteCard(cardId)
            setDeck({...deck, cards: deck.cards.filter((card) => card.id !== cardId)} ) 
        }
    }
    console.log("DeckRouter", deck, deckNumberId)
    return (
        <Switch>
            <Route exact={true} path={url} >
                <BreadcrumbNav namesRoutes={navigations[0]} />
                <DeckView deck={deck} deleteDeckHandle={deleteDeckHandle} deleteCardHandle={deleteCardHandle} />
            </Route>
            <Route path={`${url}/study`} >
                <BreadcrumbNav namesRoutes={navigations[1]} />
                <Study deck={deck} />
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