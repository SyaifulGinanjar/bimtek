import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  bodyReq = { email: '', password: ''};
  constructor(private navCtrl: NavController, private service: DataService, private toastController: ToastController) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    const isLoggedIn = (localStorage.getItem('user') ? true: false);
    if(isLoggedIn){
      this.navCtrl.navigateRoot('home');
    }
  }

  setEmail(e){
    this.bodyReq.email = e.target.value;
  }
  setPassword(e){
    this.bodyReq.password = e.target.value;
  }
  login(){
    this.service.login(this.bodyReq).subscribe((res: any) => {
      if(res && res.data){
        this.presentToast('Berhasil login');
        localStorage.setItem('user', JSON.stringify(res.data));
        this.navCtrl.navigateRoot('home');
      }else{
        this.presentToast('Login gagal', 'danger');
      }
    })
  }

  async presentToast(msg, color = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'top',
      color: color,
      mode: 'ios'
    });
    await toast.present();
  }
}
