import React from "react"
import StudyCycle from "./StudyCycle"

function Study({deck, cards}) {
    console.log("Study",cards)
    return (
        <React.Fragment>
            <h4 className = "display-4">Study: {deck.name}</h4>
            <StudyCycle deck={deck} cards={cards}/>
        </React.Fragment>
    )
}

export default Study