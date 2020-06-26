import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public product_details: any[] = new Array();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if(data['order_products'] !== null){
      for(var i=0;i<data['order_products'].item_name.length;i++){
        this.product_details.push({item_name: data['order_products'].item_name[i],
          item_price: data['order_products'].item_price[i],
          quantity: data['order_products'].quantity[i]})
      }
    }
  }
  ngOnInit(): void {
  }

}
