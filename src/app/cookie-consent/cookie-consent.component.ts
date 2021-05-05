import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  public isConsented: boolean = false;
  constructor(private cookieService : CookieService ) { }

  ngOnInit(): void {
    const cookie = this.cookieService.get('Freshmeat.Consent');
    if(cookie == 'Consent Accepted')
      this.isConsented = true;
  }

  accept(){
    this.cookieService.set( 'Freshmeat.Consent', 'Consent Accepted', {expires: 30, sameSite: 'Strict'});
    this.isConsented = true;
  }
}
