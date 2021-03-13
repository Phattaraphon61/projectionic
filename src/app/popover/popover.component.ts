import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ClipboardService } from 'ngx-clipboard'


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() list : any;
  constructor(private pop:PopoverController,
    private _clipboardService: ClipboardService
  ) { }

  ngOnInit() {}


    username(){
      this._clipboardService.copy(this.list['username'])
      this.pop.dismiss();
    }
    password(){
      this._clipboardService.copy(this.list['password'])
      this.pop.dismiss();
    }



}
