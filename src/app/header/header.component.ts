import { Component, OnInit } from '@angular/core';
import { faHome, faInfo, faAddressCard, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


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
  sign = faSignInAlt;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openLoginForm(){
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

}
