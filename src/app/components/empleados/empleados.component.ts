import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { faTrash,faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {
  faTrash=faTrash;
  faUserEdit=faUserEdit;
  empleados: Observable<Empleado[]>;
  constructor(db: AngularFirestore){
    this.empleados = db.collection<Empleado>('empleados').valueChanges();
  }
  ngOnInit() {
  }

}
