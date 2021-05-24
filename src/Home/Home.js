import React, {useState, useEffect} from 'react'
import { listDecks, deleteDeck } from "../utils/api/index"
import SingleDeckCard from "./SingleDeckCard"
import {Link} from 'react-router-dom'

function Home(){
    const [decks, setDecks] = useState([])

    useEffect(() =>{
        setDecks([])
        const abortController = new AbortController();
        async function getDecks() {
            try{
                const decksFromAPI = await listDecks(abortController.signal)
                setDecks(decksFromAPI)
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        getDecks()
        return () => abortController.abort()
    }, [])

    // handles button for deleting a deck
    const deleteDeckHandler = async (id) => {
        const reply = window.confirm("Are you sure you want to delete this deck?")
        if (reply){
            deleteDeck(id)
            setDecks((decks) => decks.filter((deck) => deck.id !== id))
        }
    }

    const list = decks.map((deck) => {
        return <SingleDeckCard key={`id_${deck.id}`} deck={deck} remove={() => deleteDeckHandler(deck.id)} />
    })
    
    return(
        <div>
            <button className="btn btn-secondary" type="button">
                <Link to="/decks/new" className="text-white"> Create Deck</Link>
            </button>
            <ul className="list-group">{list}</ul>
        </div>
    )
}

export default Home