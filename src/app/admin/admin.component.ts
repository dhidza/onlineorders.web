import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public showError = false;
  private loaded = false; 
  totalForTrim: number;
  totalPaid: number;
  dataSource;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {   
    this.orderService.ordersForDelivery()
    .subscribe(res => {
      if(res.success){
        this.dataSource = res.returnValue;
        this.totalForTrim = this.dataSource.map(a => a.totalProductPrice).reduce(function(a, b)
        {
          return a + b;
        });    
        this.totalPaid = this.dataSource.map(a => a.totalOrderCents).reduce(function(a, b)
        {
          return a + b;
        });      
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
