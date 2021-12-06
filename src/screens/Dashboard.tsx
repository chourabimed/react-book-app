import React, { useState } from "react";
import { getAllBooks } from "../api/books";
import BookItem from "../components/BookItem";
import useAbortableEffect from "../components/UseAbortableEffect";
import { Book } from "../models/book";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);

  useAbortableEffect((aborted: boolean) => {
    getAllBooks()
      .then((response) => {
        if (!aborted) {
          setBooks(response.data);
          setOriginalBooks(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchTitle = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value && event.currentTarget.value !== "") {
      const searchResult = originalBooks.filter((book) =>
        book.title
          .toLowerCase()
          .includes(event.currentTarget.value.toLowerCase())
      );
      setBooks(searchResult);
    } else setBooks(originalBooks);
  };

  const addToCart = (book: Book) => {
    const addedBooks = localStorage.getItem("addedBooks");
    let newBooks: Book[] = [];
    if (addedBooks) {
      newBooks = JSON.parse(addedBooks);
      if (!newBooks.some((element) => element.isbn === book.isbn))
        newBooks = [...newBooks, ...[book]];
      else {
        alert("Le livre est dèja dans votre panier");
      }
    } else newBooks = [book];

    localStorage.setItem("addedBooks", JSON.stringify(newBooks));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center search_bar">
            <input
              type="text"
              placeholder="Entrer le titre du livre"
              onChange={searchTitle}
            />
          </div>
        </div>
      </div>
      <div className="container-lg mt-5">
        <div className="row justify-content-center">
          {books.map((item) => {
            return (
              <BookItem
                add={addToCart.bind(this, item)}
                book={item}
                key={item.isbn}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
