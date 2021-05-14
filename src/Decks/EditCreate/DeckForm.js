import React from 'react'

function DeckForm({deckChange,submit,cancel,update}){
    
    
    return (
        <React.Fragment>
            <h2>Create Deck</h2>
            <form onSubmit={submit}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name= "name"
                        onChange={update}
                        value={deckChange.name}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        name = "description"
                        id = "description"
                        onChange={update}
                        value={deckChange.description}
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
                    onClick={cancel}
                >
                    Cancel
                </button>
            </form>
        </React.Fragment>
    )
}

export default DeckForm
