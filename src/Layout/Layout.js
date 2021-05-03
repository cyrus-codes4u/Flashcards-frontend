import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home"
import Decks from "../Decks/Decks"
import {Route, Switch} from "react-router-dom"

function Layout() {

  return (
    <div className="app-routes">
      <Header />
      <div className="container">
        <div className="row">
          <div className="column m-auto">
              <Switch>
                <Route exact={true} path ="/">{/*the home screen*/}
                  <Home/> {/*TODO: Implement styling*/}
                </Route> 
                <Route path ="/decks"> {/*the decks screen*/}
                    <Decks/>
                </Route>
                <Route> 
                  <NotFound />
                </Route>
              </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;
