import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TradeComponent } from './components/trade/trade.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MarketComponent } from './components/market/market.component';
import { InfoComponent } from './components/info/info.component';
import { AuthGuardLoggedInService } from './services/guard/auth-guard-logged-in.service';
import { AuthGuardNotLoggedInService } from './services/guard/auth-guard-not-logged-in.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'market', component: MarketComponent },
  // { path: 'profile', component: ProfileComponent},
  // { path: 'edit-profile', component: EditProfileComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardLoggedInService] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardLoggedInService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardNotLoggedInService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardNotLoggedInService] },
  { path: 'trade/:coin', component: TradeComponent },
  { path: 'info/:coin', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
