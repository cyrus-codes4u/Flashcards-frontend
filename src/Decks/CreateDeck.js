import React from 'react'
import { useHistory } from 'react-router-dom'
import { createDeck } from '../utils/api/index'
import BreadcrumbNav from "../Common/BreadcrumbNav"

function CreateDeack ({deck, setDeck}){
    const history = useHistory()
    
    const handleNameUpdate = (event) => setDeck(...deck, event.target.value)
    const handleDescriptionUpdate = (event) => setDeck(...deck, event.target.value)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const {id} = createDeck(deck)
        setDeck({})
        history.push(`/decks/${id}`)
    }
    const handleCancel = () => {
        setDeck({})
        history.push("/")
    }

    const navigation = [{name: "Home", route: "/"}, {name: "Create Deck"}]

    return (
        <React.Fragment>
            <BreadcrumbNav namesRoutes={navigation} />
            {/* Create Deck form */}
            <div>
                <h2>Create Deck</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="deck-name">
                        Name
                        <input
                            type="text"
                            id="deck-name"
                            name= "deck-name"
                            onChange={handleNameUpdate}
                            value={deck.name}
                        />
                    </label>
                    <label htmlFor="deck-description">
                        Description
                        <textarea
                            name = "deck-description"
                            id = "deck-description"
                            onChange={handleDescriptionUpdate}
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
            </div>
        </React.Fragment>
    )
}

export default CreateDeack