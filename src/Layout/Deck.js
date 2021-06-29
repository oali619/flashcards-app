import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import {
  HomeFillIcon,
  PencilIcon,
  PlusIcon,
  HourglassIcon,
  TrashIcon,
} from "@primer/octicons-react";

function Deck() {
  const history = useHistory();
  const [deck, setDeck] = useState();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    try {
      let response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(id);
        history.push(`/decks/`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteCardHandler(id) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      try {
        await deleteCard(id);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
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
              <li className="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>

          <div className="card" style={{ width: "auto" }}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>

              <div>
                <Link
                  to={`/decks/${deck.id}/edit`}
                  type="button"
                  className="btn btn-secondary"
                >
                  <PencilIcon size={16} /> Edit
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: "1%" }}
                >
                  <HourglassIcon size={16} />
                  Study
                </Link>
                <Link
                  to={`/decks/${deck.id}/cards/new`}
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: "1%" }}
                >
                  <PlusIcon size={16} />
                  Add Cards
                </Link>

                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ float: "right" }}
                  onClick={() => deleteHandler(deckId)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {deck.cards.length > 0 && (
            <div>
              <h1 style={{ paddingTop: "20px", fontSize: "54px" }}>Cards</h1>

              {deck.cards.map((card) => (
                <div key={card.id}>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body" style={{ height: "125px" }}>
                          <p class="card-text">{card.front}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body" style={{ height: "125px" }}>
                          <p class="card-text">{card.back}</p>
                          <Link
                            to={`/decks/${deck.id}/cards/${card.id}/edit`}
                            type="button"
                            className="btn btn-secondary"
                            style={{ float: "right" }}
                          >
                            <PencilIcon size={16} /> Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ float: "right", marginRight: "1%" }}
                            onClick={async () =>
                              await deleteCardHandler(card.id)
                            }
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Deck;
