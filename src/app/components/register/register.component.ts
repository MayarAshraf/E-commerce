import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/model/iuser';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // user:Iuser={} as Iuser;
  user: Iuser = {
    email: '',
    username: '',
    password: '',
    name: { firstname: '', lastname: '' },
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
      geolocation: { lat: '', long: '' }
    },
    phone: ''
  };
  constructor( private userser:UsersService,private router:Router){}
  RegForm(){
    const observer={
      next:(user:Iuser[])=>{
        alert("User Added Successfuly");
        this.router.navigateByUrl('/Home');
      },
      error:(err:Error)=>{ err.message}
    }
    this.userser.userReg(this.user).subscribe(observer)
  }

}
