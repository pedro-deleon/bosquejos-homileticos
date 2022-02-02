import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export class Bosquejo{
  public id: string;
  public nombreExpositor: string;
  public titulo: string;
  public fecha: any;
  public tema: string;
  public textoBase: string;
  public introduccion: string[];
  public desarrollo: Desarrollo;
  public conclusion:  string[];
  public llamado: string[];
  public idUsuario: string;


  constructor(id:string , nombreExpositor: string, titulo: string, fecha: any, tema: string
              , textoBase: string, introduccion: string[]
              , desarrollo: Desarrollo, conclusion: string[], llamado: string[],
              idUsuario: string) {
    this.id = id;
    this.nombreExpositor = nombreExpositor;
    this.titulo = titulo;
    this.fecha = fecha;
    this.tema = tema;
    this.textoBase = textoBase;
    this.introduccion = introduccion;
    this.desarrollo = desarrollo;
    this.conclusion = conclusion;
    this.llamado = llamado;
    this.idUsuario = idUsuario;
  }
}


export class Desarrollo{
  public tituloDesarrollo: string;
  public secciones: Seccion[];

  constructor() {
    this.tituloDesarrollo = '';
    this.secciones = [];
  }


}

export class Seccion {
  punto: string;
  incisos: string[];

  constructor() {
    this.punto = '';
    this.incisos = [];
  }




}



