import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  jokenum = 1;
  joke:string[] = [];
  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client.get(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    , {observe: 'response'}).subscribe((data:any) => {
      //this.joke[0] = data[0].setup;
      //this.joke[1] = data[0].punchline;
      console.log(data);
    });
  }

  clickHandler() {
  }

}
