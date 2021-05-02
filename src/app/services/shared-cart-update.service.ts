import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCartUpdateService {
  basketCount: number;
  basketCountBS = new BehaviorSubject<number>(0);
  
  constructor() {
      this.basketCountBS.next(this.basketCount);
  }

  updateBasketCount(newVal: number){
    this.basketCount = newVal;
    this.basketCountBS.next(this.basketCount);
  }
}
