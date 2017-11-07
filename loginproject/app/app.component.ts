import { Component, OnInit } from "@angular/core";
import {AwsCognito} from "nativescript-aws-cognito";
import { RouterExtensions } from "nativescript-angular/router";
import {CognitoIdentityInteractiveAuthenticationDelegateImpl} from "./aws/CognitoIdentityInteractiveAuthenticationDelegateImpl";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit{

    constructor(private nav:RouterExtensions){

    }

    ngOnInit(){
         var cognitoIdentityInteractiveAuthenticationDelegateImpl:CognitoIdentityInteractiveAuthenticationDelegateImpl;
         cognitoIdentityInteractiveAuthenticationDelegateImpl = new CognitoIdentityInteractiveAuthenticationDelegateImpl(this.nav);

         // you must enter your values.
        AwsCognito.createUserPool("", "", "", "", cognitoIdentityInteractiveAuthenticationDelegateImpl);
    }
 }