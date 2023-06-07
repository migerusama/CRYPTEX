import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private collectionInstance = collection(this.firestore, 'users')

  constructor(
    private firestore: Firestore
  ) { }

  addUserDoc(user: User) {
    return addDoc(this.collectionInstance, { ...user })
  }

  setUserDoc(user: User) {
    let nUser: any = user
    nUser.wallet = Object.fromEntries(user.wallet)
    return setDoc(doc(this.firestore, 'users', user.email), { ...user })
  }

  getAllUserDocs() {
    return collectionData(this.collectionInstance)
  }

  getDocByUser(id: string) {
    return docData(doc(this.collectionInstance, id))
  }

  updateDocUser(id: any, user: User) {
    const docInstance = doc(this.firestore, 'users', id)
    return updateDoc(docInstance, { ...user })
  }

}
