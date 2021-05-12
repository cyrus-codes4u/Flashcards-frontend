import React from 'react'
import CardList from "./CardList"
import DeckCard from "./DeckCard"
import BreadcrumbNav from "../../Common/BreadcrumbNav"
    
function DeckView({deck, deleteDeckHandle}){


    return (
        <React.Fragment>
            <DeckCard deck={deck} deleteDeckHandle={() => deleteDeckHandle(deck.id) }/>
            <CardList deckId={deck.id}/>
        </React.Fragment>
    )
}

export default DeckView