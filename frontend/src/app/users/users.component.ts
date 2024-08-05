import { Component, Inject, OnInit } from '@angular/core';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'], 
})
export class UsersComponent {
  users: User[] = [];
  userService: UserService;

  constructor(@Inject(UserService) userService: UserService) {
    this.userService = userService;
  }

  delete(id: string) {
    
    const ok = confirm("Sure you want to delete?");
    if (ok) {
      this.userService.deleteUser(id).subscribe({
        next: (result) => {
          console.log(result); 
          // Fetch the updated list of users
          this.userService.getUsers().subscribe(updatedUsers => {
            this.users = updatedUsers;
          });
        },
        error: (error) => {
          console.error("Error deleting user:", error);
        }
      });
    }
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
      
    });
  }
}