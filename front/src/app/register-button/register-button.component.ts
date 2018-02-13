import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
    
  register = function(name) {
    console.log("utilisateur enregistré " + name);
  }

registerButton(): void {
  
}

}
