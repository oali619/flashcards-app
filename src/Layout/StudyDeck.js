import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function StudyDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  });

  async function getDeck(deckId, abortController) {
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <HomeFillIcon size={16} />
              Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {deck.cards.map((card) => (
        <div class="card" style={{ width: "auto" }}>
          <div class="card-body">
            <h5 class="card-title">
              Card {card.id} of {`length of deck`}
            </h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to="/" type="button" class="btn btn-secondary">
              Flip
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudyDeck;
