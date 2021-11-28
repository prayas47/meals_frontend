import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,	Router,	RouterStateSnapshot,} from "@angular/router";
import { TokenStorageService } from "../services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private tokenService: TokenStorageService,
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		let isAuthenticated :boolean
    this.tokenService.getToken() ? isAuthenticated = true : isAuthenticated = false;
		if (!isAuthenticated) {
			this.router.navigate(['/auth']);
		}
		return isAuthenticated;
	}
}
