import { Component, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { Booking } from "./booking.model";
import { BookingsService } from "./bookings.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }

  onCancelBooking(bookingId: string, slidingBooking: IonItemSliding) {
    console.log("Cancelling Booking", bookingId);
    slidingBooking.close();
  }
}
