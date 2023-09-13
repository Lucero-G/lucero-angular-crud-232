import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Contacto } from './modelos/contacto';
import { ContactoService } from './servicios/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-crud-232';
  contactoArray: Contacto[] = [];
  contactoForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.contactoForm = formbuilder.group({
      fullname: [''],
      phone: [''],
      email: [''],
    });
  }
  ngOnInit(): void {
    this.getContactos(); // Llama a getContactos() al cargar la página inicialmente
    //a la escucha del evento
    this.contactoService.contactoAgregado$.subscribe(() => {
      this.getContactos();
    });
  }

  getContactos(): void {
    this.contactoService.getContactos().subscribe(
      (result: any) => {
        this.contactoArray = result?.contactos;
        console.log(this.contactoArray);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error!',
        });
      }
    );
  }
  registrarContacto(): void {
    this.contactoService.registrarContacto(this.contactoForm.value).subscribe(
      (result: any) => {
        // Muestra un mensaje de éxito usando Sweet Alert
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'El contacto se ha guardado exitosamente.',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar!',
        });
      }
    );
    /*  console.log('llamando a getcontactos');
    this.getContactos(); */
  }
  
  limpiarFormulario(): void {
    // Establece los valores de los campos del formulario en blanco
    this.contactoForm.patchValue({
      fullname: '',
      phone: '',
      email: '',
    });
  }
}
