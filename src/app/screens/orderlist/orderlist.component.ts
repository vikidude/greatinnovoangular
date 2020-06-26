import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { merge } from 'rxjs/internal/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  displayedColumns: string[] = ['Order Id', 'Customer Name', 'Mobile Number', 'Total Price'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data1 = [];
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  pageNumber = 0;
  pageSize = 0;
  offset = 0;
  constructor(private orderService: OrderService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getAllOrders(this.offset,5,this.pageNumber);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log("order: ",this.dataSource.data);
  }

  getAllOrders(off,lim,pn) {
    this.orderService.getAllOrdersByLimit(off,lim).subscribe((data: Order[]) => {
      console.log("Retrieved data: ",data);
      this.dataSource.data = data['data'];
      this.resultsLength = data['count'];
      console.log("Length: ",data['count']);
      this.pageSize = 4;
      this.pageNumber = pn;
      this.isLoadingResults = false;
      return data['data'];
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(selectedData: any) {
    this.dialog.open(DialogComponent, {
      data: selectedData
    });
  }
  changePage(event){
    console.log("Change page: ",event);
    this.offset+=this.offset+5;
    let pn = event.pageIndex;
    this.getAllOrders((this.offset),5,pn);
    this.isLoadingResults=true;
  }
}