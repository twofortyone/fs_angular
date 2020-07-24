import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Dish } from'../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishiIds: string[];
  prev: string;
  next: string;
  lefticon = faChevronLeft;
  righticon = faChevronRight;

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.dishService.getDishIds()
    .subscribe((dishiIds) => this.dishiIds = dishiIds);

    this.route.params
    .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish)=> {this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string){
    const index = this.dishiIds.indexOf(dishId);
    this.prev = this.dishiIds[(this.dishiIds.length + index - 1) % this.dishiIds.length]
    this.next = this.dishiIds[(this.dishiIds.length + index + 1) % this.dishiIds.length]

  }

  goBack(): void{
    this.location.back();
  }

}
