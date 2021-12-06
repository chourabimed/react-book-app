export class Book {
  isbn: string;
  title: string;
  synopsis: string[];
  price: number;
  cover: string;
  constructor(book?: any) {
    this.isbn = (book && book.isbn) || "";
    this.title = (book && book.title) || "";
    this.synopsis = (book && book.synopsis) || [];
    this.price = (book && book.price) || null;
    this.cover = (book && book.cover) || "";
  }
}

export interface IBook {
  isbn: string;
  title: string;
  synopsis: string[];
  price: number;
  cover: string;
}

export interface IBookEntryProps {
  add: (event: React.MouseEvent<HTMLButtonElement>) => void | "";
  remove: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
  book: Book | IBook;
}
