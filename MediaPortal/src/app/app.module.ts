import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VideoDBService } from './shared/video-db.service';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { NewtestcompComponent } from './newtestcomp/newtestcomp.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WebsiteComponent } from './website/website.component';

const myRoutes:Routes = [
  { path: 'new/:id', component: NewtestcompComponent },
  { path: 'web', component: WebsiteComponent },
  { path: '', component: TitleComponent, pathMatch: "full"},
  { path: '**', redirectTo: "new/404"},
];



@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NewtestcompComponent,
    WebsiteComponent
  ],
  imports: [
    RouterModule.forRoot(myRoutes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [VideoDBService, {provide: "VideoComponentConfig", useValue: "meineConfig"}],
  bootstrap: [AppComponent]
})
//kann durch export von anderen modules verwendet werden
export class AppModule { }
