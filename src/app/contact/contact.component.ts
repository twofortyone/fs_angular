import { Component, OnInit } from '@angular/core';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  telephone=  faPhone;
  fax = faFax;
  envelope= faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
