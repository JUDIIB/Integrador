export interface Empleado {
  id?:string;
  apellido: string;
  nombre: string;
  email:string,
  direccion: string;
  dni: number;
  telefono: number;
}

export const defaultEmpleado:Empleado={
  apellido:'',
  nombre:'',
  email:'',
  direccion:'',
  dni:null,
  telefono:null
}
