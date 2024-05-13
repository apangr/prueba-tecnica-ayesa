export interface User {
  id: string;
  nifPassport: string;
  name: string;
  surname: string;
  secondSurname?: string;
  gender?: string;
  birthdate?: Date;
  address?: {
    street: string;
    number: string;
    door: string;
    postalCode: string;
    city: string;
  };
  type: UserType;
}

export interface Plaintiffs extends User {
  institutionName?: string;
  title?: string;
  date?: Date;
}

export interface Employee extends User {
  companyName?: string;
  job?: string;
  date?: Date;
}

export type UserType = 'Plaintiffs' | 'Employee';
