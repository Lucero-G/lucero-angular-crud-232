import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../modelos/contacto';
import { Observable, tap } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  readonly BASE_URL: string = 'http://137.184.120.127:5000';
  //creamos un objeto de la clase Subject para aplicar el patrón observable
  private contactoAgregadoSubject = new Subject<void>();
  contactoAgregado$ = this.contactoAgregadoSubject.asObservable();


  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.BASE_URL}/contactos`);
  }

  registrarContacto(form: any) {
    // Emite un evento para notificar a otros componentes.
    return this.http.post(`${this.BASE_URL}/new`, form).pipe(
      tap(() => {
        // Emite el evento después de que la solicitud haya tenido éxito.
        this.contactoAgregadoSubject.next();
      })
    );
  }
}
