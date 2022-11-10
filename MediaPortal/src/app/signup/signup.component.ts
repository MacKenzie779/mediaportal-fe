//angular imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//auth service
import { AuthenticationService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  mySidebar:any = null;
  //login form in template
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  //errors on login, shown to the user
  error:any = '';


  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService ) {
    // redirect to dashboard if already logged in
    if (this.authenticationService.currentUserValue.id > 0) {
      this.router.navigate(['/convert/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'passwordRepeat')
    }
    );
  }

  get field () {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authenticationService.signup(this.field['username'].value, this.field['email'].value, this.field['password'].value, ).pipe(first()).subscribe({
      next: () => {
        this.authenticationService.login(this.field['username'].value, this.field['password'].value).pipe(first()).subscribe({
          next: () => {
            // get return url from route parameters or default to '/dashboard'
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/convert';
            this.router.navigate([returnUrl]);
          }
        });
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
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
}
