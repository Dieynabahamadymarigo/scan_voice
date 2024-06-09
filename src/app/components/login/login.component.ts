import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // choix formulaire
  connexion: boolean = true;
  inscripton: boolean = false;
  forgot_password: boolean = false;

  afficherFrmConnexion() {
    this.connexion = true;
    this.inscripton = false;
    this.forgot_password = false;
  }
  afficherFrmInscription() {
    this.connexion = false;
    this.inscripton = true;
    this.forgot_password = false;
  }
  afficherFrmForgot() {
    this.connexion = false;
    this.inscripton = false;
    this.forgot_password = true;
  }

  ngOnInit(): void {
    this.user();
  }

  constructor(private router: Router, private connectez: ScanService) {}

  // les variables
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  telephone: string = '';
  address: string = '';

  emailCon: string = '';
  passwordCon: string = '';

  // Variables pour faire la vérifications
  verifNom: string = '';
  verifPrenom: string = '';
  verifEmail: string = '';
  verifPassword: string = '';
  verifPasswordConf: string = '';
  verifAdresse: string = '';
  verifTelephone: string = '';

  verifEmailCon: string = '';
  verifPasswordCon: string = '';

  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactPrenom: boolean = false;
  exactEmail: boolean = false;
  exactPassword: boolean = false;
  exactAdresse: boolean = false;
  exactTelephone: boolean = false;

  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;

  // Verification du nom
  verifNomFonction() {
    if (this.nom == '') {
      this.verifNom = '';
    }
    // Vérifie si le nom contient uniquement des espaces
    else if (/^\s+$/.test(this.nom)) {
      this.verifNom = '';
    } else {
      if (this.nom.length < 2) {
        this.exactNom = false;
        this.verifNom = 'court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.nom)) {
        // Utilisation de l'expression régulière
        this.exactNom = false;
        this.verifNom = 'Nom invalide';
      } else {
        this.exactNom = true;
        this.verifNom = ' Correct';
      }
    }
  }

  // Verification du nom
  verifPreomFonction() {
    if (this.prenom == '') {
      this.verifPrenom = '';
    }
    // Vérifie si le prenom contient uniquement des espaces
    else if (/^\s+$/.test(this.prenom)) {
      this.verifPrenom = '';
    } else {
      if (this.prenom.length < 3) {
        this.exactPrenom = false;
        this.verifPrenom = 'court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.prenom)) {
        // Utilisation de l'expression régulière
        this.exactPrenom = false;
        this.verifPrenom = 'Prenom invalide';
      } else {
        this.exactPrenom = true;
        this.verifPrenom = ' Correct';
      }
    }
  }

  // Verification de  l'email
  verifEmailFonction() {
    if (this.email == '') {
      this.verifEmail = '';
    } else {
      if (this.validateEmail(this.email) == true) {
        this.exactEmail = true;
        this.verifEmail = 'e-mail valide';
        console.log(this.verifEmail);
      }

      if (this.validateEmail(this.email) == false) {
        this.exactEmail = false;
        this.verifEmail = 'e-mail invalide';
        console.log(this.verifEmail);
      }
    }
  }

  // Verification du mot de passe
  verifPasswordFonction() {
    if (this.password == '') {
      this.verifPassword = '';
    }
    // Vérifie si le password contient uniquement des espaces
    else if (/^\s+$/.test(this.password)) {
      this.verifPassword = '';
    } else {
      if (this.password.length < 8) {
        const passwordRegex =
          /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/;
        this.exactPassword = false;
        this.verifPassword = 'Le Mot de passe est trop court';
      } else {
        this.exactPassword = true;
        this.verifPassword = 'Mot de Passe Correcte';
      }
    }
    // this.viderChamps();
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  // Verification du adresse
  verifAdresseFonction() {
    if (this.address == '') {
      this.verifAdresse = '';
    }
    // Vérifie si le adresse contient uniquement des espaces
    else if (/^\s+$/.test(this.address)) {
      this.verifAdresse = '';
    } else {
      if (this.address.length < 5) {
        this.exactAdresse = false;
        this.verifAdresse = 'court';
      }
      // else if (!/^[a-zA-Z\s]+$/.test(this.address))
      else if (!/^[a-zA-Z\s]+[A-Za-z0-9\.-]+[A-Za-z]+$/.test(this.address)) {
        // Utilisation de l'expression régulière
        this.exactAdresse = false;
        this.verifAdresse = 'Adresse invalide';
      } else {
        this.exactAdresse = true;
        this.verifAdresse = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification du telephone
  verifTelephoneFonction() {
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
    // Vérifie si le numéro de téléphone commence par 77, 78, 76 ou 70
    else if (!/^(77|78|76|70)\d{7}$/.test(this.telephone)) {
      this.exactTelephone = false;
      // this.verifTelephone = 'Le numéro doit commencer par 77, 78, 76 ou 70 ';
      this.verifTelephone = 'Numéro invalide';
    }
    // Vérifie si le numéro de téléphone contient exactement 9 chiffres
    else if (!/^\d{9}$/.test(this.telephone)) {
      this.exactTelephone = false;
      this.verifTelephone = 'Numéro invalide';
    } else if (this.telephone.length < 9) {
      this.exactTelephone = false;
      this.verifTelephone = 'court';
    } else {
      this.exactTelephone = true;
      this.verifTelephone = ' Correct';
    }
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
  user: any = [];

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
            localStorage.setItem('userConnect', JSON.stringify(rep.user));
            this.user = rep.user;
            if (this.user && this.user.nom) {
              // alert(`Bienvenue ${this.user.prenom}  ${this.user.nom}!`);
            }
            this.router.navigate(['/home']);
            this.viderChamps();
          }
        });
    }
  }

  // Methode pour s'inscrire
  signUpFonction(): void {
    let users = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      address: this.address,
      telephone: this.telephone,
    };
    console.log('users', users);

    this.connectez.signUp(users).subscribe((rep) => {
      if (rep.status == false) {
        console.log('email existe déjà', rep.message);
        // alert(rep.message);
        this.verification(
          'Erreur de validation',
          'Email existe déjà dans notre plateforme',
          'error'
        );
      } else {
        console.log('felicitation', rep);
        this.router.navigate(['/login']);
        this.viderChamps();
      }
    });
  }

  // Methode pour réinitialiser le mot de passe
  forgotPasswordFonction(): void {
    if (this.validateEmail(this.emailCon)) {
      // Effectuer la connexion
      let email = this.emailCon;
      let password = this.passwordCon;

      this.verifPasswordConFonction();
      this.verifEmailConFonction();

      this.connectez
        .forgotPassword({ email: email, password: password })
        .subscribe((rep: any) => {
          console.log('forgot Password', rep);
          // localStorage.setItem('userConnect', rep.token);
          // alert(rep.message);
          this.verification(
            'Un email vous y ai envoyé',
            "Veuilez vérifier votre boite d'email",
            'success'
          );
          // this.router.navigate(['/home']);
          this.viderChamps();
        });
    }
  }

  // Methode pour vider les champs
  viderChamps() {
    // On vide les valeurs des champs input
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.password = '';
    this.address = '';
    this.telephone = '';
    this.emailCon = '';
    this.passwordCon = '';
    // -----------------------------------
    this.verifNom = '';
    this.verifPrenom = '';
    this.verifEmail = '';
    this.verifPassword = '';
    this.verifAdresse = '';
    this.verifTelephone = '';
    this.verifEmailCon = '';
    this.verifPasswordCon = '';
    // --------------------------------------
    this.exactNom = false;
    this.exactPrenom = false;
    this.exactEmail = false;
    this.exactEmailCon = false;
    this.exactPassword = false;
    this.exactPasswordCon = false;
    this.exactAdresse = false;
    this.exactTelephone = false;
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
