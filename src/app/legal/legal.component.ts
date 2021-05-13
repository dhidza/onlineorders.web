import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  pdfSource: string = 'assets/termsandconditions.pdf';
  constructor() { }

  ngOnInit(): void {
  }

}
