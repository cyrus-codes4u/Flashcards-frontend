import React, { useState} from 'react'
import {useHistory} from "react-router-dom"
import CardForm from './CardForm'
import {createCard} from "../utils/api/index"

function CreateCard({deck}){
    const initialFormState = {front: "", back: ""}
    const [card, setCard] = useState({...initialFormState})
    const history = useHistory()
    
    //Event Handlers
    const updateFormHandle = ({target}) => setCard({...card, [target.name]: target.value})
    const handleDone = () => history.push(`/decks/${deck.id}`)

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deck.id, card).then(() => setCard({...initialFormState}))
    }

    return (
        <React.Fragment>
            <h4 className="display-4"> {deck.name}: Add Card</h4>
            <CardForm card={card} submit={handleSubmit} done={handleDone} update={updateFormHandle} />
        </React.Fragment>
    )
}

export default CreateCard