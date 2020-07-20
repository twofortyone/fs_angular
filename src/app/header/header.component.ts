import { Component, OnInit } from '@angular/core';
import { faHome, faInfo, faAddressCard, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home = faHome;
  info = faInfo;
  contact = faAddressCard;
  menu = faList;

  constructor() { }

  ngOnInit(): void {
  }

}
