import { LogoutComponent } from './logout/logout.component';
import { ChangepasswdComponent } from './changepasswd/changepasswd.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_helpers';
import { MediaComponent } from './media/media.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: 'convert', redirectTo: 'convert/dashboard' },
  { path: 'convert/dashboard', component: DashboardComponent },
  { path: 'convert/youtube', component: YoutubeComponent },
  { path: 'convert/media', component: MediaComponent },
  { path: 'user/changepassword', component: ChangepasswdComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
