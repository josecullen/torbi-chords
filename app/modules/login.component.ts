import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/models'
import {MdIconRegistry} from "@angular/material";


@Component({
  moduleId: module.id, 
  template: `
<div class="centered-container">
    <md-card class="card-container">
      <md-card-subtitle></md-card-subtitle>
      <md-card-title>Ingreso a Torbi Chords</md-card-title>   
        <md-card-content>
          

          <md-tab-group (selectChange)="onTabChange($event)">
            <md-tab label="Ingresá">
                <md-input 
                  placeholder="usuario" maxlength="20" 
                  class="full-width"    required
                  [(ngModel)]="user.username"
                  (change)="userValid()">
                  <span md-suffix>
                    <md-icon *ngIf="usernameValid" style="color:#AED581;">check_circle</md-icon>
                    <md-icon *ngIf="!usernameValid && usernameValid != undefined" style="color:#921919;">error</md-icon>
                  </span>
                  <md-hint align="end" style="color:#921919;">{{messages.userMessage}}</md-hint>
                </md-input>
                <br>
                <md-input 
                  placeholder="password" maxlength="20" 
                  type="password" class="full-width"
                  required
                  [(ngModel)]="user.password">
                </md-input>
            </md-tab>
            <md-tab label="Registrate">
                <md-input 
                  placeholder="usuario" maxlength="20" 
                  class="full-width"    required
                  [(ngModel)]="user.username"
                  (change)="userValid()">
                  <span md-suffix>
                    <md-icon *ngIf="usernameValid" style="color:#AED581;">check_circle</md-icon>
                    <md-icon *ngIf="!usernameValid" style="color:#921919;">error</md-icon>
                  </span>
                  <md-hint align="end" style="color:#921919;">{{messages.userMessage}}</md-hint>
                </md-input>
                <br>
                <md-input 
                  placeholder="password" maxlength="20" 
                  type="password" class="full-width"
                  required
                  [(ngModel)]="user.password">
                </md-input>
            </md-tab>
          </md-tab-group>

          
        </md-card-content>
        <md-card-actions style="text-align:center">
          <button 
            md-raised-button 
            class="width-90"
            (click)="onSubmit()"
            [disabled]="!formIsValid()">ENTRAR</button>
        </md-card-actions>
    </md-card>
</div>
    `,
    styles: [ `
md-icon {
    background-repeat: no-repeat;
    display: inline-block;
    fill: currentColor;
    height: 24px;
    width: 24px;
}


@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v16/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.full-width {
  width:100%;
}

.width-90{
  width:90%;
}
.little-margin {
  margin-left: 5px !important;
  margin-right: 10px !important;
}

.no-padding {
  padding:0px !important;
}

.centered-container{
  text-align: center;
  margin-top: 70px;
  margin-left: 10px;
  margin-right: 10px;
}

div.md-input-suffix{
  text-align: right !important;
}

.card-container {
    margin: 0;
    position: absolute;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%);
}
    
    
    
    
    `
    
    
    
    ],
    viewProviders: [MdIconRegistry]
})
export class LoginComponent {
  user:User = new User()
  tabIndex:number = 0
  usernameValid:boolean = undefined
  messages:any = {
    userMessage: "",
    passMessage: ""
  }

  constructor(
    public  authService   : AuthService, 
    public  router        : Router,
    private mdIconRegistry:MdIconRegistry) {
      
    mdIconRegistry
      .addSvgIcon('thumb-up', '/game-mates/icon/assets/thumbup-icon.svg')
      .addSvgIconSetInNamespace('core', '/game-mates/icon/assets/core-icon-set.svg')
      .registerFontClassAlias('fontawesome', 'fa');
  }
  
  formIsValid(){
    return this.usernameValid
        && this.user.password.length >= 8
        && this.user.password.length <= 20
  }

  onSubmit(){
    this.tabIndex === 0 ? this.login() : this.signUp()
  }

  onTabChange(tab:any){
    this.tabIndex = tab.index
  }
  
 
  signUp(){
    this.authService
        .signup(this.user)
        .subscribe(
          isSignUpOK => isSignUpOK ? this.login() : console.log('signup error')      
        )
  }
  
  login() {
    console.log('login')
    this.authService.login(this.user).subscribe(isValid => {
      console.log(isValid)
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        this.router.navigate([redirect]);
      }
    });
  }
  
  private userValid():boolean{
    let result:boolean = 
    this.user.username.length >= 8
    && this.user.username.length <= 20


    if(result) 
      this.authService.exists(this.user.username).subscribe(res => {
        console.log(res)
        this.tabIndex === 0 
          ? result = res
          : result = !res

        if(!result)
          this.tabIndex === 0 
            ? this.messages.userMessage = "El usuario no existe"
            : this.messages.userMessage = "El usuario ya existe"
        else this.messages.userMessage = "" 
        this.usernameValid = result
      })
    else 
      this.messages.userMessage = "El usuario debe tener entre 8 y 20 caracteres"      
    
    this.usernameValid = result
    return result
  }

}
