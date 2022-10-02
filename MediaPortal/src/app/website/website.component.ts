import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  apistatus:string = "";
  joke:string[] = [];
  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    // const body = {user: 'user'};
    // this.client.post("https://official-joke-api.appspot.com/jokes/programming/random",
    // body,
    // //{
    // //   headers: new HttpHeaders("Authorization").set('token','asdfasdfasdfee'),
    // //   params: new HttpParams().set('joke', 'programming')
    // // }
    // )
    // .subscribe((data:any) => {
    //   this.joke[0] = data.body[0].setup;
    //   this.joke[1] = data.body[0].punchline;
    //   console.log(data);
    // });

    this.client.get(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    , {observe: 'response'})
    .subscribe((data:any) => {
      this.apistatus = data['status'];
      this.joke[0] = data.body[0].setup;
      this.joke[1] = data.body[0].punchline;
      console.log(data);
    }, (err:HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client error");
      }
      else {
        console.log("API error");
      }
      this.joke[0] = "Error in API call";
      this.joke[1] = err.message;
    });
  }

  clickHandler() {
  }

}
