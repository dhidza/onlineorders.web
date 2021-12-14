import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { ICompanyProductModel } from '../interfaces/icompany-product-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  model: ICompanyProductModel[] = []; 
  constructor(private listingService: ListingService,  private activatedRoute: ActivatedRoute,
     private router: Router) { 
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        console.log(params.get('id'))
        this.listingService.getProducts(+params.get('companyId'), +params.get('id'))
        .subscribe(res => {
          console.log(res);
          if(res.success)
            this.model = res.returnValue;            
        },
        (error) => {
          console.log(error);
        });  
      });  
  }
  selectProduct(id: number){
    this.router.navigateByUrl('/cart/' + id);
  }

  backToCategories(){
    this.router.navigateByUrl('/categories');
  }
}
