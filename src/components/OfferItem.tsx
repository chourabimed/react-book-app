import React from "react";
import { Offer } from "../models/offer";

const OfferItem: React.FC<Partial<Offer>> = ({ type, value, sliceValue }) => {
  return (
    <>
      <p>{type}</p>
      <p>{value}</p>
      <p>{sliceValue}</p>
    </>
  );
};
export default OfferItem;
