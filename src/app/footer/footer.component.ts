import { Component, OnInit } from '@angular/core';
import { faTwitter, faYoutube, faLinkedin, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  twitter = faTwitter;
  youtube = faYoutube;
  linkedin = faLinkedin;
  facebook = faFacebook;
  google = faGoogle;
  envelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
