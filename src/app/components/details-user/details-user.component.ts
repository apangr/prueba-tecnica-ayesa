import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../services/users.types';
@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.scss',
})
export class DetailsUserComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  user: User = {} as User;
  constructor(
    private _userService: UsersService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // Get the user
    this._userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: User | undefined) => {
        if (user)
          // Get the user
          this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
}
