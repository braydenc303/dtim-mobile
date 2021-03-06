import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastPageRoutingModule } from './past-routing.module';

import { PastUserTechProfilePage } from './past.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';
import { SavvatoTechprofileUserHistoricalViewModule } from '@savvato-software/savvato-techprofile-user-historical-view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastPageRoutingModule,
    DtimTechprofileModule,
    SavvatoTechprofileUserHistoricalViewModule
  ],
  declarations: [PastUserTechProfilePage]
})
export class PastPageModule {}
