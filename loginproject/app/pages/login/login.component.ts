import { Component , OnInit } from "@angular/core";
import { User } from "../.././models/user";
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";
import {MainComponent} from ".././main/main.component";
import {AwsCognito, CognitoCommonDelegate} from "nativescript-aws-cognito";

@Component({
    selector: "ns-login",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit , CognitoCommonDelegate {

  
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

      AwsCognito.login(this.user.userName, this.user.password, this);
      
      
  }

  onSuccess(result:any){
    this.nav.backToPreviousPage();
  }

  onError(error:String){
    console.log("onError");
    alert(error);
  }

}