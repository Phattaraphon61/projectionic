import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { GetapiService } from '../getapi.service';
import { v4 as uuid } from 'uuid';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-createdata',
  templateUrl: './createdata.page.html',
  styleUrls: ['./createdata.page.scss'],
})
export class CreatedataPage implements OnInit {
  url:string;
  username:string;
  password:string;
  loading: any;
  constructor(public navCtrl: NavController,
    private getapi: GetapiService,
    public loadingController: LoadingController,) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.navCtrl.navigateForward('/home')
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

  savedata(){
    this.getapi.setdata(this.url,this.username,this.password,jwt_decode(localStorage.getItem('token'))['id']).subscribe(
      data => {
        if (data['status'] == "success") {
          this.navCtrl.navigateForward('/main')
        }
        this.loadingController.dismiss()
      }
    )
  }
  genpassword(){
    this.password = uuid();
  }

}
