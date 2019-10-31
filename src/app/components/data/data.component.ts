import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { reject } from "q";

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
    correo: "d@d.com",
    pasatiempos: ["Correr", "Comer", "Dormir"]
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      nombrecompleto: new FormGroup({
        nombre: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ]),

        apellido: new FormControl("", [Validators.required, this.nobc])
      }),

      correo: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      pasatiempos: new FormArray([
        new FormControl("Correr", Validators.required)
      ]),
      username: new FormControl("", Validators.required, this.existeUsuario),
      password1: new FormControl("", Validators.required),
      password2: new FormControl()
    });

    // this.forma.setValue(this.usuario);
    this.forma.controls["password2"].setValidators([
      Validators.required,
      Validators.minLength(1),
      this.noIgual.bind(this.forma)
    ]);
    // en Vez de status changes, se pueede usar valuechanges la diferencia es que status te comrueba si es valido o no, y valio solo teinforma de cambio de valor
    this.forma.controls["username"].statusChanges.subscribe(data => {
      console.log(data);
    });
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    // reset de datos
    // this.forma.reset({
    //   nobrecompleto: {
    //     nombre: "",
    //     apellido: ""
    //   },
    //   correo: ""
    // });
  }
  agregarPasatiepo() {
    (<FormArray>this.forma.controls["pasatiempos"]).push(
      new FormControl("", Validators.required)
    );
  }

  nobc(control: FormControl): { [s: string]: boolean } {
    if (control.value === "bc") {
      return {
        nobc: true
      };
    }
    return null;
  }
  noIgual(control: FormControl): { [s: string]: boolean } {
    // console.log(this);
    let forma: any = this;
    if (control.value !== forma.controls["password1"].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "daboca") {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
  }
}
