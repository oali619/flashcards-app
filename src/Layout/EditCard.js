import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function EditCard() {
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [deck, setDeck] = useState();
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    getCard(cardId, abortController);
    return () => abortController.abort();
  }, []);

  async function getDeck(deckId, abortController) {
    try {
      let response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCard(cardId, abortController) {
    try {
      setCardLoading(true);
      const { front, back } = await readCard(cardId, abortController.signal);
      setCardFront(front);
      setCardBack(back);
      setCardLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitCard(e) {
    e.preventDefault();
    const card = {
      deckId,
      id: cardId,
      front: cardFront,
      back: cardBack,
    };
    try {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  }

  if (cardLoading) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <HomeFillIcon size={16} />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck?.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1> Edit Card</h1>
      <form onSubmit={submitCard}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            name="front"
            id="front"
            rows="3"
            value={cardFront}
            onChange={(e) => setCardFront(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            name="back"
            id="back"
            rows="3"
            value={cardBack}
            onChange={(e) => setCardBack(e.target.value)}
          ></textarea>
        </div>
        <Link
          to={`/decks/${deckId}`}
          type="button"
          className="btn btn-secondary"
        >
          Cancel
        </Link>
        <button className="btn btn-primary" style={{ margin: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
