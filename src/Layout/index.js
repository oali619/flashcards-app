import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";
import AddCards from "./AddCards";
import EditCard from "./EditCard";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";

function Layout() {
  return (
    <ErrorBoundary>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCards />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default Layout;
