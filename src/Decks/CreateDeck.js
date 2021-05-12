import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createDeck } from '../utils/api/index'
import BreadcrumbNav from "../Common/BreadcrumbNav"

function CreateDeack (){
    const initialFormState = {name: "", description: ""}
    const [deck, setDeck] = useState({...initialFormState})
    const navigation = [{name: "Home", route: "/"}, {name: "Create Deck"}]
    const history = useHistory()

    //Event Handlers
    const handleUpdate = ({target}) => setDeck({...deck, [target.name]: target.value})
    const handleSubmit = async (event) => {
        event.preventDefault()
        const {id} = await createDeck(deck)
        setDeck({...initialFormState})
        history.push(`/decks/${id}`)
    }
    const handleCancel = () => {
        setDeck({...initialFormState})
        history.push("/")
    }

    return (
        <React.Fragment>
            <BreadcrumbNav namesRoutes={navigation} />
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name= "name"
                        onChange={handleUpdate}
                        value={deck.name}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        name = "description"
                        id = "description"
                        onChange={handleUpdate}
                        value={deck.description}
                    />
                </label>
                <button 
                    className = "btn btn-primary" 
                    type="submit"
                >
                    Submit
                </button>
                <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </React.Fragment>
    )
}

export default CreateDeack