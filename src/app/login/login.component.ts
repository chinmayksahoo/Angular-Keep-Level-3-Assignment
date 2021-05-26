import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    public bearerToken: any;
    public submitMessage: string;

    constructor(private authServ:AuthenticationService, public routerServ:RouterService){

    }

    loginSubmit() {
      if(this.username.valid && this.password.valid){
        this.authServ.authenticateUser({
          username: this.username.value,
          password: this.password.value
        }).subscribe(resp => {
          this.bearerToken = resp['token'];
          this.authServ.setBearerToken(this.bearerToken);
          this.routerServ.routeToDashboard();
        },err => {
          if (err.status === 403) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        });
      }
    }

    getErrorMessage() {
      return this.username.hasError('required') ? 'You must enter a value' :
            this.password.hasError('required') ? 'You must enter a value ' :
            '';
    }
}
