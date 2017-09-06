import { Component , OnInit } from "@angular/core";
import { User } from "../.././models/user";
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";
import {MainComponent} from ".././main/main.component";

@Component({
    selector: "ns-login",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent implements OnInit  {

  
  user: User;

  
  constructor(private nav: RouterExtensions, page:Page) {
   
    page.actionBarHidden = true;
  }
  

  ngOnInit(){
    this.user = new User();
  }

  signIn(){
       if ( this.user.userName.trim() == "" && this.user.password.trim() == ""){
          alert("you must user name and password");
          return;
      } else if(this.user.userName.trim() == ""){
        alert("you must user name");
        return;
      } else if(this.user.password.trim() == ""){
        alert("you must password");
        return;
      }

      if(! MainComponent.userMap){
        alert("User does not exists");
        return;
      }

      var tmpUser:User = MainComponent.userMap.get(this.user.userName);
      if(!tmpUser){
        alert("User does not exists");
        return; 
      } else if (tmpUser.password != this.user.password){
        alert("User's password does not correct");
        return;        
      }
      
      this.nav.navigate(["/main", tmpUser.userName]);
  }

}