import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterButtonComponent } from './registration/register-button/register-button.component';
import { ListUsersComponent } from './registration/list-users/list-users.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationService } from './registration/registration.service'
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterButtonComponent,
    ListUsersComponent,
    RoadmapComponent,
    RegistrationComponent,
    ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RegistrationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
