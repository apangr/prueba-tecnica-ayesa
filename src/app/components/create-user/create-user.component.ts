import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UsersService);

  newUserForm = this.fb.group({
    nifPassport: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    secondSurname: [''],
    gender: [''],
    birthdate: [''],
    street: [''],
    number: [''],
    door: [''],
    postalCode: [''],
    city: [''],
    institutionName: [''],
    title: [''],
    studiesEndDate: [''],
    companyName: [''],
    job: [''],
    date: [''],
  });
  get nifPassport() {
    return this.newUserForm.get('nifPassport');
  }
  get name() {
    return this.newUserForm.get('name');
  }
  get surname() {
    return this.newUserForm.get('surname');
  }
  createUser() {
    this.userService.createUser(this.newUserForm.value);
    this.router.navigate(['/home']);
  }
}
