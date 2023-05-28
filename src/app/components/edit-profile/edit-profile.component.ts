import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, doc, docData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { map } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user!: User

  username = ""
  email = ""
  password = ""
  newPassword = ""
  repeatPassword = ""

  errors: { [key: string]: boolean } = {
    username: false,
    email: false,
    password: false,
    newPassword: false,
    repeatPassword: false,
    samePassword: false,
    sameNewPassword: false,
  }

  constructor(
    private auth: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser()
    if (user && user.email) {
      docData(doc(this.firestore, 'users', user.email)).subscribe((data) => {
        this.user = data as User
      })
    }
  }

  onSubmit() {
    this.errors["username"] = this.username === ""
    this.errors["email"] = this.email === ""
    this.errors["password"] = this.password === ""
    this.errors["newPassword"] = this.newPassword === ""
    this.errors["repeatPassword"] = this.repeatPassword === ""
    this.errors["samePassword"] = this.newPassword !== this.repeatPassword
    this.errors["sameNewPassword"] = this.password === this.newPassword
  }

} 
