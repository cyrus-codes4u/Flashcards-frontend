import React from 'react'
import FlipCards from "./FlipCards"
import {Link} from 'react-router-dom'

function StudyCycle({cards = [] }) {
    
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