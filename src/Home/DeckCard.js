import React, {useEffect, useState} from 'react'
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import {deleteDeck, listCards} from '../utils/api/index'

function DeckCard({deck}){
    const {id, name, description} = deck
    const {url} = useRouteMatch()
    const history = useHistory()
    const [cards, setCards] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        listCards(id, abortController.signal)
            .then(setCards)
        return () => abortController.abort()
    }, [id])

    const deleteHandler = async () => {
        const reply = window.confirm("Are you sure you want to delete this deck?")
        if (reply){
            await deleteDeck(id)
            history.push("/")
        }
    }

    return (
        <li className="card">
            <div className="d-flex">
                <h2 className="card-title">{name}</h2>
                <p>{cards.length} cards</p>
            </div>
            <p className="card-body">{description}</p>
            <div className ="d-flex">
                <button className="btn" >
                    <Link to={`${url}decks/${id}`}>View</Link>
                </button>
                <button className="btn">
                    <Link to={`${url}decks/${id}/study`}>Study</Link>
                </button>
                <button className="btn btn-danger" onClick={deleteHandler}>
                    Trash Can
                </button>
            </div>
        </li>
    )
}

export default DeckCard