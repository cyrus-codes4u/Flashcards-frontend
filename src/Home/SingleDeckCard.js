import React, {useEffect, useState} from 'react'
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import {deleteDeck, listCards} from '../utils/api/index'

// TODO: Implement styling

function SingleDeckCard({deck}){
    const {id, name, description} = deck
    const history = useHistory()
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

    // handles button for deleting a deck
    const deleteDeckHandler = async () => {
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
                    <Link to={`${url}decks/${id}`}>View </Link>
                </button>
                <button className="btn">
                    <Link to={`${url}decks/${id}/study`}>Study</Link>
                </button>
                <button className="btn btn-danger" onClick={deleteDeckHandler}>
                    Trash Can
                </button>
            </div>
        </li>
    )
}

export default SingleDeckCard