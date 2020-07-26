import { Component, OnInit, ViewChild, Inject, inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Dish } from'../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

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

  // Form 
  date= new Date();
  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('fform') commentFormDirective;

  formErrors={
    'author':'',
    'comment':''
  }

  validationMessages={
    'author':{
      'required': 'Author is required',
      'minlength':'Author must be at least 2 characters'
    },
    'comment':{
      'required': 'Comment is required',
      'minlength': 'Comment must be at least 2 characters'
    }
  }
  // Icons
  lefticon = faChevronLeft;
  righticon = faChevronRight;

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private cfBuilder: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 

      this.createForm();
    }

  ngOnInit(): void {
    this.dishService.getDishIds()
    .subscribe((dishiIds) => this.dishiIds = dishiIds);

    this.route.params
    .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish)=> {this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm(){
    this.commentForm = this.cfBuilder.group({
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment['date'] = this.date.toISOString();
    console.log(this.comment);
    this.commentForm.reset({
      rating: 5,
      author:'',
      comment:'',
      date: ''
    });
    this.dish['comments'].push(this.comment);
    this.commentFormDirective.reset({rating:5});
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
