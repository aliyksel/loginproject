import { Component, OnInit, NgZone } from "@angular/core";
import { User } from "../.././models/user";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import {MainComponent} from ".././main/main.component"
import {Page} from "ui/page";
import {AwsCognito, CognitoCommonDelegate} from "nativescript-aws-cognito";


@Component({
    selector: "ns-signup",
    templateUrl: "pages/login/signup.component.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class SignupComponent implements CognitoCommonDelegate{

  user: User;
  showVerify:boolean = false;
  enableSignUp :boolean= true;
  verificationCode:string;
  
  constructor(private nav: RouterExtensions, page:Page,private zone:NgZone  ) {
    this.user = new User();
    page.actionBarHidden = true;
  }

  signUp(){
    /*if(! MainComponent.userMap){
      MainComponent.userMap = new Map<string,User>();
    }
    if(this.user && this.user.userName){
       MainComponent.userMap.set(this.user.userName,this.user);
    }*/

    let attributes: Array<{key:string, value:string}> = new Array<{key:string, value:string}>();
    attributes.push({key:"given_name", value:this.user.givenName});
    attributes.push({key:"family_name", value:this.user.lastName});
    attributes.push({key:"email", value:this.user.email});
    AwsCognito.registerUser(this.user.userName, this.user.password, attributes, this);

  }

  verify(){
    AwsCognito.confirmSignUp(this.user.userName,this.verificationCode, this );
  }

  onError(error:String){
     alert(error);
  }

  onSuccess(result:any){
     if(this.showVerify  == false){
       this.zone.run(()=>{
      this.showVerify = true;
      this.enableSignUp = false;
       });
     }else{
      this.nav.backToPreviousPage();
     }
   
      
  }
}