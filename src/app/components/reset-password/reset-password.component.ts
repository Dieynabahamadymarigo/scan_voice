import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  emailCon: string = '';
  passwordCon: string = '';

  // Variables pour faire la vérifications
  verifEmailCon: string = '';
  verifPasswordCon: string = '';

  // Variables si les champs sont exacts
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;

  token: string = '';

  constructor(private route: ActivatedRoute, private connectez: ScanService) {}

  ngOnInit(): void {
    // this.reinitialierFonction();
  }
  // reinitialierFonction() {
  //   this.route.queryParams.subscribe((params) => {
  //     this.token = params['token'];
  //     // Vous pouvez maintenant utiliser ce token pour vérifier l'utilisateur et permettre la réinitialisation du mot de passe
  //     console.log(this.token);
  //   });
  // }

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

  // Methode pour réinitialiser le mot de passe
  resetPasswordFonction(): void {
    // if (this.validateEmail(this.emailCon)) {
    //   // Effectuer la connexion
      let token = this.token;
      let password = this.passwordCon;

    //   this.verifPasswordConFonction();
    //   this.verifEmailConFonction();

        this.route.queryParams.subscribe((params) => {
          token = params['token'];
          // Vous pouvez maintenant utiliser ce token pour vérifier l'utilisateur et permettre la réinitialisation du mot de passe
          console.log(this.token);
        // });

      this.connectez.resetPassword({ token: token, password: password })
        .subscribe((rep: any) => {
          console.log('reset Password', rep);
          // localStorage.setItem('userConnect', rep.token);
          alert(rep.message);
          // this.router.navigate(['/home']);
          this.viderChamps();
        });
        });
    // }
  }

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
  // Ajoutez la logique pour réinitialiser le mot de passe ici
}
