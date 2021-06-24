import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";

function CreateDeck() {
  const history = useHistory();
  async function submitDeck(e) {
    e.preventDefault();
    const deck = {
      name: e.target.name.value,
      description: e.target.description.value,
    };
    const newDeck = await createDeck(deck);
    history.push(`/decks/${newDeck.id}`);
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
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create Deck</h1>
      <form onSubmit={submitDeck}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            placeholder="Deck Name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            name="description"
            id="description"
            placeholder="Brief description of the deck"
            rows="3"
          ></textarea>
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

export default CreateDeck;
