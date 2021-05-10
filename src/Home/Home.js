import React, {useState, useEffect} from 'react'
import { listDecks } from "../utils/api/index"
import SingleDeckCard from "./SingleDeckCard"
import {Link} from 'react-router-dom'

function Home(){
    const [decks, setDecks] = useState([])

    useEffect(() =>{
        const abortController = new AbortController();
        async function getDecks() {
            try{
                const decks = await listDecks(abortController.signal)
                setDecks(decks)
            }catch(err){
                console.log(err)
            }
        }
        getDecks()
        return () => {
            setDecks([])
            abortController.abort()
        }
    }, [])

    const list = decks.map((deck) => <SingleDeckCard key={deck.id} deck={deck}/>)
    
    return(
        <div>
            <button className="btn btn-secondary" type="button">
                <Link to="/decks/new"> Create Deck</Link>
            </button>
            <ul className="list-group">{list}</ul>
        </div>
    )
}



export default Home