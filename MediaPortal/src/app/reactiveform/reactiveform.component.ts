import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss']
})
export class ReactiveformComponent implements OnInit {

  myValidator = (control: FormControl): {[key:string]: any} => {
    if (control.value == "name") {
      return {name: {valid: false}};
    }
    else {
      return {name: {valid: true}};
    }
  }

  loginForm = new FormGroup({
    name : new FormGroup({
      vorname: new FormControl(null, Validators.required),
      nachname: new FormControl("Mustermann", Validators.required)
    }),
    passwd: new FormControl(null, Validators.required)
  });



  // static myValidator(control: FormControl): {[key:string]: any} {
  //   if (control.value == "name") {
  //     return {name: {valid: false}};
  //   }
  //   else {
  //     return {name: {valid: true}};
  //   }
  // };


  constructor() { }

  ngOnInit(): void {
  }



  login() {
    console.log(this.loginForm);
    this.loginForm.controls['passwd'].setValidators(Validators.minLength(8));
    //this.loginForm.reset();
  }

}
