import { ManuoverComponent } from './../manuover/manuover.component';
import { PopoverComponent } from './../popover/popover.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { GetapiService } from '../getapi.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loading: any;
  datas = []
  constructor(public pop: PopoverController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private getapi: GetapiService,
    public loadingController: LoadingController,) { }

  ngOnInit() {
    this.getapi.viewdata(jwt_decode(localStorage.getItem('token'))['id']).subscribe(
      data => {
        if (data['status'] == "success") {
          // this.presentLoading()
          this.datas = [];
          for(var i = 0; i<data['data'].length; i++){
            this.datas.push({
              id: data['data'][i][0],
              url: data['data'][i][1],
              username: data['data'][i][2],
              password: data['data'][i][3],
            })
          }
        }
        this.loadingController.dismiss()
      }
    )
    if (localStorage.getItem('token') == null) {
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

  async presentPopover(recive: any, ev: any) {
    const popover = await this.pop.create({
      component: PopoverComponent,
      event: ev,
      cssClass: 'my-custom-class',
      componentProps: { list: recive },
      translucent: true
    });
    return await popover.present();
  }

  async manuPopover(recive: any, ev: any) {
    const popover = await this.pop.create({
      component: ManuoverComponent,
      event: ev,
      cssClass: 'my-custom-class',
      componentProps: { list: recive },
      translucent: true
    });
    this.datas = [];
    return await popover.present();
  }

  async adddata() {
    this.navCtrl.navigateForward('/createdata')
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit()
      event.target.complete();
    }, 2000);
  }



}
