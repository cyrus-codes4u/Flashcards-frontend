import React from 'react'
import CardList from "./CardList"
import DeckCard from "./DeckCard"
    
function DeckView({deck, deleteDeckHandle, deleteCardHandle}){

    return (
        <React.Fragment>
            <DeckCard deck={deck} deleteDeckHandle={deleteDeckHandle}/>
            <CardList deck={deck} removeCard={deleteCardHandle} />
        </React.Fragment>
    )
}

export default DeckView