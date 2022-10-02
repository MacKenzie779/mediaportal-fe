import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(value:any) {
    console.log(value);
    console.log(value['name']['vorname'])
    console.log(value['name']['nachname'])
  }

}
