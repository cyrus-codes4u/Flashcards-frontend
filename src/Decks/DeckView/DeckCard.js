import React from 'react' 
import {Link, useRouteMatch} from "react-router-dom" 

function DeckCard({deck, deleteDeckHandle}){
    const {url} = useRouteMatch()
    
    return(
        <div className="card">
            <div className="d-flex">
                <h2 className="card-title">{deck.name}</h2>
            </div>
            <p className="card-body">{deck.description}</p>
            <div className ="d-flex">
                <button className="btn btn-secondary" >
                    <Link className="text-white" to={`${url}/edit`}>
                        <span className="oi oi-pencil"/>
                        Edit
                    </Link>
                </button>
                <button className="btn btn-primary">
                    <Link className="text-white" to={`${url}/study`}>
                        <span className="oi oi-book"/>
                        Study
                    </Link>
                </button>
                <button className="btn btn-primary">
                    <Link className="text-white" to={`${url}/cards/new`}>
                        <span className="oi oi-plus"/>
                        Add
                    </Link>
                </button>
                <button className="btn btn-danger" onClick={() => deleteDeckHandle(deck.id)}>
                    <span className="text-white oi oi-trash"/>
                </button>
            </div>
        </div>
    )
}

export default DeckCard