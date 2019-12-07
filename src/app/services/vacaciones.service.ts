import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vacacion } from '../interfaces/vacacion.interface';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DateRange } from '../interfaces/date-range.interface';
import * as moment  from 'moment'

export const VACACIONES_COLLECTION = "vacaciones"
export interface FilterVacaciones extends DateRange {
  filterString: string;
}

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {
  $filter = new BehaviorSubject<FilterVacaciones>(null);
  $vacaciones: BehaviorSubject<Vacacion[]> = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore) {
    combineLatest(this.afs.collection<Vacacion>(VACACIONES_COLLECTION).valueChanges(), this.$filter).subscribe(
      ([vacaciones, filter]) => {
        let filteredVacaciones = (filter) ? this.filterVacaciones(vacaciones, filter) : vacaciones
        this.$vacaciones.next(filteredVacaciones)
      }
    )
  }

  filterVacaciones(vacaciones: Vacacion[], filter: FilterVacaciones) {
    return vacaciones.filter(vacacion => {
      const term = filter.filterString.toLowerCase();

      return vacacion.descripcion.toLowerCase().includes(term)
        && ( moment(vacacion.fecha_inicio).isSameOrBefore(filter.toDate) || moment(vacacion.fecha_fin).isSameOrAfter(filter.fromDate))
    });
  }

  getVacaciones() {
    return this.$vacaciones;
  }

  addVacacion(vacacion: Vacacion) {
    return new Promise(async (resolve, reject) => {
      let doc = await this.afs.collection(VACACIONES_COLLECTION).add(vacacion);
      //Obtiene el id del doc y lo setea como propiedad a fin de editar el documento después
      this.afs.collection(VACACIONES_COLLECTION).doc(doc.id).update({ id: doc.id });
      resolve();
    })
  }

  editVacacion(vacacion: Vacacion) {
    return new Promise(async (resolve, reject) => {
      await this.afs.collection(VACACIONES_COLLECTION).doc(vacacion.id).update(vacacion);
      resolve()
    })
  }

  deleteVacacion(vacacion: Vacacion) {
    this.afs.collection(VACACIONES_COLLECTION).doc(vacacion.id).delete()
  }
}
