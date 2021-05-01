import React, {useState, useEffect} from 'react'
import {useRouteMatch} from 'react-router-dom'
import {listDecks} from "../utils/api/index"
import DeckCard from "./DeckCard"

function DeckList(){
    const {url} = useRouteMatch()
    const [decks, setDecks] = useState([])
    
    
    useEffect(() =>{
        const abortController = new AbortController();
        async function getDecks() {
            const decks = await listDecks(abortController.signal)
            setDecks(decks)
        }
        getDecks()
        return () => {
            setDecks([])
            abortController.abort()
        }
    }, [])

    const list = decks.map((deck) => <DeckCard key={deck.id} deck={deck}/>)
    
    return(
        <ul className="list-group">{list}</ul>
    )
}



export default DeckList