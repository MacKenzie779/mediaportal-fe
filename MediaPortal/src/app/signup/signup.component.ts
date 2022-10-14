import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';


  mySidebar:any = null;

  constructor() { }

  ngOnInit(): void {
  }

  open_sidebar(): void {
    this.mySidebar = document.getElementById("mySidebar");
    if (this.mySidebar.style.display === 'block') {
      this.mySidebar.style.display = 'none';
    } else {
      this.mySidebar.style.display = 'block';
    }
  }

  close_sidebar(): void {
    this.mySidebar.style.display = "none";
  }

  // constructor(
  //     private formBuilder: FormBuilder,
  //     private route: ActivatedRoute,
  //     private router: Router,
  //     //private authenticationService: AuthenticationService
  // ) {
  //     // redirect to home if already logged in
  //     //if (this.authenticationService.currentUserValue)
  //     {
  //         this.router.navigate(['/']);
  //     }
  // }

  // ngOnInit() {
  //     // this.loginForm = this.formBuilder.group({
  //     //     email: ['', Validators.required],
  //     //     password: ['', Validators.required]
  //     // });
  // }

  // // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.loginForm.invalid) {
  //         return;
  //     }

      // this.loading = true;
      // this.authenticationService.login(this.f['email'].value, this.f['password'].value)
      //     .pipe(first())
      //     .subscribe({
      //         next: () => {
      //             // get return url from route parameters or default to '/'
      //             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      //             this.router.navigate([returnUrl]);
      //         },
      //         error: error => {
      //             this.error = error;
      //             this.loading = false;
      //         }
      //     });

}
