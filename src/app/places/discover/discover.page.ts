import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  // listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private filter = 'all';
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.onFilterUpdate(this.filter);
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(filter: string) {
    const isShown = (place) => filter === 'all' || place.userId !== this.authService.userId;
    this.relevantPlaces = this.loadedPlaces.filter(isShown);
    this.filter = filter;
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
