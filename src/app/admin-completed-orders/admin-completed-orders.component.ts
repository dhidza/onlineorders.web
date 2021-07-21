import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: './admin-completed-orders.component.html',
  styleUrls: ['./admin-completed-orders.component.scss']
})
export class AdminCompletedOrdersComponent implements OnInit {
  displayedColumns: string[] = ['createdDisplay', 'orderCode', 'totalOrderDisplay', 'actions'];
  public showError = false;
  private loaded = false;
  dataSource;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.adminOrders()
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

  toDelivery(orderCode: string){
    this.orderService.informDeliveryEnroute(orderCode)
    .subscribe(res => {
      if(res.success){
        this.ngOnInit();
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

  completeOrder(orderCode: string){
    this.orderService.markOrderAsDelivered(orderCode)
    .subscribe(res => {
      if(res.success){
        this.ngOnInit();
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
