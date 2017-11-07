import{CognitoIdentityInteractiveAuthenticationDelegate} from "nativescript-aws-cognito";
import { RouterExtensions } from "nativescript-angular/router";

export class CognitoIdentityInteractiveAuthenticationDelegateImpl implements CognitoIdentityInteractiveAuthenticationDelegate{

    constructor(private nav:RouterExtensions){

    }
    
    startPasswordAuthentication(){
        this.nav.navigate(["/login"]);
    }
}