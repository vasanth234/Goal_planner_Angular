import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './Model/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild("LoginModel") loginModel!:ElementRef;
  isLoginAvailable=signal<boolean>(true);

  http=inject(HttpClient);

  registerObj:any={
    
      "userId": 0,
      "emailId": "",
      "password": "",
      "fullName": "",
      "mobileNo": ""
    
  }

  localstoredData:any;

  ngOnInit(): void {
      let localData=localStorage.getItem("getUser");
      if(localData){
        this.localstoredData=JSON.parse(localData);

      }
  }

  loginUser:LoginUser=new LoginUser();


  toggleForm(){
    this.isLoginAvailable.set(!this.isLoginAvailable());
  }

  openModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display="block"
    }

  }

  closeModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display='none'
    }
  }

  onRegister() {
    debugger;
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register", this.registerObj)
      .subscribe({
        
        next: (res) => {
          debugger;
          alert("Registration success");
          this.closeModel();
        },
        error: (err) => { // Fix: Use 'error' inside the object and add 'err' parameter
          alert("Wrong credentials");
        }
      });
  }

  onLogin(){
    debugger;
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register", this.registerObj)
      .subscribe({
        
        next: (res:any) => {
          debugger;
          alert("Login success");
          localStorage.setItem("getUser",JSON.stringify(res))
        },
        error: (err) => { // Fix: Use 'error' inside the object and add 'err' parameter
          alert("Failed login");
        }
      });
  }
  



}
