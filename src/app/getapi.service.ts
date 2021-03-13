import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class GetapiService {

   dataUrl = 'http://localhost:5000/';
  constructor(private http:HttpClient) { }

  public signupapp(name:any,email:any,password:any): Observable<object> {
    return this.http.post(this.dataUrl+"signup",{"name":name,"email":email,"password":password});
  }
  public signinapp(email:any,password:any): Observable<object> {
    return this.http.post(this.dataUrl+"signin",{"email":email,"password":password});
  }

  public setdata(url:any,username:any,password:any,userid:any): Observable<object> {
    return this.http.post(this.dataUrl+"setdata",{"email":url,"username":username,"password":password,'userid':userid});
  }

  public viewdata(id:any){
    return this.http.get(this.dataUrl+"/viewdata/"+id)
  }

}
