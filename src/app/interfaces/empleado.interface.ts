export interface Empleado {
  id?:string;
  apellido: string;
  nombre: string;
  direccion: string;
  dni: number;
  telefono: number;
}

export const defaultEmpleado:Empleado={
  apellido:'',
  nombre:'',
  direccion:'',
  dni:null,
  telefono:null
}
