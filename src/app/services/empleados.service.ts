import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { AngularFirestore } from '@angular/fire/firestore';
export const EMPLEADOS_COLLECTION="empleados"
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  
  constructor(private afs:AngularFirestore) { }

  getEmpleados(){
    return this.afs.collection<Empleado>(EMPLEADOS_COLLECTION).valueChanges();
  }

  addEmpleado(empleado:Empleado){
    return new Promise(async (resolve,reject)=>{
      let doc=await this.afs.collection(EMPLEADOS_COLLECTION).add(empleado);
      //Obtiene el id del doc y lo setea como propiedad a fin de editar el documento después
      this.afs.collection(EMPLEADOS_COLLECTION).doc(doc.id).update({id:doc.id});
      resolve();
    })
  }

  updateEmpleado(empleado:Empleado){
    return new Promise(async (resolve,reject)=>{
      await this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id).update(empleado);
      resolve()
    })
  }

  deleteEmpleado(empleado){
    this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id).delete()
  }
}
