export interface Reservation {
  id: string;
  user: string;
  product: string;
  location: string;
  start: Date;
  end: Date;
  message: string;
  note: string;
}
