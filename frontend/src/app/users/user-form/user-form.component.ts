import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../types/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule,NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);
  userForm: FormGroup = this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    age: ['',[Validators.required,Validators.min(0),Validators.max(100)]],
    address: [''],
    password: ['',[Validators.required,Validators.minLength(8)]],
  });

  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editUserId!: string;
  

  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
   
    if (this.editUserId){ 
      this.userService.getUser(this.editUserId).subscribe((result) => {
        this.userForm.patchValue(result);
        
      });
      console.log(this.editUserId);
      
    }
    
  }

  addUser() {
    if (this.userForm.invalid) {
      alert('Please provide all fields with valid data');
      return;
    }

    const model: User = this.userForm.value;
    this.userService.addUser(model).subscribe((result) => {
      alert('User added successfully.');
      this.router.navigateByUrl('/');
    });
  }
  updateUser() {
   
    const model: User = this.userForm.value;
    this.userService.updateUser(this.editUserId,model).subscribe((result)=> {
      alert('User updated successfully.');
      this.router.navigateByUrl('/');
    });

    if (this.userForm.invalid) {
      alert('Please provide all fields with valid data');
      return;
    }
   
  }
 
}
