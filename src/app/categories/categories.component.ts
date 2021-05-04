import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { ICategoryModel } from '../interfaces/icategory-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  model: ICategoryModel[] = [];
  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit(): void {
    this.listingService.getCategories()
        .subscribe(res => {
          console.log(res);
          if(res.success)
            this.model = res.returnValue;
        },
        (error) => {
          console.log(error);
        }).unsubscribe();
  }

  selectCategory(id: number){
    this.router.navigateByUrl('/products/' + id);
  }

}
