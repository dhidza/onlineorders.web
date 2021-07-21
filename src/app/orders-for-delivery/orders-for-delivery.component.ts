import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orders-for-delivery',
  templateUrl: './orders-for-delivery.component.html',
  styleUrls: ['./orders-for-delivery.component.scss']
})
export class OrdersForDeliveryComponent implements OnInit {
  public showError = false;
  private loaded = false;
  displayedColumns: string[] = ['quantity', 'price', 'total', 'productName'];
  dataSource;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.ordersForDelivery()
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

  downloadDeliveryOrders(){
    let DATA = document.getElementById('orders-list');
    
    html2canvas(DATA).then(canvas => {
        
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;        

      var pageHeight = contentWidth / 592.28 * 841.89;
      //Height of html page without pdf generated
      var leftHeight = contentHeight;
      //Page offset
      var position = 0;

      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', 'a4');

      if(leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth,imgHeight);
        } else {
            while(leftHeight > 0) {
                //arg3-->distance left margin; arg4-->distance top margin; arg5-->width; arg6->height
                pdf.addImage(pageData, 'JPEG', 0, position,imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //Avoid adding blank pages
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        pdf.save('DeliveryOrders.pdf');
     });  
  }
}
