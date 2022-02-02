import {
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewRef
} from '@angular/core';
import {Desarrollo} from "../../../models/bosquejo";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-puntos-desarrollo',
  templateUrl: './puntos-desarrollo.component.html',
  styleUrls: ['./puntos-desarrollo.component.css']
})
export class PuntosDesarrolloComponent implements OnInit, OnDestroy {


  @Output('delete')
  deleteEvent = new EventEmitter<string>();

  @Input('punto')
  puntoModel: string = '';


  selectable = true;
  removable = true;
  addOnBlur = true;

  @Input('incisos')
  incisos: string[] = [];


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {

  }



  ngOnInit(): void {

  }


  delete() {
    this.deleteEvent.emit('borrar');
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.incisos.push(value);
    }
    event.chipInput!.clear();
  }

  remove(punto: string): void {
    const index = this.incisos.indexOf(punto);
    if (index >= 0) {
      this.incisos.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
  }


}
