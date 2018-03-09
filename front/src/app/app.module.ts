import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AlertsService } from './alerts/alerts.service';
import { RegisterButtonComponent } from './registration/register-button/register-button.component';
import { ListUsersComponent } from './registration/list-users/list-users.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationService } from './registration/registration.service'
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationHttpService } from './registration/registration-http.service';
import { LOCALE_ID } from '@angular/core';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterButtonComponent,
    ListUsersComponent,
    RoadmapComponent,
    RegistrationComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RegistrationService,
    AlertsService,
    RegistrationHttpService,
    { provide: LOCALE_ID, useValue: "fr" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
