export interface Empleado {
  id?:string;
  apellido: string;
  nombre: string;
  email:string,
  direccion: string;
  dni: number;
  rol: string;
  telefono: number;
}

export const defaultEmpleado:Empleado={
  apellido:'',
  nombre:'',
  email:'',
  direccion:'',
  rol: '',
  dni:null,
  telefono:null
}
