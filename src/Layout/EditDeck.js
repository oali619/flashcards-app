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
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
  }

  async function updatedDeck(e) {
    e.preventDefault();
    const deck = {
      id: deckId,
      name: e.target.name.value,
      description: e.target.description.value,
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
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">
                  <HomeFillIcon size={16} />
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item ">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>

          <h1>Edit Deck</h1>
          <form onSubmit={updatedDeck}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              {/* <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            placeholder="Deck Name"
            required
          >{deck.name}</input> */}
              <textarea class="form-control" name="front" id="front" rows="3">
                {deck.name}
              </textarea>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                Description
              </label>
              <textarea class="form-control" name="back" id="back" rows="3">
                {deck.description}
              </textarea>
            </div>
            <Link to="/" type="button" class="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              class="btn btn-primary"
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
