import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public baseUrl = environment.baseUrl + 'order';
  public headers = new HttpHeaders()
    .set("Content-Type", "application/json")

  constructor(private http: HttpClient) { }
  
  getAllOrders() {
    return this.http.get(`${this.baseUrl+'/getAllOrders'}`,{ headers: this.headers });
  }
  
  getAllOrdersByLimit(off,lim) {
    return this.http.post(`${this.baseUrl+'/getAllOrdersByLimit'}`,{offset:off,limit:lim},{ headers: this.headers });
  }
  addOrder(ad) {
    return this.http.post(`${this.baseUrl+'/createOrder'}`, ad, { headers: this.headers });
  }
}