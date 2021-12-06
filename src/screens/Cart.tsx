import React, { useEffect, useState } from "react";
import { getCommercialOffersByIsbns } from "../api/books";
import BookItem from "../components/BookItem";
import EmptyList from "../components/EmptyList";
import OfferItem from "../components/OfferItem";
import useAbortableEffect from "../components/UseAbortableEffect";
import { Book } from "../models/book";
import { Offer } from "../models/offer";
import { TypeOffer } from "../share/enum/typeOffre";

const Cart = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [offerCart, setOfferCart] = useState<Offer>(new Offer());

  useAbortableEffect(
    (aborted: boolean) => {
      if (books.length > 0)
        getCommercialOffersByIsbns(books.map((book) => book.isbn))
          .then((response) => {
            if (!aborted) {
              setOfferCart(calculateBestOffer(response.data.offers));
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    [books]
  );

  useEffect(() => {
    const addedBooks = localStorage.getItem("addedBooks");
    if (addedBooks) {
      setBooks(JSON.parse(addedBooks));
    }
  }, []);

  const deleteFromCart = (isbn: string) => {
    let newBooks: Book[] = [];
    newBooks = books.filter((book) => book.isbn !== isbn);
    setBooks(newBooks);
    localStorage.setItem("addedBooks", JSON.stringify(newBooks));
  };

  const calculateBestOffer = (offers: Offer[]): Offer => {
    if (offers.length === 1) return offers[0];
    const totalPrice: number = books.reduce((accumVariable, curValue) => {
      return accumVariable + curValue.price;
    }, 0);
    offers.forEach((offerElement) => {
      switch (offerElement.type) {
        case TypeOffer.PERCENTAGE:
          offerElement.offerPrice =
            totalPrice - totalPrice * (offerElement.value / 100);
          break;
        case TypeOffer.MINUS:
          offerElement.offerPrice = totalPrice - offerElement.value;
          break;
        case TypeOffer.SLICE:
          const amountOfSlice = Math.trunc(
            totalPrice / offerElement.sliceValue
          );
          offerElement.offerPrice =
            totalPrice - amountOfSlice * offerElement.value;
          break;
        default:
          break;
      }
    });
    const bestOffer = Math.min(
      ...offers.map((offerElement) => offerElement.offerPrice)
    );
    return new Offer(
      offers.find((offerElement) => offerElement.offerPrice === bestOffer)
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {books && books.length > 0 ? (
            books.map((item) => {
              return (
                <BookItem
                  remove={deleteFromCart.bind(this, item.isbn)}
                  book={item}
                  key={item.isbn}
                />
              );
            })
          ) : (
            <EmptyList />
          )}
        </div>
        <OfferItem {...offerCart} />
      </div>
    </>
  );
};
export default Cart;
