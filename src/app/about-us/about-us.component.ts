import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  contactForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    message : new FormControl('', Validators.required),
    name : new FormControl('', Validators.required)
  });
 
  serverSuccess : boolean= false;
  constructor(private listingService: ListingService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.spinner.show();
    if(this.contactForm.valid)
    {
      this.listingService.contactUs(this.contactForm.value)
      .subscribe(result => {
        this.serverSuccess = true;
        this.spinner.hide();
        this.contactForm.reset();
      }, (error) => {
        this.spinner.hide();
      });
    }
    this.spinner.hide();
  }
}
