import { TypeOffer } from "../share/enum/typeOffre";

export class Offer {
  type: TypeOffer;
  sliceValue: number;
  value: number;
  offerPrice: number;
  constructor(offer?: any) {
    this.type = (offer && offer.type) || null;
    this.sliceValue = (offer && offer.sliceValue) || null;
    this.value = (offer && offer.value) || null;
    this.offerPrice = (offer && offer.offerPrice) || null;
  }
}
