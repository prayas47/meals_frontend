import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from 'src/shared/services/auth.service';
import { EncrDecrService } from 'src/shared/security/encript.service';
import { SharedModule } from 'src/shared/shared.module';
import { MealsComponent } from './meals/meals.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MealsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[AuthService,EncrDecrService]
})
export class DashboardModule { }
