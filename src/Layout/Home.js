import userEvent from "@testing-library/user-event";
import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  return (
    <div>
      <Link to="/decks/new" type="button" className="btn btn-secondary btn-lg">
        + Create Deck
      </Link>
      <div style={{ paddingTop: "1%" }}>
        <DeckList />
      </div>
    </div>
  );
}

export default Home;
