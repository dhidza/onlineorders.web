import { Component, OnInit } from '@angular/core';
import { IOrder } from '../interfaces/iorder';
import { OrderService } from '../services/order.service';
import { DataSource } from '@angular/cdk/table'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  dataSource;
  public showError = false;
  private loaded = false;
  displayedColumns: string[] = ['createdDisplay', 'orderCode', 'orderDeliveryFeeDisplay', 'totalOrderDisplay'];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.customerOrders()
    .subscribe(res => {
      if(res.success){
        this.dataSource = res.returnValue;
        this.loaded = true;
      }
      else{
        this.showError = true;
      }
    },
    (error) => {
      console.log(error);
      this.showError = true;
    });
  }
}
