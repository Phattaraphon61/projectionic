import { crudapi } from '../crudapi';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GetapiService } from '../getapi.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string;
  password: string;
  loading: any;
  constructor(
    public navCtrl: NavController,
    private getapi: GetapiService,
    public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.navCtrl.navigateForward('/main')
    }

  };

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Present the loading controller
    await this.loading.present();
  }

  async presentAlert(mess) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: mess,
      buttons: [{
        text: 'Okay',
        handler: () => {

        }
      }
      ]
    });

    await alert.present();
  }

  signup() {
    this.navCtrl.navigateForward('/signup')
  }
  async signin() {

    await this.presentLoading();
    this.getapi.signinapp(this.email, this.password).subscribe(
      data => {
        if (data['status'] == "singin success") {
          localStorage.setItem('token',data['token']);
          this.navCtrl.navigateForward('/main')
        }
        if (data['status'] == "invalid email") {
          this.presentAlert("invalid email");
        }
        if(data['status'] == 'password is incorrect'){
          this.presentAlert("password is incorrect");
        }
        this.loadingController.dismiss()
      }
    )
  }
};
