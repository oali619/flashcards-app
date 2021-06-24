import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import {
  HomeFillIcon,
  PencilIcon,
  HourglassIcon,
  TrashIcon,
} from "@primer/octicons-react";

function Deck() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();

  useEffect(() => {
    return getDeck(deckId);
  }, [deckId]);

  async function getDeck(deckId) {
    const abortController = new AbortController();
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
    return () => abortController.abort();
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(id);
    }
  }

  async function deleteCardHandler(id) {
    if (window.confirm("Are you sure you want to delete this card?")) {
      await deleteCard(id);
    }
  }

  console.log(deck);
  return (
    <div>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">
                  <HomeFillIcon size={16} />
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>

          <div class="card" style={{ width: "auto" }}>
            <div class="card-body">
              <h5 class="card-title">{deck.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p class="card-text">{deck.description}</p>
              <Link
                to={`/decks/${deck.id}/edit`}
                type="button"
                class="btn btn-secondary"
              >
                <PencilIcon size={16} /> Edit
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
              <Link
                to={`/decks/${deck.id}/cards/new`}
                type="button"
                class="btn btn-primary"
                style={{ marginLeft: "1%" }}
              >
                + Add Cards
              </Link>
              <button
                type="button"
                class="btn btn-danger"
                style={{ marginLeft: "705px" }}
                onClick={() => deleteHandler(deckId)}
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>

          <h1>Cards</h1>
          <div>
            {deck.cards.map((card) => (
              <div class="row">
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <p class="card-text">{card.front}</p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <p class="card-text">{card.back}</p>
                      <Link
                        to={`/decks/${deck.id}/cards/${card.id}/edit`}
                        type="button"
                        class="btn btn-secondary"
                      >
                        <PencilIcon size={16} /> Edit
                      </Link>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => deleteCardHandler(deckId)}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
