import React from 'react'
import {Link} from 'react-router-dom'
/**
 * Creates a breadcrumb navigation.
 * There is no validation done on the arrayNames array, any object will be saved.
 * @param namesRoutes
 *  array of objects with name key (text to be displayed on the navigation) and route key (routes to which navigation items direct)
 * @returns {JSX<BreadcrumbNav>}
 *  a formatted breadcrumb navigation with bootstrap 4
*/


function BreadcrumbNav({namesRoutes}){
    const listItems = namesRoutes.map((item, index) => {
        if (item.route){
            return (
            <li 
                key={index} 
                className="breadcrumb-item"
            >
                <Link to={item.route}>{item.name}</Link>
            </li>
        )}
        return (
            <li 
                key={index} 
                className="breadcrumb-item active" 
                aria-current="page"
            >
                {item.name}
            </li>
        )
    })

    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {listItems}
            </ol>
        </nav>
    )
}

export default BreadcrumbNav