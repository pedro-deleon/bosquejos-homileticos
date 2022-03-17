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

  public descargarBosquejoComoImagenPNG(node: ElementRef, titulo: string):Observable<String>{
    return from(htmlToImage.toPng(node.nativeElement,{style: {'width': '600px', 'height':'800px'}})).pipe(
      tap(data => saveAs(data.toString(),titulo))
    )
  }

}
