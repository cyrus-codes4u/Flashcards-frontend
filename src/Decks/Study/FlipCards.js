import React, { useState } from 'react'
import { useHistory } from 'react-router'

function FlipCards({cards = []}){
    const history = useHistory()
    const initialCard = {
            side: true,
            index: 0,
        }
    const [currentCard, setCurrentCard] = useState(initialCard)
    
    const flip = () => {
        setCurrentCard({...currentCard, side: !currentCard.side })
    }

    const next = () => {
        (currentCard.index >= cards.length - 1) ?  restart() : setCurrentCard({index: currentCard.index + 1, side: true})
    }

    const restart = () => {
        const reply = window.confirm("Restart cards? \b Click 'cancel' to return to the home page.")
        !reply ? history.push("/") : setCurrentCard(initialCard)
    }

    return (
        <li className="card">
            <div className="d-flex">
                <h2 className="card-title">Card {currentCard.index + 1} of {cards.length}</h2>
            </div>
            <p className="card-body">{currentCard.side ? cards[currentCard.index].front : cards[currentCard.index].back }</p>
            <div className ="d-flex">
                <button className="btn btn-secondary" onClick={flip} >
                    Flip
                </button>
                { !currentCard.side ? (
                    <button className="btn btn-primary" onClick={next} >
                        Next
                    </button>
                    ) : null
                }
            </div>
        </li>
    )
}

export default FlipCards