import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component, ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent, MatChipList} from "@angular/material/chips";
import {Bosquejo, Desarrollo, Seccion} from "../../models/bosquejo";
import {PuntosDesarrolloComponent} from "./puntos-desarrollo/puntos-desarrollo.component";
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {BosquejoService} from "../../services/bosquejo.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {catchError, tap, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  bosquejoId: string;
  accion: string | null;
  bosquejoEditar: Bosquejo = {} as Bosquejo;

  bosquejoForm = this.fb.group({
    nombreExpositor: ['', Validators.required],
    fecha: ['', Validators.required],
    titulo: ['', Validators.required],
    tema: ['', Validators.required],
    textoBase: ['', Validators.required],
    introduccion: [[]],
    desarrolloTitulo: [''],
    desarrollo: this.fb.group({
      tituloDesarrollo: [''],
      secciones: this.fb.array([])
    }),
    conclusion: [[]],
    llamado: [[]]
  });


  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChildren('puntoDesarrolloComponent', {read: ElementRef})
  queryListElementRef: QueryList<ElementRef> =
    new QueryList<ElementRef>();


  @ViewChildren('puntoDesarrolloComponent', {read: PuntosDesarrolloComponent})
  queryListPuntoDesarrolloComponent: QueryList<PuntosDesarrolloComponent> =
    new QueryList<PuntosDesarrolloComponent>();

  indices: number[] = [];


  constructor(private fb: FormBuilder, private bosquejoService: BosquejoService,
              private afs: AngularFirestore,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBarService: SnackbarService,
              private afAuth: AngularFireAuth) {
    this.accion = this.activatedRoute.snapshot.paramMap.get('accion');
    if (this.accion == 'agregar') {
      this.bosquejoId = this.afs.createId();
    } else {
      this.bosquejoId = '';
    }

  }

  ngOnInit(): void {
    if (this.accion == 'editar') {
      this.bosquejoEditar = this.activatedRoute.snapshot.data["bosquejo"];
      this.bosquejoId = this.bosquejoEditar.id;
      this.bosquejoForm = this.fb.group({
        nombreExpositor: [this.bosquejoEditar.nombreExpositor, Validators.required],
        fecha: [new Date(this.bosquejoEditar.fecha['seconds'] * 1000), Validators.required],
        titulo: [this.bosquejoEditar.titulo, Validators.required],
        tema: [this.bosquejoEditar.tema, Validators.required],
        textoBase: [this.bosquejoEditar.textoBase, Validators.required],
        introduccion: [this.bosquejoEditar.introduccion],
        desarrollo: this.fb.group({
          tituloDesarrollo: [this.bosquejoEditar.desarrollo.tituloDesarrollo],
          secciones: this.fb.array(this.bosquejoEditar.desarrollo.secciones)
        }),
        conclusion: [this.bosquejoEditar.conclusion],
        llamado: [this.bosquejoEditar.llamado]
      });
    }


  }

  ngAfterViewInit() {

  }


  agregarPuntoDesarrollo() {
    this.addSeccion();
  }

  quitarPuntoDesarrollo(index?: number) {
    this.queryListElementRef.forEach(el => {
      if (el.nativeElement.id == index) {
        el.nativeElement.remove();
      }
    });
  }


  onSubmit(): undefined | void {

    if (this.bosquejoForm.status == 'INVALID') {
      this.snackBarService.openSnackBar('Revisa el formulario', 'Error');
      return undefined;
    }

    if (this.accion == 'editar') {
      const cambios = this.getBosquejo();
      this.afAuth.user.subscribe(user => {
        cambios.idUsuario = user?.uid;
        this.bosquejoService.actualizarBosquejo(this.bosquejoId, cambios)
          .subscribe(() => {
            this.router.navigateByUrl("/preview");
            this.snackBarService.openSnackBar('Bosquejo editado con éxito');
          });
      })


    } else if (this.accion == 'agregar') {
      const nuevoBosquejo = this.getBosquejo();
      this.afAuth.user.subscribe(user => {
        nuevoBosquejo.idUsuario = user?.uid == 'x6VjKawO4zXQFjQAF2hgsTTnqU33' ? 'admin': user?.uid;
        this.bosquejoService.crearBosquejo(nuevoBosquejo, this.bosquejoId)
          .pipe(
            tap(bosquejo => {
              this.router.navigateByUrl("/preview");
              this.snackBarService.openSnackBar('Bosquejo agregado con éxito');
            }),
            catchError(err => {
              console.log(err);
              this.snackBarService.openSnackBar(err, 'Error');
              return throwError(err);
            })
          )
          .subscribe(el => {
          });
      })


    }


  }

  private getBosquejo(): Partial<Bosquejo> {
    const val = this.bosquejoForm.value;
    this.setearSeccionesDesarrollo();
    const nuevoBosquejo: Partial<Bosquejo> = {
      nombreExpositor: val.nombreExpositor,
      titulo: val.titulo,
      fecha: val.fecha,
      tema: val.tema,
      desarrollo: val.desarrollo,
      textoBase: val.textoBase,
      introduccion: val.introduccion,
      conclusion: val.conclusion,
      llamado: val.llamado
    }
    nuevoBosquejo.fecha = Timestamp.fromDate(nuevoBosquejo.fecha);
    return nuevoBosquejo;

  }


  // NO ES LO MEJOR
  setearComponenteSeccionesDesarrollo() {
    this.queryListPuntoDesarrolloComponent.forEach((comp, index) => {
      comp.puntoModel = this.bosquejoForm.value.desarrollo.secciones[index].punto;
      comp.incisos = this.bosquejoForm.value.desarrollo.secciones[index].incisos;
    });
  }

  setearSeccionesDesarrollo() {
    this.queryListPuntoDesarrolloComponent.forEach((comp, index) => {
      this.bosquejoForm.value.desarrollo.secciones[index].incisos = comp.incisos;
      this.bosquejoForm.value.desarrollo.secciones[index].punto = comp.puntoModel;
    });
  }

  get secciones() {
    return this.bosquejoForm.controls['desarrollo'].get('secciones') as FormArray;
  }

  addSeccion() {


    this.secciones.push(this.fb.group({
      punto: [''],
      incisos: [[]]
    }));
  }


  add(event
        :
        MatChipInputEvent, elemento
        :
        string
  ) {

    const value = (event.value || '').trim();

    if (elemento == 'introduccion') {
      if (value) {
        this.bosquejoForm.value.introduccion.push(value);
      }
    }


    if (elemento == 'conclusion') {
      if (value) {
        this.bosquejoForm.value.conclusion.push(value);
      }
    }


    if (elemento == 'llamado') {
      if (value) {
        this.bosquejoForm.value.llamado.push(value);
      }
    }

    event.chipInput!.clear();
  }

  remove(punto
           :
           string, elemento
           :
           string
  ):
    void {

    if (elemento == 'introduccion'
    ) {
      const index = this.bosquejoForm.value.introduccion.indexOf(punto);
      if (index >= 0) {
        this.bosquejoForm.value.introduccion.splice(index, 1);
      }
    }


    if (elemento == 'conclusion') {
      const index = this.bosquejoForm.value.conclusion.indexOf(punto);
      if (index >= 0) {
        this.bosquejoForm.value.conclusion.splice(index, 1);
      }
    }

    if (elemento == 'llamado') {
      const index = this.bosquejoForm.value.llamado.indexOf(punto);
      if (index >= 0) {
        this.bosquejoForm.value.llamado.splice(index, 1);
      }
    }


  }


}
