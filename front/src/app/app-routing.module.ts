import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { RoadmapComponent }     from './roadmap/roadmap.component';
import { RegistrationComponent } from './registration/registration.component'

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: RegistrationComponent },
  { path: 'roadmap', component: RoadmapComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}