import React, {useEffect, useState} from 'react'
import FlipCards from "./FlipCards"
import {Link} from 'react-router-dom'
import {listCards} from '../../utils/api/index'

function StudyCycle({deck}) {
    const [cards, setCards] = useState([])
    
    /***
        Fetches the information for the cards with deckId matching the route paramater :deckId
        Sets state variable 'cards' to API info
        Cleans up and re-renders with changes to route paramater
    ***/
    useEffect(() => {
        setCards([])
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
        return () => abortController.abort()
    }, [deck])

    if (cards.length <= 2) {
        return (
            <div>
                <p>You need at least 3 cards to study. There are only {cards.length} cards in this deck.</p>
                <button className ="btn btn-primary">
                    <Link className="text-white" to="/">
                        <span className="oi oi-plus"/>
                        Add Cards
                    </Link>
                </button>
            </div>
        )
    }

    return(
        <FlipCards cards={cards} />
    )

}

export default StudyCycle