import { Media } from './../_models/media';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import environment var
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  error:any = "";
  loginForm!: FormGroup;
  downloadForm!: FormGroup;
  currentMedia:Media;
  mySidebar:any = null;


  constructor(private formBuilder: FormBuilder, private http : HttpClient, private authenticationService: AuthenticationService) {
    this.currentMedia = new Media();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      url: ['', Validators.required],
      convType: ['', Validators.required]
    });
    this.downloadForm = this.formBuilder.group({});
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

  get field () {
    return this.loginForm.controls;
  }

  onSubmit() {
    var uri = this.loginForm.controls['url'].value;
    var format:Number = Number(this.loginForm.controls['convType'].value);
    var uid = this.authenticationService.currentUserValue['id'];
    this.http.post<any>(`${environment.apiUrl}/data/yt_dl`, {uid, uri, format}).subscribe({
      next: (resp) => {
        this.currentMedia = new Media();
        this.currentMedia.filepath = resp['filename'];
        this.currentMedia.mid = resp['mid'];
      },
      error: error => {
        this.error = error;
      }
    });
  }

  onDownload() {
    console.log("download converted file");
  }

}
