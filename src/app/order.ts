export class Order {
  // the order class
  _id: String;
  room: string;
  user: String;
  fromDate: Date;
  toDate: Date;
  reservationDate: Date;
  numNights: number;
  canEdit = false;
}
