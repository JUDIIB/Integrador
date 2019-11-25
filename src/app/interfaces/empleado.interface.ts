export interface Empleado {
  apeliido: string;
  nombre: string;
  direccion: string;
  dni: number;
  telefono: number;
}

export const defaultEmpleado:Empleado={
  apeliido:'',
  nombre:'',
  direccion:'',
  dni:null,
  telefono:null
}
