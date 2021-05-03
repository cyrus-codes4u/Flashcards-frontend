import React, {useState, useEffect} from 'react'
import { listDecks } from "../utils/api/index"
import SingleDeckCard from "./SingleDeckCard"

function Home(){
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

    const list = decks.map((deck) => <SingleDeckCard key={deck.id} deck={deck}/>)
    
    return(
        <ul className="list-group">{list}</ul>
    )
}



export default Home