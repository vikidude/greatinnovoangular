import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  orders: Order[];
  topCustomers: any[] = new Array();

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Top Customers' },
  ];

  lineChartLabels: Label[] = [];

  lineChartData1: ChartDataSets[] = [
    { data: [], label: 'Top Products' },
  ];

  lineChartLabels1: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((data: Order[]) => {
      this.orders = data['data'];
      console.log("All orders: ", this.orders);
      this.sortUsers(this.orders);
      this.sortProducts(this.orders);
    })
  }

  sortProducts(data) {
    var objData = [];
    var finalData = new Array();
    var products = [];
    for (let a of data) {
      for (let o in a.order_products.item_name) {
        products.push(a.order_products.item_name[o]);
        for (let q in a.order_products.quantity) {
          if (o == q) {
            objData.push({
              item_name: a.order_products.item_name[o],
              quantity: a.order_products.quantity[q],
            })
          }
        }
      }
    }
    var set_products = Array.from(new Set(products));

    for (let s in set_products) {
      for (let n in objData) {
        if (objData[n].item_name == set_products[s]) {
          if (finalData[s] === undefined) {
            finalData[s] = {};
            finalData[s].item_name = set_products[s];
            finalData[s].quantity = objData[s].quantity;
          } else {
            finalData[s].quantity = finalData[s].quantity + objData[n].quantity
          }
        }
      }
      if ((set_products).length - 1 === parseInt(s)) {
        let top_products = finalData.sort((a, b) => (a.quantity < b.quantity) ? 1 : ((b.quantity < a.quantity) ? -1 : 0));
        for (let t in top_products) {
          if (parseInt(t) < 6) {
            this.lineChartLabels1[t] = top_products[t].item_name;
            this.lineChartData1[0].data[t] = (top_products[t].quantity);
          }
        }
      }
    }
  }

  sortUsers(data) {
    var objData = [];
    var finalData = new Array();
    var mob_no = [];
    for (let o of data) {
      mob_no.push(o.customer_mobile_number);
      objData.push({
        customer_mobile_number: o.customer_mobile_number,
        customer_name: o.customer_name,
        total_cost: o.total_cost,
        order_number: o.order_number
      })
    }
    var set_mob_no = Array.from(new Set(mob_no));
    for (let s in set_mob_no) {
      for (let n in objData) {
        if (objData[n].customer_mobile_number == set_mob_no[s]) {
          if (finalData[s] === undefined) {
            finalData[s] = {};
            finalData[s].customer_mobile_number = set_mob_no[s];
            finalData[s].customer_name = objData[n].customer_name;
            finalData[s].total_cost = objData[s].total_cost;
          } else {
            finalData[s].total_cost = finalData[s].total_cost + objData[n].total_cost
          }
        }
      }
      if ((set_mob_no).length - 1 === parseInt(s)) {
        this.topCustomers = finalData.sort((a, b) => (a.total_cost < b.total_cost) ? 1 : ((b.total_cost < a.total_cost) ? -1 : 0));
        for (let t in this.topCustomers) {
          if (parseInt(t) < 6) {
            this.lineChartLabels[t] = this.topCustomers[t].customer_name;
            this.lineChartData[0].data[t] = (this.topCustomers[t].total_cost);
          }
        }
      }
    }
  }

}
