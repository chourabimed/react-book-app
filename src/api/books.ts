import axios from "axios";
import { arrayToString } from "../share/globalServices";

export const getAllBooks = () => {
  return axios.get("https://henri-potier.techx.fr/books");
};

export const getCommercialOffersByIsbns = (isbns: string[]) => {
  return axios.get(
    `https://henri-potier.techx.fr/books/${arrayToString(
      isbns
    )}/commercialOffers`
  );
};
