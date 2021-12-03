import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";

@Injectable({ providedIn: "root" })
export class BookingsService {
  private _bookings: Booking[] = [
    {
      id: "b1",
      placeId: "p1",
      userId: "abc",
      placeTitle: "Mahanttan Mansion",
      guessNumber: 2,
    },
  ];

  get bookings() {
    return [...this._bookings];
  }
}
