import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User as UserAuth } from 'firebase/auth';
import { FirebaseStorageService } from 'src/app/services/firebase/firebase-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User()
  userAuth!: UserAuth
  selectedImage: File | null = null;

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
    private fbStorageService: FirebaseStorageService,
    // private fs: AngularFirestore,
    // private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.userAuth = this.auth.getCurrentUser()!
    if (this.userAuth && this.userAuth.email) {
      this.fbStorageService.getDocByUser(this.userAuth.email).subscribe((data) => {
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
    // if (this.selectedImage) {
    //   const filePath = `images/${this.userAuth.uid}`;
    //   const fileRef = this.storage.ref(filePath);
    //   const task = this.storage.upload(filePath, this.selectedImage);
    //   task.snapshotChanges().pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe(url => {
    //         console.log('URL de descarga:', url);
    //         // Aquí puedes realizar acciones adicionales con la URL, como guardarla en una base de datos
    //         const userDoc = this.fs.collection('users').doc(this.userAuth.uid);
    //         userDoc.set({ imageUrl: url }, { merge: true })
    //           .then(() => {
    //             console.log('URL de descarga guardada en Firestore');
    //           })
    //           .catch(error => {
    //             console.error('Error al guardar la URL de descarga en Firestore', error);
    //           });
    //       });
    //     })
    //   ).subscribe();
    // }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

} 
