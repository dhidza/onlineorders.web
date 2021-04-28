import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,  autoplay: true, autoplaySpeed: 4000};
  slides = [{'image': 'assets/images/slider/slide_chicken_pieces.jpg',  'redirectUrl': '/categories', 'description': 'Best kept Irish CHICKEN traceable to the source'  }
            ,{'image': 'assets/images/slider/slide_pork_ribs.jpg', 'redirectUrl': '/products/2',  'description': '100% Irish PORK RIBS traceable to the source'}         
            ,{'image': 'assets/images/slider/slide_beef.jpg', 'redirectUrl': '/products/1', 'description': '100% Irish BEEF traceable to the source'}
            ,{'image': 'assets/images/slider/slide_lamb_ribs.jpg', 'redirectUrl': '/categories',  'description': '100% Irish PORK CHOPS traceable to the source'}
            ,{'image': 'assets/images/slider/slide_pork_chops.jpg', 'redirectUrl': '/cart/6',  'description': '100% Irish PORK CHOPS traceable to the source'}]
  
  constructor(private listingService: ListingService) { }

  ngOnInit(): void {   
  }
}
