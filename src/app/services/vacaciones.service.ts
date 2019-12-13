import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vacacion } from '../interfaces/vacacion.interface';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DateRange } from '../interfaces/date-range.interface';
import * as moment from 'moment'

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
      // console.log(filter);
      const dni = (filter.filterString)?filter.filterString.toString():'';
      const includesNoEmptyDNI = (filter.filterString != '') ? vacacion.empleado_id.includes(dni) : true;

      const vacacionInFilterRange=moment(vacacion.fecha_inicio).isBetween(filter.fromDate,filter.toDate, null, '[]') || moment(vacacion.fecha_fin).isBetween(filter.fromDate,filter.toDate, null, '[]');
      const filterInVacationRange=moment(filter.fromDate).isBetween(vacacion.fecha_inicio,vacacion.fecha_fin, null, '[]') || moment(filter.toDate).isBetween(vacacion.fecha_inicio,vacacion.fecha_fin, null, '[]');
      // Condicion Alternativa
      /* VFI:Vacacion Fecha Inicio; VFF:Vacacion Fecha Fin; */
      /* FFI:Filtro Fecha Inicio; FFF:Filtro Fecha Fin; */
      /* const vacacionInRange =
        // VFI--[FFI--VFF--FFF]
        (moment(vacacion.fecha_inicio).isSameOrBefore(filter.toDate) && moment(vacacion.fecha_fin).isSameOrAfter(filter.fromDate))
        // [FFI--VFI--FFF]--VFF
        || (moment(vacacion.fecha_inicio).isSameOrBefore(filter.toDate) && moment(vacacion.fecha_fin).isSameOrAfter(filter.toDate))
        // [FFI--VFI--VFF--FFF]
        || (moment(vacacion.fecha_inicio).isSameOrAfter(filter.fromDate) && moment(vacacion.fecha_fin).isSameOrBefore(filter.fromDate))
        // VFI--[FFI--FFF]--VFF
        || (moment(vacacion.fecha_inicio).isSameOrBefore(filter.fromDate) && moment(vacacion.fecha_fin).isSameOrAfter(filter.toDate)); */
      return includesNoEmptyDNI && (vacacionInFilterRange || filterInVacationRange)
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
