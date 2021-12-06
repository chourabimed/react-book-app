import React from "react";
import { Offer } from "../models/offer";

const OfferItem: React.FC<Partial<Offer>> = ({ type, value, sliceValue }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>La meilleure offre applicable est:</h3>
            <p>
              <span>Type de l'offre: </span>
              {type}
            </p>
            <p>
              <span>La valeur de la remise =</span> {value}
            </p>
            <p>{sliceValue}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default OfferItem;
