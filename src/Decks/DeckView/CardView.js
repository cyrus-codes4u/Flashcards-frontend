import React from "react" 
import { Link, useRouteMatch } from "react-router-dom"

function CardView ({card, deleteCard}) {
    const {front, back, id} = card    
    const {url} = useRouteMatch()

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div>{front}</div>
                <div>{back}</div>
            </div>
            <div>
                <button className="btn btn-secondary">
                    <Link className="text-white" to={`${url}/${id}/edit`}>
                        <span className="oi oi-pencil"/>
                        Edit
                    </Link>
                </button>
                <button name="delete" className="btn btn-danger" onClick={deleteCard}>
                    <span className="oi oi-trash text-white"/>
                </button>
            </div>
        </li>
    )
}

export default CardView