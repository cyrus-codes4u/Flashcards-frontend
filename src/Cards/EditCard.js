import React, { useState, useEffect } from 'react'
import {useParams, useHistory} from "react-router-dom"
import CardForm from './CardForm'
import { readCard, updateCard} from "../utils/api/index"

function EditCard({deck}){
    const [card, setCard] = useState({})
    const { cardId } = useParams()
    const history = useHistory()
    
    useEffect (()=>{
        setCard({})
        const abortController = new AbortController()
        async function loadCard(){
            try{
                const cardFromAPI = await readCard(cardId, abortController.signal)
                setCard(cardFromAPI)
            }catch(err){
                if(err.name !== "AbortError") {
                    throw err
                }
            }
        }
        if(cardId) { loadCard() }
        return () => abortController.abort()
    }, [cardId])

    //Event Handlers
    const updateFormHandle = ({target}) => setCard({...card, [target.name]: target.value})
    const handleDone = () => history.push(`/decks/${deck.id}`) 
    const cardUpdateHandle = async (event) =>{
        event.preventDefault()
        console.log(card)
        await updateCard(card)
        handleDone()
    }
    return (
        <React.Fragment>
            <h4 className="display-4"> Edit Card</h4>
            <CardForm card={card} submit={cardUpdateHandle} done={handleDone} update={updateFormHandle} />
        </React.Fragment>
    )
}

export default EditCard