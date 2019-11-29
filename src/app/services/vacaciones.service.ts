import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vacacion } from '../interfaces/vacacion.interface';
export const VACACIONES_COLLECTION="vacaciones"
@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  constructor(private afs:AngularFirestore) { }

  getVacaciones(){
    return this.afs.collection<Vacacion>(VACACIONES_COLLECTION).valueChanges()
  }

  addVacacion(vacacion:Vacacion){
    return new Promise(async (resolve,reject)=>{
      let doc=await this.afs.collection(VACACIONES_COLLECTION).add(vacacion);
      //Obtiene el id del doc y lo setea como propiedad a fin de editar el documento después
      this.afs.collection(VACACIONES_COLLECTION).doc(doc.id).update({id:doc.id});
      resolve();
    })
  }
}
