import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { EyeIcon, HourglassIcon, TrashIcon } from "@primer/octicons-react";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    return getDecks();
  }, []);

  function getDecks() {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(id);
      getDecks();
    }
  }

  return decks.map((deck) => {
    return (
      <div key={deck.id} className="card" style={{ width: "auto" }}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {deck.cards.length} cards
          </h6>
          <p className="card-text">{deck.description}</p>
          <Link
            to={`/decks/${deck.id}`}
            type="button"
            className="btn btn-secondary"
          >
            <EyeIcon size={16} /> View
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "1%" }}
          >
            <HourglassIcon size={16} />
            Study
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "845px" }}
            onClick={() => deleteHandler(deck.id)}
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </div>
    );
  });
}

export default DeckList;
