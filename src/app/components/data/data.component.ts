import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styles: []
})
export class DataComponent {
  forma: FormGroup;

  usuario: Object = {
    nombrecompleto: {
      nombre: "Daniel",
      apellido: "BC"
    },
    correo: "d@d.com"
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      nombrecompleto: new FormGroup({
        nombre: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ]),

        apellido: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ])
      }),

      correo: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ])
    });
  }
  guardarCambios() {
    console.log(this.usuario);

    console.log(this.forma);
  }
}
