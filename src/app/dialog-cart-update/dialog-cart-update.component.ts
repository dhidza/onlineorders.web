import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CartDialogData } from '../interfaces/cart-dialog-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-cart-update',
  templateUrl: './dialog-cart-update.component.html',
  styleUrls: ['./dialog-cart-update.component.scss']
})
export class DialogCartUpdateComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<DialogCartUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartDialogData) { }

  ngOnInit(): void {
  }

  checkOut(){
    this.dialogRef.close(-1000);
    this.router.navigateByUrl('/summary/' + this.data.order.id + '/' + this.data.order.orderCode);
  }
}
