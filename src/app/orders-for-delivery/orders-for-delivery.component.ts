import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-orders-for-delivery',
  templateUrl: './orders-for-delivery.component.html',
  styleUrls: ['./orders-for-delivery.component.scss']
})
export class OrdersForDeliveryComponent implements OnInit {
  @ViewChild('ordersList') pdfTable: ElementRef;
  public showError = false;
  private loaded = false;
  displayedColumns: string[] = ['quantity', 'price', 'total', 'productName'];
  dataSource;
  totalForTrim: number;
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
  downloadDeliveryOrdersPdf(){
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
  }
}
