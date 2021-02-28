import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User>(new User());

  get user(): Observable<User> {
    return this._user.asObservable();
  }

  loginUser(name: string): Observable<User> {
    return this.user.pipe(
      take(1),
      tap(
        user => {
          this._user.next(new User(name));
        }
      )
    );
  }
}
