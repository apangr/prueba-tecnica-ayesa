import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { users } from './data';
import { User } from './users.types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _users: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);
  private _user: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

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

  /**
   * Get user by id
   * @param id
   */
  getUserById(id: string) {
    return of(users).pipe(
      map((users) => {
        const user = users.find((user) => user.id === id);
        this._user.next(user);
        return user;
      }),
      switchMap((user: any) => {
        if (!user) {
          return throwError(() => new Error('User not found'));
        }

        return of(user);
      })
    );
  }

  /**
   * Getter for user
   */
  get user$() {
    return this._user.asObservable();
  }

  createUser(user: any) {
    users.push({
      id: (users.length + 1).toString(),
      name: user.name,
      surname: user.surname,
      secondSurname: user.secondSurname,
      nifPassport: user.nifPassport,
      gender: user.gender,
      type: user.companyName ? 'Employee' : 'Plaintiffs',
      address: {
        city: user.city,
        door: user.door,
        number: user.number,
        postalCode: user.postalCode,
        street: user.street,
      },
      birthdate: user.birthdate,
    });
  }

  deleteUser(user: User) {
    const index = users.indexOf(user);
    users.splice(index, 1);
  }
}
