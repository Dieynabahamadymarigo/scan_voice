import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  user: any = [];

  emailCon: string = '';
  passwordCon: string = '';

  // Variables pour faire la vérifications
  verifEmailCon: string = '';
  verifPasswordCon: string = '';

  // Variables si les champs sont exacts
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;

  constructor(private router: Router, private connectez: ScanService) {}


  ngOnInit(): void {
    this.user();
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }
  // Verification de  l'email du connexion
  verifEmailConFonction() {
    if (this.emailCon == '') {
      this.verifEmailCon = '';
    } else {
      if (this.validateEmail(this.emailCon) == true) {
        this.exactEmailCon = true;
        this.verifEmailCon = 'e-mail valide';
      }

      if (this.validateEmail(this.emailCon) == false) {
        this.exactEmailCon = false;
        this.verifEmailCon = 'e-mail invalide';
      }
    }
  }

  // Verification du mot de passe du connexion
  verifPasswordConFonction() {
    if (this.passwordCon == '') {
      this.verifPasswordCon = '';
    }
    // Vérifie si le password contient uniquement des espaces
    else if (/^\s+$/.test(this.passwordCon)) {
      this.verifPasswordCon = '';
    } else {
      if (this.passwordCon.length < 8) {
        const passwordRegex =
          /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/;
        this.exactPasswordCon = false;
        this.verifPasswordCon = 'court';
      } else {
        this.exactPasswordCon = true;
        this.verifPasswordCon = 'Mot de Passe Correcte';
      }
    }
  }

  // Methode pour se connecter
  login(): void {
    if (this.validateEmail(this.emailCon)) {
      // Effectuer la connexion
      let email = this.emailCon;
      let password = this.passwordCon;

      this.verifPasswordConFonction();
      this.verifEmailConFonction();

      this.connectez
        .connexion({ email: email, password: password })
        .subscribe((rep: any) => {
          if (rep.status == false) {
            console.log('Authentification échouée', rep.message);
            // alert(rep.message);
            this.verification(
              'Erreur de validation',
              'Email ou mot de passe incorrect',
              'error'
            );
          } else {
            console.log('login', rep);
            localStorage.setItem('userToken', rep.token);
            // localStorage.setItem('userConnect', rep.user);
            localStorage.setItem('userConnect', JSON.stringify(rep.user));
            // alert(rep.message);
            // Afficher un message de bienvenue
            this.user = rep.user;
            if (this.user && this.user.nom) {
              alert(`Bienvenue ${this.user.prenom}  ${this.user.nom}!`);
            }

            this.router.navigate(['/home']);
            this.viderChamps();
          }
        });
    }
  }

  // refresh token


  // Methode pour vider les champs
  viderChamps() {
    // On vide les valeurs des champs input
    this.emailCon = '';
    this.passwordCon = '';
    // -----------------------------------
    this.verifEmailCon = '';
    this.verifPasswordCon = '';
    // --------------------------------------
    this.exactEmailCon = false;
    this.exactPasswordCon = false;
  }

  // sweet alert
  verification(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
