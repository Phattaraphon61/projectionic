import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class crudapi {

    constructor(private fs: AngularFirestore) { }

    //CRUD
    //read
    readData() {
        return this.fs.collection('data').snapshotChanges();

    }


    createData(data:any){
      return this.fs.collection('data').add(data)
    }

   updateData(data:any){
    return this.fs.doc('data/'+data.id).update({name:data.name,topic:data.topic,detail:data.detail})
   }

   delete(id:any){
     return this.fs.doc("data/"+id).delete();
   }

}
