import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatedataPage } from './createdata.page';

const routes: Routes = [
  {
    path: '',
    component: CreatedataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatedataPageRoutingModule {}
