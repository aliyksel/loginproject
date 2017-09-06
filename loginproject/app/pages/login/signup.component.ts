import { Component, OnInit } from "@angular/core";
import { User } from "../.././models/user";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import {MainComponent} from ".././main/main.component"
import {Page} from "ui/page";


@Component({
    selector: "ns-signup",
    templateUrl: "pages/login/signup.component.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class SignupComponent {

  user: User;

  constructor(private nav: RouterExtensions, page:Page  ) {
    this.user = new User();
    page.actionBarHidden = true;
  }
  
  submit(){
    this.nav.navigate(["/login"]);
  }

  signUp(){
    if(! MainComponent.userMap){
      MainComponent.userMap = new Map<string,User>();
    }
    if(this.user && this.user.userName){
       MainComponent.userMap.set(this.user.userName,this.user);
    }
    this.nav.backToPreviousPage();
  }



}