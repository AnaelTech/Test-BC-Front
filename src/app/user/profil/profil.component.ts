import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent implements OnInit {
  private userService: UserService = inject(UserService);
  public user = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    picture: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUserById().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
    });
  }
}
