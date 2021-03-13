import { Component, Input, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-manuover',
  templateUrl: './manuover.component.html',
  styleUrls: ['./manuover.component.scss'],
})
export class ManuoverComponent implements OnInit {
  @Input() list : any;
  constructor(public navCtrl: NavController,private pop:PopoverController) { }

  ngOnInit() {}


  test(){
    localStorage.clear();
    this.navCtrl.navigateForward('/home')
    this.pop.dismiss();
  }


}
