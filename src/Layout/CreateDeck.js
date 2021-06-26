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
    try {
      const newDeck = await createDeck(deck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.log(error);
    }
  }

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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create Deck</h1>
      <form onSubmit={submitDeck}>
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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder="Brief description of the deck"
            rows="3"
          ></textarea>
        </div>
        <Link to="/" type="button" className="btn btn-secondary">
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
  );
}

export default CreateDeck;
