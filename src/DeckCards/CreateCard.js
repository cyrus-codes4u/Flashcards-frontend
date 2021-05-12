import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BreadcrumbNav from '../Common/BreadcrumbNav'
import {createCard} from "../utils/api/index"

function CreateCard({deck}) {
    const navigation = [{name: "Home", route: "/"},{name: deck.name, route:`/decks/${deck.id}`},{name: "Add Card"}]
    const initialFormState = {front: "", back: ""}
    const [newCard, setNewCard] = useState({...initialFormState})
    const history = useHistory()

    const handleUpdate = ({target}) => setNewCard({...newCard, [target.name]: target.value})

    const handleDone = () => history.push(`/decks/${deck.id}`)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        await createCard(deck.id, newCard)
        setNewCard({...initialFormState})
    }


    return (
        <React.Fragment>
            <BreadcrumbNav namesRoutes={navigation} />
            <h4 className="display-4">{deck.name}: Add Card</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">
                    Front
                    <textarea
                        name="front"
                        id="front"
                        type="text"
                        onChange={handleUpdate}
                        value={newCard.front}
                    />
                </label>
                <label htmlFor="back">
                    Back
                    <textarea
                        name="back"
                        id="back"
                        type="text"
                        onChange={handleUpdate}
                        value={newCard.back}
                    />
                </label>
                <button 
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleDone}
                >
                    Done
                </button>
                <button
                    className="btn btn-secondary"
                    type="submit"   
                >
                    Save
                </button>
            </form>
        </React.Fragment>
    )
}

export default CreateCard