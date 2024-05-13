import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { User } from '../../services/users.types';
import { UsersService } from '../../services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  users: User[] = [];
  filteredUsers: User[] = [];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    // Get the users
    this._usersService.users$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: User[] | null) => {
        if (data) this.users = this.filteredUsers = data;
        console.log(this.users);
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
}