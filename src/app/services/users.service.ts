import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { users } from './data';
import { User } from './users.types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _users: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);
  getUsers(): Observable<User[]> {
    return of(users).pipe(
      tap((response: User[]) => {
        this._users.next(response);
      })
    );
  }

  /**
   * Getter for users
   */
  get users$() {
    return this._users.asObservable();
  }
}
