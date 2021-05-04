import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompanyProductModel } from '../interfaces/icompany-product-model';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.scss']
})
export class TopSellersComponent implements OnInit {
  model: ICompanyProductModel[] = []; 
  constructor(private listingService: ListingService,  private router: Router) { }

  ngOnInit(): void {   
      this.listingService.getTopSellers()
      .subscribe(res => {
        console.log(res);
        if(res.success)
          this.model = res.returnValue;            
      },
      (error) => {
        console.log(error);
      });  
  }

  selectProduct(id: number){
    this.router.navigateByUrl('/cart/' + id);
  }

}
