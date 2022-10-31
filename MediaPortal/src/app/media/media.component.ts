import { AuthenticationService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Media, User } from '@app/_models';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  error:any = "";
  loginForm!: FormGroup;
  downloadForm!: FormGroup;
  user:User;
  mySidebar:any = null;
  currentMedia:Media;
  loadingtext = "";
  fileName = "";

  constructor(private http : HttpClient, private formBuilder: FormBuilder, private authService:AuthenticationService) {
    this.user = authService.currentUserValue;
    this.currentMedia = new Media;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      upload: ['', Validators.required],
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

  onSubmit() {
    console.log("submit");
  }

  onDownload() {
    console.log("download");
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}

}
