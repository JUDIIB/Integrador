import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {
  empleados: Observable<Empleado[]>;
  constructor(db: AngularFirestore){
    this.empleados = db.collection<Empleado>('empleados').valueChanges();
  }
  ngOnInit() {
  }

}
