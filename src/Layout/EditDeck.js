import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function EditDeck() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatedDeck(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const deck = {
      id: deckId,
      name: formData.get("name"),
      description: formData.get("description"),
    };
    try {
      await updateDeck(deck);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <HomeFillIcon size={16} />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item ">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>

          <h1>Edit Deck</h1>
          <form onSubmit={updatedDeck}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Deck Name"
                defaultValue={deck.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="3"
                defaultValue={deck.description}
              ></textarea>
            </div>
            <Link
              to={`/decks/${deckId}`}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditDeck;
