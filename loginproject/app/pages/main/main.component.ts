import { Component , OnInit, NgZone} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {User} from "../../././models/user";
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";
import {AwsCognito, CognitoCommonDelegate} from "nativescript-aws-cognito";

@Component({
  selector: "mainpage",
  templateUrl: "pages/main/main.component.html",
  styleUrls: []
})
export class MainComponent implements OnInit, CognitoCommonDelegate{

 
  
  user:User;
  constructor(private router:ActivatedRoute, private nav: RouterExtensions,private page:Page, private zone :NgZone ){
    
    page.actionBarHidden = true;
    
    this.user = new User();
    var del = this;
    this.page.on("navigatedTo", function(args){
      console.log("navigatedTo");
      AwsCognito.getUserDetail(del);
    },null);
  }

  ngOnInit(){

     //var userName: string;
     //this.router.params.subscribe(params => userName = params['userName']);
     //this.user = MainComponent.userMap.get(userName);
     console.log("onInit");
     //AwsCognito.getUserDetail(this);
     
  }

  signOut(){   
    AwsCognito.signOut();
    AwsCognito.getUserDetail(this);
    
  }

  onError(error:String){
    alert(error);
  }
  onSuccess(result:any){
      console.log("main onSuccess");
      console.dir(result);
      console.log(result.get("email"));
      this.zone.run(()=>{
        this.user = new User();
        this.user.email = result.get("email");
        this.user.givenName = result.get("given_name");
        this.user.lastName = result.get("family_name");
        this.user.userName = result.get("userName");
      })

  }
}