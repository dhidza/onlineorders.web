import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IDeliveryDetails } from '../interfaces/idelivery-details';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListingService } from '../services/listing.service';
import { ICountyModel } from '../interfaces/icounty-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-delivery-address',
  templateUrl: './dialog-delivery-address.component.html',
  styleUrls: ['./dialog-delivery-address.component.scss']
})
export class DialogDeliveryAddressComponent implements OnInit {
  counties : ICountyModel[];
  addressForm = new FormGroup({
    deliveryAddress : new FormControl('',[Validators.required]),
    countyId : new FormControl('', Validators.required),
    deliveryPhone: new FormControl('', Validators.required),
    eirCode: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private listingService: ListingService,
     public dialogRef: MatDialogRef<DialogDeliveryAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeliveryDetails) { 
      this.listingService.getCounties()
      .subscribe(res => {
        console.log(res);
        this.counties = res.returnValue;
        this.addressForm.setValue({'deliveryAddress': this.data.deliveryAddress ?? '', 'eirCode': this.data.eirCode ?? '',
          'deliveryPhone': this.data.deliveryPhone ?? '', 'countyId': this.data.countyId?? 1});
      },
      (error) => {
        console.log(error);
      }).unsubscribe();        
    }

  ngOnInit(): void {   
  }
  onSubmit(){
    this.dialogRef.close(this.addressForm.value);
  }

}
