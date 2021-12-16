import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public showError = false;
  loaded = false; 
  totalForTrim: number;
  totalPaid: number;
  dataSource;
  constructor(private orderService: OrderService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {  
    this.spinner.show(); 
    this.orderService.ordersForDelivery()
    .subscribe(res => {
      if(res.success){
        this.dataSource = res.returnValue;
        if(this.dataSource.length > 0){
          this.totalForTrim = this.dataSource.map(a => a.totalProductPrice).reduce(function(a, b)
          {
            return a + b;
          });    
          this.totalPaid = this.dataSource.map(a => a.totalOrderCents).reduce(function(a, b)
          {
            return a + b;
          });
        }
        else{
          this.totalForTrim = 0;
          this.totalPaid = 0;
        }
              
        this.loaded = true;
      }
      else{
        this.showError = true;
      }
      this.spinner.hide();
    },
    (error) => {
      console.log(error);
      this.showError = true;
      this.spinner.hide();
    });
  }
}
