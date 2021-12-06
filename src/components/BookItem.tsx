import React from "react";
import { IBookEntryProps } from "../models/book";
import TextTruncate from "react-text-truncate";

const BookItem: React.FC<Partial<IBookEntryProps>> = ({
  add,
  remove,
  book,
}) => {
  return (
    <>
      {book && (
        <div className="col-md-6">
          <div className="book_cart d-sm-flex">
            <div className="cover_book text-center">
              <img
                className="img-fluid"
                src={`${book.cover}`}
                alt={book.title}
              ></img>
            </div>
            <div className="detail_book">
              <TextTruncate
                line={2}
                element="h2"
                truncateText="…"
                text={book.title}
              />
              <TextTruncate
                line={3}
                element="p"
                truncateText="…"
                text={book.synopsis[0]}
              />
              <h3 className="text-center">
                <span>Prix: </span>
                {book.price}€
              </h3>
              {add && (
                <button onClick={add.bind(this)}>Ajouter au panier</button>
              )}
              {remove && (
                <button onClick={remove.bind(this)}>Supprimer du panier</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookItem;
