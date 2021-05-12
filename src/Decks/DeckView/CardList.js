import React, {useState, useEffect} from "react" 
import CardView from "./CardView"
import {listCards, deleteCard} from '../../utils/api/index'

function CardList({deckId}) {                
    const [cards, setCards] = useState([])

    /***
        Fetches the info for cards with deckId value of :deckId
        Sets state 'cards' to API info
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
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        getCards(deckId)
        return () => abortController.abort()
    }, [deckId])
    
    //handles deletion of a card
    const removeCard = async (cardId) => {
        const reply = window.confirm("Are you sure you want to delete this card?")
        if (reply){
            await deleteCard(cardId)
            setCards((cards) => cards.filter((card) => card.id !== cardId))
        }
    }

    return (
        <div>
            <h2>Cards</h2>
            <ul className="card list-group list-group-flush">
                {cards ? cards.map((card) =>  <CardView card={card} key={card.id} deleteCard={() => removeCard(card.id)} />) : null}
            </ul>
        </div>
    )
}

export default CardList