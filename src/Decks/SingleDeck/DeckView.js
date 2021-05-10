import React from 'react' 
import {useRouteMatch, useHistory, Link} from "react-router-dom" 
import {deleteDeck} from '../../utils/api/index'
import CardList from "./CardList"
import BreadcrumbNav from "../../Common/BreadcrumbNav"
// TODO: STYLING IMPLEMENT CARD DELETE SO IT WORKS

function DeckView({deck, cards}){
    const {url} = useRouteMatch() //exact route is /deck/:deckId
    const history = useHistory()

    const navigation = [{name: "Home", route: "/"}, {name: deck.name}]

    // handles click of delete deck button
    const deleteDeckHandler = async () => {
        const reply = window.confirm("Are you sure you want to delete this deck?")
        if (reply){
            await deleteDeck(deck.id)
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
                    <button className="btn btn-danger" onClick={deleteDeckHandler}>
                        <span className="text-white oi oi-trash"/>
                    </button>
                </div>
            </div>
            {/* The list of cards in this deck */}
            <CardList cards={cards} url={url} />
        </React.Fragment>
    )
}

export default DeckView