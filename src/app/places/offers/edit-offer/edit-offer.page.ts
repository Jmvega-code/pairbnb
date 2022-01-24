import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrencySymbol } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe((place) => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required],
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.max(180)],
          }),
          price: new FormControl(this.place.price, {
            updateOn: 'blur',
            validators: [Validators.required],
          }),
        });
      });
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating Place...',
      })
      .then((loader) => {
        loader.present();
        setTimeout(() => {
          this.placesService
            .updatePlace(
              this.place.id,
              this.form.value.title,
              this.form.value.description,
              +this.form.value.price
            )
            .subscribe(() => {
              loader.dismiss();
              this.form.reset();
              this.navCtrl.navigateBack('/places/tabs/offers');
            });
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
