import { Component, OnInit, ViewChild, Inject, inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from'../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss',],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishiIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishCopy: Dish;
  visibility = 'shown';

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
    .pipe(switchMap((params: Params) => {this.visibility= 'hidden'; return this.dishService.getDish(params['id']);}))
    .subscribe((dish)=> {this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
    errmess => this.errMess = <any>errmess);
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
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
    .subscribe(dish =>{
      this.dish = dish; this.dishCopy = dish;
    },
    errmess => {this.dish =null; this.dishCopy=null; this.errMess = <any> errmess});
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      author:'',
      comment:'',
      date: ''
    });
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
