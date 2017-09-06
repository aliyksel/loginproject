import { Component , OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {User} from "../../././models/user";
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";

@Component({
  selector: "mainpage",
  templateUrl: "pages/main/main.component.html",
  styleUrls: []
})
export class MainComponent implements OnInit  {

  static userMap : Map<string,User> ;
  
  user:User;
  constructor(private router:ActivatedRoute, private nav: RouterExtensions, page:Page ){
    if(!MainComponent.userMap){
      MainComponent.userMap = new Map<string,User>();
    }
    page.actionBarHidden = true;
  }

  ngOnInit(){

     var userName: string;
     this.router.params.subscribe(params => userName = params['userName']);
     this.user = MainComponent.userMap.get(userName);
  }

  signOut(){   
     this.nav.backToPreviousPage();
  }
}