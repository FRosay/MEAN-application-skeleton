import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterButtonComponent } from './register-button/register-button.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterButtonComponent,
    ListUsersComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    UsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
