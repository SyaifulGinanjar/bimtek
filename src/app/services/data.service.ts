import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Message {
  name: string;
  nama_peserta: any;
  position: string;
  waktu: string;
  id: number;
  session_id: number;
  kta: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getPresensi(page = 1, session_id = 0){
    return this.http.get(environment.api + `api/presensi?session_id=${session_id}&page=${page}`);
  }

  public getCurrentSession(){
    return this.http.get(environment.api + `api/session`);
  }

  doGetData(uuid: any){
    return this.http.get(environment.api + 'api/userdata/' + uuid);
  }

  doPresensi(bodyReq: any){
    return this.http.post(environment.api + 'api/presensi', bodyReq);
  }

  login(bodyReq: any){
    return this.http.post(environment.api + 'api/auth/login', bodyReq);
  }
}
