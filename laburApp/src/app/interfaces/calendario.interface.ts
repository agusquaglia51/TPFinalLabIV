export interface Evento {
    id: number;
    calendario_id: number;
    fecha: string; // Usamos string para las fechas y horas, ya que vienen como strings del backend
    hora_inicio: string;
    hora_fin: string;
    estado: string;
  }
  

export interface Calendario {
    id: number;
    usuario_id: number;
    eventos: Evento[];
  }
  