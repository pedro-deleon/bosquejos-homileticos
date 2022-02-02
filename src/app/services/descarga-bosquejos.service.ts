import {ElementRef, Injectable} from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng} from 'html-to-image';
import {catchError, from, Observable, tap} from "rxjs";
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class DescargaBosquejosService {

  constructor() { }

  public descargarBosquejoComoImagenPNG(node: ElementRef):Observable<String>{
    return from(htmlToImage.toPng(node.nativeElement)).pipe(
      tap(data => saveAs(data.toString(),'bosquejo.png'))
    )
  }

}
