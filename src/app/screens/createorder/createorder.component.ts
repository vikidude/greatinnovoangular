import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent implements OnInit {
  public order: Order;
  item_name: any[] = new Array();
  item_price: any[] = new Array();
  qty: any[] = new Array();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order = new Order();
  }

  counter(i: Number) {
    return new Array(i);
  }

  addOrder() {
    if (this.item_name.length > 0 && this.item_price.length > 0 && this.qty.length > 0) {
      var data = {
        item_name : this.item_name,
        item_price : this.item_price,
        quantity : this.qty
      }
      this.order.order_products = data;
      console.log('Order Model: ', this.order);
      this.orderService.addOrder(this.order).subscribe((data) => {
        console.log('Server response of add order:', data)
      })
    }
  }
}
