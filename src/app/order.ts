export class Order {
  // the order class
  _id: String;
  roomInstance: String;
  user: String;
  fromDate: Date;
  toDate: Date;
  reservationDate: Date;
  numNights: number;
  canEdit = false;
}
