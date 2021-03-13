import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatedataPageRoutingModule } from './createdata-routing.module';

import { CreatedataPage } from './createdata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatedataPageRoutingModule
  ],
  declarations: [CreatedataPage]
})
export class CreatedataPageModule {}
