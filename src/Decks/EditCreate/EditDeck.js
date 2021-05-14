import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import DeckForm from './DeckForm'

function EditDeck({deck, update}){
    const initialFormState = deck
    const [updatedDeck, setUpdatedDeck] = useState({...initialFormState})
    const history = useHistory()

    //Event Handlers
    const handleUpdate = ({target}) => setUpdatedDeck({...updatedDeck, [target.name]: target.value})
    const handleSubmit = async (event) => {
        event.preventDefault()
        await update(updatedDeck)
    }
    const handleCancel = () => {
        setUpdatedDeck({...initialFormState})
        history.push(`/decks/${deck.id}`)
    }

    return (
        <DeckForm deckChange={updatedDeck} submit={handleSubmit} cancel={handleCancel} update={handleUpdate} />
    )
}

export default EditDeck