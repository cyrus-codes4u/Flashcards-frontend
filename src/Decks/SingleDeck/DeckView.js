import React from 'react' 
import {useRouteMatch, useHistory, Link} from "react-router-dom" 
import {deleteDeck} from '../../utils/api/index'
import CardList from "./CardList"
import BreadcrumbNav from "../../Common/BreadcrumbNav"
// TODO: STYLING IMPLEMENT CARD DELETE SO IT WORKS


function DeckView({deck, cards}){
    const {id, name, description} = deck
    const {url} = useRouteMatch() //exact route is /deck/:deckId
    const history = useHistory()

    const navigation = [{name: "Home", route: "/"}, {name: name}]

    // handles click of delete deck button
    const deleteDeckHandler = async () => {
        const reply = window.confirm("Are you sure you want to delete this deck?")
        if (reply){
            await deleteDeck(id)
            //after deletion, forces to render Home page with useEffect drawing updated deck list
            history.push("/")
        }
    }

    return(
        <React.Fragment>
            <BreadcrumbNav namesRoutes={navigation} />
            {/* Deck card -- with edit, study, add, delete, buttons */}
            <div className="card">
                <div className="d-flex">
                    <h2 className="card-title">{name}</h2>
                </div>
                <p className="card-body">{description}</p>
                <div className ="d-flex">
                    <button className="btn" >
                        <Link to={`${url}/edit`}>Edit</Link>
                    </button>
                    <button className="btn">
                        <Link to={`${url}/study`}>Study</Link>
                    </button>
                    <button className="btn">
                        <Link to={`${url}/cards/new`}>Add</Link>
                    </button>
                    <button className="btn btn-danger" onClick={deleteDeckHandler}>
                        Trash Can
                    </button>
                </div>
            </div>
            {/* The list of cards in this deck */}
            <CardList cards={cards} url={url} />
        </React.Fragment>
    )
}

export default DeckView