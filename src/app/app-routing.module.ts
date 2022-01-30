import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// local modules
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';

import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
  },
  {
    path: 'pokemon',
    component: PokemonComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
