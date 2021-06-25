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
    console.log("fetching deck");
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    let response = await readDeck(deckId, abortController.signal);
    setDeck(response);
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(id);
        window.location.reload();
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
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <Link
                    to={`/decks/${deck.id}/edit`}
                    type="button"
                    className="btn btn-secondary"
                  >
                    <PencilIcon size={32} /> Edit
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/study`}
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "1%" }}
                  >
                    <HourglassIcon size={32} />
                    Study
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/cards/new`}
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "1%" }}
                  >
                    + Add Cards
                  </Link>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  // style={{ marginLeft: "705px" }}
                  onClick={() => deleteHandler(deckId)}
                >
                  <TrashIcon size={32} />
                </button>
              </div>
            </div>
          </div>

          <h1 style={{ paddingTop: "20px", fontSize: "54px" }}>Cards</h1>
          <div>
            {deck.cards.map((card) => (
              <div
                key={card.id}
                className="d-flex justify-content-between border"
              >
                <div>
                  <p className="fs-2">{card.front}</p>
                </div>
                <div>
                  <p style={{ fontSize: "24px" }}>{card.back}</p>
                  <Link
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                    type="button"
                    className="btn btn-secondary"
                  >
                    <PencilIcon size={32} /> Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={async () => await deleteCardHandler(card.id)}
                  >
                    <TrashIcon size={32} />
                  </button>
                </div>
              </div>

              // <div className="row">
              //   <div className="col-sm-6">
              //     <div className="card">
              //       <div className="card-body">
              //         <p className="card-text">{card.front}</p>
              //       </div>
              //     </div>
              //   </div>
              //   <div className="col-sm-6">
              //     <div className="card">
              //       <div className="card-body">
              //         <p className="card-text">{card.back}</p>
              //         <Link
              //           to={`/decks/${deck.id}/cards/${card.id}/edit`}
              //           type="button"
              //           className="btn btn-secondary"
              //         >
              //           <PencilIcon size={16} /> Edit
              //         </Link>
              //         <button
              //           type="button"
              //           className="btn btn-danger"
              //           onClick={async () => await deleteCardHandler(card.id)}
              //         >
              //           <TrashIcon size={16} />
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Deck;
