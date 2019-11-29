import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DecimalPipe } from '@angular/common';
export const EMPLEADOS_COLLECTION="empleados"
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  $empleados:BehaviorSubject<Empleado[]>=new BehaviorSubject(null);
  $filterTerm:BehaviorSubject<string>=new BehaviorSubject(null);
  
  constructor(private afs:AngularFirestore) { 

    combineLatest(this.afs.collection<Empleado>(EMPLEADOS_COLLECTION).valueChanges(), this.$filterTerm).subscribe(
      ([empleados,filterTerm])=>{
        let filteredEmpleados=(filterTerm)?this.filterEmpleados(empleados,filterTerm):empleados
        this.$empleados.next(filteredEmpleados)
      }
    )
  }

  getEmpleados(){
    return this.$empleados;
  }

  addEmpleado(empleado:Empleado){
    return new Promise(async (resolve,reject)=>{
      let doc=await this.afs.collection(EMPLEADOS_COLLECTION).add(empleado);
      //Obtiene el id del doc y lo setea como propiedad a fin de editar el documento después
      this.afs.collection(EMPLEADOS_COLLECTION).doc(doc.id).update({id:doc.id});
      resolve();
    })
  }

  filterEmpleados(empleados:Empleado[],filterTerm:string){
    return empleados.filter(empleado => {
      const term = filterTerm.toLowerCase();
      
      return empleado.nombre.toLowerCase().includes(term)
          || empleado.apellido.toLowerCase().includes(term)
          || empleado.direccion.toLowerCase().includes(term)
          || empleado.dni.toString().includes(term)
          || empleado.telefono.toString().includes(term)
    });
  }

  updateEmpleado(empleado:Empleado){
    return new Promise(async (resolve,reject)=>{
      await this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id).update(empleado);
      resolve()
    })
  }

  deleteEmpleado(empleado:Empleado){
    this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id).delete()
  }
}
