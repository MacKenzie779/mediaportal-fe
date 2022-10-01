import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VideoDBService } from './shared/video-db.service';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { NewtestcompComponent } from './newtestcomp/newtestcomp.component';
import { RouterModule, Routes } from '@angular/router';


const myRoutes:Routes = [
  { path: '', component: TitleComponent },
  { path: 'new', component: NewtestcompComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NewtestcompComponent
  ],
  imports: [
    RouterModule.forRoot(myRoutes),
    BrowserModule
  ],
  providers: [VideoDBService, {provide: "VideoComponentConfig", useValue: "meineConfig"}],
  bootstrap: [AppComponent]
})
//kann durch export von anderen modules verwendet werden
export class AppModule { }
