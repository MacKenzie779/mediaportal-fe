import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Media, User } from '@app/_models';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  error:any = "";
  loginForm!: FormGroup;
  downloadForm!: FormGroup;
  uploadForm!: FormGroup;
  user:User;
  mySidebar:any = null;
  currentMedia:Media;
  loadingtext = "";
  filename = "";
  file:File;

  constructor(private http : HttpClient, private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService, private spinnerService:NgxSpinnerService) {
    this.user = authenticationService.currentUserValue;
    this.currentMedia = new Media;
    this.file = new File(["null"], "null");
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      convType: ['', Validators.required]
    });
    this.downloadForm = this.formBuilder.group({});
    this.uploadForm = this.formBuilder.group({
      upload: ['', Validators.required]
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

  public showSpinner(loadingInfo:string): void {
    this.loadingtext = loadingInfo;
    this.spinnerService.show();
  }

  stopSpinner():void {
    this.spinnerService.hide();
    this.loadingtext = "";
  }

  get field () {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.file) {
      this.showSpinner("Uploading \"" + this.filename);
      this.error = "";
      var uid = this.user.id;
      var formData = new FormData();
      var format:number = Number(this.loginForm.controls['convType'].value);
      formData.append("file", this.file, this.file.name);
      formData.append("uid", JSON.stringify(uid));
      formData.append("format", JSON.stringify(format));

      this.http.post<any>(`${environment.apiUrl}/data/convert`, formData)
      .subscribe({
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


  onFileSelected(event:any) {
    this.file = event.target.files[0];
    this.filename = this.file.name;
  }

}
