import { Media } from './../_models/media';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import environment var
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';
import { User } from '@app/_models';


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
  loadingtext = "";
  user:User;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private authenticationService: AuthenticationService, private spinnerService: NgxSpinnerService) {
    this.currentMedia = new Media();
    this.user = authenticationService.currentUserValue;
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

  public showSpinner(loadingInfo:string): void {
    this.loadingtext = loadingInfo;
    this.spinnerService.show();
  }

  stopSpinner():void {
    this.spinnerService.hide();
    this.loadingtext = "";
  }

  close_sidebar(): void {
    this.mySidebar.style.display = "none";
  }

  get field () {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.error = "";
    var uri = this.loginForm.controls['url'].value;
    this.showSpinner("Downloading \"" + uri + "\" from youtube.com");
    var format:Number = Number(this.loginForm.controls['convType'].value);
    var uid = this.authenticationService.currentUserValue['id'];
    this.http.post<any>(`${environment.apiUrl}/data/yt_dl`, {uid, uri, format}).subscribe({
      next: (resp) => {
        this.currentMedia = new Media();
        this.currentMedia.filepath = resp['filename'];
        this.currentMedia.mid = resp['mid'];
        this.stopSpinner();
      },
      error: error => {
        this.stopSpinner();
        this.error = error;
      }
    });
  }

  onDownload() {
    this.showSpinner("Downloading \"" + this.currentMedia.filepath + "\"");
    var mid = this.currentMedia.mid;
    var uid = this.authenticationService.currentUserValue['id'];
    this.http.post(`${environment.apiUrl}/data/download`, {uid, mid}, {responseType: 'blob'}).subscribe({
      next: (resp) => {
        saveAs(resp, this.currentMedia.filepath);
        this.stopSpinner();
        window.location.reload();
      },
      error: error => {
        this.stopSpinner();
        this.error = error;
      }
    });
  }
}
