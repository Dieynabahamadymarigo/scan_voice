import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { ScanService } from '../scan.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private authService: ScanService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
