import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { EyeIcon, HourglassIcon, TrashIcon } from "@primer/octicons-react";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getDecks(abortController);
    return () => abortController.abort();
  }, []);

  async function getDecks(abortController) {
    try {
      let response = await listDecks(abortController.signal);
      setDecks(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(id);
        getDecks();
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    }
  }

  return decks.map((deck) => (
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
  ));
}

export default DeckList;
