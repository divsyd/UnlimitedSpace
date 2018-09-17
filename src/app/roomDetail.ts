import { Hotel } from './hotel';

export class RoomDetail {
    // room class
    _id: string;
    name: string;
    hotel: Hotel;
    maxGuest: number;
    bedrooms: number;

    constructor(item: any) {
        Object.assign(this, item);
    }
}
