import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function EditCard() {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const { deckId, cardId } = useParams();

  useEffect(() => {
    return getDeck(deckId);
  }, [deckId]);

  async function getDeck(deckId) {
    const abortController = new AbortController();
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();
    getCard(cardId, abortController);
    return () => abortController.abort();
  }, [cardId]);

  async function getCard(cardId, abortController) {
    let response = await readCard(cardId, abortController.signal);
    setCard(response);
  }

  console.log(card);

  async function submitCard(e) {
    e.preventDefault();
    const card = {
      front: e.target.front.value,
      back: e.target.back.value,
    };
    await updateCard(card);
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
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1> Edit Card</h1>
      <form onSubmit={submitCard}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Front
          </label>
          <textarea class="form-control" name="front" id="front" rows="3">
            {card.front}
          </textarea>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Back
          </label>
          <textarea class="form-control" name="back" id="back" rows="3">
            {card.back}
          </textarea>
        </div>
        <Link to="/" type="button" class="btn btn-secondary">
          Cancel
        </Link>
        <button class="btn btn-primary" style={{ margin: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
