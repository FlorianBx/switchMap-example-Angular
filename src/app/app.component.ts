import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private userIdSubject = new Subject<number>();
  userData: User | string = 'ID invalide';

  constructor(private http: HttpClient) {}

  onIdChange(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    if (!id || +id >= 11 || +id <= 0) {
      this.userData = 'ID invalide';
      return;
    }
    this.userIdSubject.next(Number(id));
  }

  ngOnInit() {
    this.userIdSubject
      .pipe(
        switchMap((id) =>
          this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`),
        ),
      )
      .subscribe((user) => (this.userData = user as User));
    this.userIdSubject.next(1);
  }
}
