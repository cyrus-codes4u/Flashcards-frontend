import React, {useEffect, useState} from 'react'
import { Link, useRouteMatch } from "react-router-dom"
import { listCards} from '../utils/api/index'

function SingleDeckCard({deck, remove}){
    const {id, name, description} = deck
    const [cards, setCards] = useState([])
    const {url} = useRouteMatch()

    // Fetches cards associated with current deck
    useEffect(() => {
        const abortController = new AbortController()
        async function getCards(id) {
            const cardsFromAPI = await listCards(id, abortController.signal)
            setCards(cardsFromAPI)
        }
        getCards(id)
        return () => {
            setCards([])
            abortController.abort()
        }
    }, [id])

    return (
        <li className="card">
            <div className="d-flex">
                <h2 className="card-title">{name}</h2>
                <p>{cards.length} cards</p>
            </div>
            <p className="card-body">{description}</p>
            <div className ="d-flex">
                <button className="btn btn-secondary" >
                    <Link className="text-white" to={`${url}decks/${id}`}>
                        <span className="oi oi-eye"/>
                        View 
                    </Link>
                </button>
                <button className="btn btn-primary">
                    <Link className="text-white" to={`${url}decks/${id}/study`}>
                        <span className="oi oi-book"/>
                        Study
                    </Link>
                </button>
                <button className="btn btn-danger" onClick={remove}>
                    <span className="oi oi-trash text-white"/>
                </button>
            </div>
        </li>
    )
}

export default SingleDeckCard