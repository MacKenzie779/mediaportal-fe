import { AuthenticationService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  error:any = "";
  loginForm!: FormGroup;
  user:User;
  mySidebar:any = null;

  constructor(private formBuilder: FormBuilder, authService:AuthenticationService) {
    this.user = authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      convInType: ['', Validators.required],
      convOutType: ['', Validators.required]
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

  onSubmit() {
    console.log("submit");
  }

}
