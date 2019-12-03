import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject,combineLatest } from 'rxjs';
import { DecimalPipe } from '@angular/common';
export const EMPLEADOS_COLLECTION = "empleados"
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  $empleados: BehaviorSubject<Empleado[]> = new BehaviorSubject(null);
  $filterTerm: BehaviorSubject<string> = new BehaviorSubject(null);
  // private empleadosMap=new Map<string,Empleado>();
  constructor(private afs: AngularFirestore) {
    //Combina los ultmos valores de dos o mas observables
    combineLatest(this.afs.collection<Empleado>(EMPLEADOS_COLLECTION).valueChanges(),this.$filterTerm).subscribe(
      ([empleados,filterTerm]) => {
        let filteredEmpleados = (filterTerm) ? this.filterEmpleados(empleados,filterTerm) : empleados
        this.$empleados.next(filteredEmpleados)
      }
    )
  }

  getEmpleados() {
    return this.$empleados;
  }

  existeEmpleadoConDni(dni: number) {
    return this.afs.collection<Empleado>(EMPLEADOS_COLLECTION,ref => ref.where('dni','==',dni)).get()
  }

  addEmpleado(empleado: Empleado) {
    return new Promise(async (resolve,reject) => {
      let doc = await this.afs.collection<Empleado>(EMPLEADOS_COLLECTION)
        .doc(empleado.dni.toString())
        .set({ ...empleado,id: empleado.dni });
      resolve();
    })
  }

  filterEmpleados(empleados: Empleado[],filterTerm: string) {
    return empleados.filter(empleado => {
      const term = filterTerm.toLowerCase();

      return empleado.nombre.toLowerCase().includes(term)
        || empleado.apellido.toLowerCase().includes(term)
        || empleado.email.toLowerCase().includes(term)
        || empleado.dni.toString().includes(term)
        || empleado.telefono.toString().includes(term)
    });
  }

  updateEmpleado(empleado: Empleado) {
    return new Promise(async (resolve,reject) => {
      await this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id.toString()).update(empleado);
      resolve()
    })
  }

  deleteEmpleado(empleado: Empleado) {
    this.afs.collection(EMPLEADOS_COLLECTION).doc(empleado.id.toString()).delete();
  }
}
