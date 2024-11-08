import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reseña } from "../interfaces/resenia.interface";
import { environment } from "../../enviroments/enviroments";

@Injectable({
  providedIn: "root",
})
export class ReseñasService {
  private apiUrl = `${environment.LOCAL_API_URL}/resenas`; // Cambia al endpoint de FastAPI

  constructor(private http: HttpClient) {}

  obtenerReseñas(servicio_id: number): Observable<Reseña[]> {
    return this.http.get<Reseña[]>(`${this.apiUrl}/${servicio_id}`);
  }

  agregarReseña(reseña: Reseña): Observable<Reseña> {
    return this.http.post<Reseña>(this.apiUrl, reseña);
  }
}
