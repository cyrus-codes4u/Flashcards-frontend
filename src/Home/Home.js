import React, {useState, useEffect} from 'react'
import { listDecks } from "../utils/api/index"
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
                console.log(decksFromAPI)
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        getDecks()
        return () => abortController.abort()
    }, [])

    const list = decks.map((deck) => <SingleDeckCard key={deck.id} deck={deck}/>)
    
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