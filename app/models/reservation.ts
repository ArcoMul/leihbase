import type { RecordModel } from "pocketbase";

export type Reservation = RecordModel & {
  id: string;
  user: string;
  product: string;
  location: string;
  start: Date;
  end: Date;
  message: string;
  note: string;
  expand: any;
};
