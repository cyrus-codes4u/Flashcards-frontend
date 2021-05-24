import React, {useEffect, useState} from "react" 
import CardView from "./CardView"
import {listCards, deleteCard} from "../../utils/api/index"

function CardList({deck}) {                
    const [cards, setCards] = useState([])

    /***
        Fetches the info for cards with deckId value of :deckId
        Sets state 'cards' to API info
        Cleans up and re-renders with changes to route paramater
    ***/
    useEffect(() => {
        setCards([])
        const abortController = new AbortController()
        async function getCards() {
            try{
                const cardsFromAPI = await listCards(deck.id, abortController.signal)
                setCards(cardsFromAPI)
            }catch(err){
                if(err.name !== "AbortError"){
                    throw err;
                }
            }
        }
        getCards()
        return () => abortController.abort()
    }, [deck])
    
    // handles a card deletion
    const deleteCardHandle = async (cardId) => {
        const reply = window.confirm("Are you sure you want to delete this card?")
        if (reply){
            await deleteCard(cardId)
            setCards( (cards) => cards.filter((card) => card.id !== cardId) )
            console.log(deck.cards)
        }
    }
    
    console.log(typeof(cards), cards)
    return (
        <div>
            <h2>Cards</h2>
            <ul className="card list-group list-group-flush">
                {Array.isArray(cards) ? cards.map((card) =>  <CardView card={card} key={`id_${card.id}`} deleteCard = {() => deleteCardHandle(card.id)} />) : null}  
            </ul>
        </div>
    )
}

export default CardList