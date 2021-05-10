import React from "react" 
import { Link, useHistory } from "react-router-dom"
import {deleteCard} from "../../utils/api/index"

// function CardList({cards, url})
function CardList({cards, url}) {
    const history = useHistory()

    //handles deletion of a card
    async function deleteCardHandler (cardId){
        const reply = window.confirm("Are you sure you want to delete this card?")
        if (reply){
            await deleteCard(cardId)
            //after modifying state variable 'cards', forces re-route through SingleDeck.js which updates card list
            history.push({url})
        }
    }
    
    const frontAndBackCards = cards.map((card) => {
        const {front, back, id} = card
        
        return (
            <li key={id} className="list-group-item">
                <div className="d-flex justify-content-between">
                    <div>{front}</div>
                    <div>{back}</div>
                </div>
                <div>
                    <button className="btn btn-secondary">
                        <Link className="text-white" to={`${url}/${id}/edit`}>
                            <span className="oi oi-pencil"/>
                            Edit
                        </Link>
                    </button>
                    <button className="btn btn-danger" onClick={()=> deleteCardHandler(id)}>
                        <span className="oi oi-trash text-white"/>
                    </button>
                </div>
            </li>
        )
    })

    return (
        <div>
            <h2>Cards</h2>
            <ul className="card list-group list-group-flush">
                {frontAndBackCards}
            </ul>
        </div>
    )
}

export default CardList