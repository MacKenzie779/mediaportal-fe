import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newtestcomp',
  templateUrl: './newtestcomp.component.html',
  styleUrls: ['./newtestcomp.component.scss']
})
export class NewtestcompComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
  }

}
