//angular imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//auth service
import { AuthenticationService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { AbstractControlOptions } from '@angular/forms';

@Component({
  selector: 'app-changepasswd',
  templateUrl: './changepasswd.component.html',
  styleUrls: ['./changepasswd.component.scss']
})
export class ChangepasswdComponent implements OnInit {

  mySidebar:any = null;
  //login form in template
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  //errors on login, shown to the user
  error:any = '';
  isError:boolean = true;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      oldpwd: ['', Validators.required],
      newpwd: ['', Validators.required],
      newpwdRepeat: ['', Validators.required]
    },
    {
      validator: MustMatch('newpwd', 'newpwdRepeat')
    });
  }

  get field () {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    var user = this.authenticationService.currentUserValue['username'];
    console.log(user);
    this.authenticationService.changepwd(this.authenticationService.currentUserValue['username'], this.field['oldpwd'].value, this.loginForm.controls['newpwd'].value).pipe(first()).subscribe({
      next: () => {
        // get return url from route parameters or default to '/dashboard'
        this.isError = false;
        this.error = "Password changed succesfully!";
        this.loginForm.reset();
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
