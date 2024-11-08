import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuarios } from "../interfaces/users.interfaces";
import { AuthService } from "./auth.services";
import { environment } from "../../enviroments/enviroments";

@Injectable({
  providedIn: "root",
})
export class CompletingUsersService {
  constructor(
    private http: HttpClient,
    private authService: AuthService // Adjust path as needed
  ) {}

  private apiURL = `${environment.LOCAL_API_URL}/usuarios`;

  updateUser(usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(
      this.apiURL + "/" + this.authService.getUserId(),
      usuario
    );
  }
}
