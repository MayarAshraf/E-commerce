import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/model/iuser';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // UserList:Iuser[]=[];
  user:Iuser={} as Iuser;
  errorMessage: string = '';
  showPassword: boolean = false;
  constructor( private userser:UsersService,private router:Router){}

  loginUser(){
    const observer={
      next:(user:Iuser[])=>{
        // alert("User Login Successfuly");
        this.router.navigateByUrl('/Home');
      },
      error:(err:Error)=>{this.errorMessage = err.message;}
    }
    this.userser.userLogin(this.user).subscribe(observer)
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }


}
