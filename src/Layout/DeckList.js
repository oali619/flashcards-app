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
      <div class="card" style={{ width: "auto" }}>
        <div class="card-body">
          <h5 class="card-title">{deck.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {deck.cards.length} cards
          </h6>
          <p class="card-text">{deck.description}</p>
          <Link
            to={`/decks/${deck.id}`}
            type="button"
            class="btn btn-secondary"
          >
            <EyeIcon size={16} /> View
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            type="button"
            class="btn btn-primary"
            style={{ marginLeft: "1%" }}
          >
            <HourglassIcon size={16} />
            Study
          </Link>
          <button
            type="button"
            class="btn btn-danger"
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
