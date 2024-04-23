import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

// choix formulaire
connexion: boolean=true;
inscripton: boolean=false;
forgot_password: boolean=false;

afficherFrmConnexion(){
  this.connexion=true;
  this.inscripton=false;
  this.forgot_password=false;
}
afficherFrmInscription(){
  this.connexion=false;
  this.inscripton=true;
  this.forgot_password=false;
}
afficherFrmForgot(){
  this.connexion=false;
  this.inscripton=false;
  this.forgot_password=true;
}

}
