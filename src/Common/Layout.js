import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home"
import {Route, Switch} from "react-router-dom"
import DecksRouter from "../Decks/DecksRouter";

function Layout() {

  return (
    <div className="app-routes">
      <Header />
      <div className="container">
        <div className="row">
          <div className="column m-auto">
              <Switch>
                <Route exact={true} path ="/">{/*the home screen*/}
                  <Home/>
                </Route> 
                <Route path ="/decks"> {/*the decks screen*/}
                  <DecksRouter/>
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
