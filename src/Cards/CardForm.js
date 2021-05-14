import React from 'react'


function CardForm({card, submit, done, update}) {
    
    
    return (
        <form onSubmit={submit}>
            <label htmlFor="front">
                Front
                <textarea
                    name="front"
                    id="front"
                    type="text"
                    onChange={update}
                    value={card.front}
                />
            </label>
            <label htmlFor="back">
                Back
                <textarea
                    name="back"
                    id="back"
                    type="text"
                    onChange={update}
                    value={card.back}
                />
            </label>
            <button 
                className="btn btn-secondary"
                type="button"
                onClick={done}
            >
                Done
            </button>
            <button
                className="btn btn-primary"
                type="submit"   
            >
                Save
            </button>
        </form>
    )
}

export default CardForm