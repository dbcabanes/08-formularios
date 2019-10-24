import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styles: [
    `
      .was-validated.ng-invalid.ng-touched: not(form) {

      }
    `
  ]
})
export class TemplateComponent implements OnInit {
  validado: boolean = false;
  usuario = {
    nombre: null,
    apellido: null,
    correo: null,
    paises: "",
    sexo: "hombre"
  };
  paises = [
    {
      codigo: "CRI",
      nombre: "Costa Rica"
    },
    {
      codigo: "ESP",
      nombre: "España"
    }
  ];
  sexos: string[] = ["Hombre", "Mujer", "No se sae"];

  constructor() {}

  ngOnInit() {}
  guardar(forma: any) {
    console.log(forma);
    console.log(this.usuario);
  }
}
