export interface Event {
    id: number;
    fecha: string;
    hora: string;
    nombre: string;
    descripcion: string;
    categoria: string;
}


export interface PostEvent{
  name: string,
  start_time: string,
  end_time: string
}