import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function AddCards() {
  const [deck, setDeck] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
  }

  async function submitCard(e) {
    e.preventDefault();
    const card = {
      front: cardFront,
      back: cardBack,
    };

    try {
      await createCard(deckId, card);
      alert("You've succesfully added a card!");
    } catch (error) {
      console.log(error);
    }

    setCardFront("");
    setCardBack("");
    window.location.reload();
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
            Add Card
          </li>
        </ol>
      </nav>
      <h2> {deck.name}: Add Card</h2>
      <form id="addCard" onSubmit={submitCard}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Front
          </label>
          <textarea
            class="form-control"
            name="front"
            id="front"
            placeholder="Front side of card"
            rows="3"
            onChange={(e) => setCardFront(e.target.value)}
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Back
          </label>
          <textarea
            class="form-control"
            name="back"
            id="back"
            placeholder="Back side of card"
            rows="3"
            onChange={(e) => setCardBack(e.target.value)}
          ></textarea>
        </div>
        <Link to={`/decks/${deckId}`} type="button" class="btn btn-secondary">
          Done
        </Link>
        <button class="btn btn-primary" style={{ margin: "10px" }}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCards;
