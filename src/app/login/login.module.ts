import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    IonicModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  providers: [DataService]
})
export class LoginModule { }
