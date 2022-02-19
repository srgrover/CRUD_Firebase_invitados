import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanUserGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.isLoggedIn()
  }
}