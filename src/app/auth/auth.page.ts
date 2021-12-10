import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.loadingCtrl
      .create({
        message: 'Logging in...',
        keyboardClose: true,
      })
      .then((loader) => {
        loader.present();
        setTimeout(() => {
          loader.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    form.value.email = '';
    form.value.password = '';

    if (this.isLogin) {
      //send a request to login servers
      this.onLogin();
    } else {
      //send a request to sign up servers
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
