import React from "react"
import BreadcrumbNav from '../../Common/BreadcrumbNav'
import StudyCycle from "./StudyCycle"

function Study({url, deck, cards}) {
    const navigation = [{name: "Home", route: "/"}, {name: deck.name, route: url }, {name: "Study"}]

    return (
        <React.Fragment>
            <BreadcrumbNav namesRoutes={navigation} />
            <h4 className = "display-4">Study: {deck.name}</h4>
            <StudyCycle cards={cards}/>
        </React.Fragment>
    )
}

export default Study