import { Component, ViewChild } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { ZBar, ZBarOptions } from '@awesome-cordova-plugins/zbar/ngx';
import { ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataUser;
  presensi=[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  page = 0;
  last_page = 10;
  total = 0;
  currentSession;

  constructor(private data: DataService, private zbar: ZBar, private toastController: ToastController) {
    this.getSessions();
  }

  refresh(ev) {
    this.page = 0;
    this.presensi=[];
    this.getSessions();
    ev.detail.complete();
  }

  getSessions() {
    this.data.getCurrentSession().subscribe((res: any) => {
      if(res){
        this.currentSession = res;
        this.getMessages();
      }
    })
  }

  getMessages(event = null){
    if(this.currentSession){
      this.page += 1;
      this.data.getPresensi(this.page, this.currentSession.id).subscribe((res: any) => {
        this.last_page = res.last_page;
        this.total = res.total;
        this.presensi = this.presensi.concat(res.data);
        setTimeout(() => {
          if(event){
            event.target.complete();
          }
          if(this.last_page == this.page){
            this.infiniteScroll.disabled = true;
          }else{
            this.infiniteScroll.disabled = false;
          }
        }, 500);
      })
    }else{
      if(event){
        event.target.complete();
      }
    }
  }

  scan(){
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    }
    this.zbar.scan(options)
    .then(result => {
       this.data.doGetData(result).subscribe((val: any) =>{
        this.dataUser = val.data;
        const currentUser = localStorage.getItem('user');
        const panitia = JSON.parse(currentUser).id;
          const bodyReq = {
            nama_peserta_id: this.dataUser.id,
            user_id: panitia,
            type: 'mobile',
            status: 'checkin'
          };
          this.data.doPresensi(bodyReq).subscribe((val: any) =>{
            this.presentToast('Berhasil melakukan presensi');
            this.page = 0;
            this.presensi=[];
            this.getSessions();
          }, err=>{
            this.presentToast(err.error.message);
          });
      });
    })
    .catch(error => {
       console.log(error); // Error message
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

}
