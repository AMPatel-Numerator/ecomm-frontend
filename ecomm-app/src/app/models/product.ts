export interface Product {
  destinationId?: number;
  imageUrl?: string;
  name?: string;
  price?:number;
  description?: string;
  numDays?:number;
  numNights?:number;
  country?:string;
  people?:number
}

export interface Booking {
  bookingId?:number;
  userId?:number;
  placeName?:string;
  placeCountry?:string;
  food?:string;
  mode?:string;
  numDays?:number;
  numNights?:number;
  description?:string;
  price?:number;
  date?:string;
}
