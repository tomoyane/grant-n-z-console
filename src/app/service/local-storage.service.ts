import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static AUTH_COOKIE = 'grantnz_auth';
  static CLIENT_SECRET = 'client_secret';
  static GROUP_ID = 'group_id';

  /**
   * Constructor.
   *
   * @param cookieService CookieService
   */
  constructor(private cookieService: CookieService) {
  }

  public clearCookie() {
    this.cookieService.deleteAll();
  }

  public setAuthCookie(token: string) {
    this.cookieService.set(LocalStorageService.AUTH_COOKIE, token, null, '/', environment.hostname, false, 'Strict');
  }

  public getAuthCookie(): string {
    return this.cookieService.get(LocalStorageService.AUTH_COOKIE);
  }

  public setClientSecretCookie(ClientSecret: string) {
    this.cookieService.set(LocalStorageService.CLIENT_SECRET, ClientSecret, null, '/', environment.hostname, false, 'Strict');
  }

  public getClientSecretCookie(): string {
    return this.cookieService.get(LocalStorageService.CLIENT_SECRET);
  }

  public setGroupIdCookie(groupId: number) {
    this.cookieService.set(LocalStorageService.GROUP_ID, groupId.toString(), null, '/', environment.hostname, false, 'Strict');
  }

  public getGroupIdCookie(): string {
    return this.cookieService.get(LocalStorageService.GROUP_ID);
  }

  public getUsername(): string {
    const token = this.cookieService.get(LocalStorageService.AUTH_COOKIE);
    if (token === null || token === '') {
      return null;
    }

    const payload = token.split('.')[1];
    if (payload === null || payload === '') {
      this.clearCookie();
      return null;
    }

    const authUser = atob(payload);
    return JSON.parse(authUser).username;
  }
}
