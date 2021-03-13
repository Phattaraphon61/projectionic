import { GetapiService } from './../getapi.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  name:string;
  email:string;
  password:string;
  loading: any;
  constructor(public navCtrl: NavController,private getapi:GetapiService,public loadingController: LoadingController,public alertController: AlertController) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.navCtrl.navigateForward('/main')
    }
  }
  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
        message: 'Loading...'
    });
    // Present the loading controller
  await this.loading.present();
}


async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Warning',
    message: "this email has already been use",
    buttons: [ {
        text: 'Okay',
        handler: () => {

        }
      }
    ]
  });

  await alert.present();
}

  async signup(){
    await this.presentLoading();
    this.getapi.signupapp(this.name,this.email,this.password).subscribe(
      data =>{
        if(data['status'] == "success" ){
        this.navCtrl.navigateForward('/home')
        }

        if(data['status'] == "this email has already been used"){
          this.presentAlert();
        }
        this.loadingController.dismiss()
      }
    )

  }
}
