import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Bosquejo} from "../../models/bosquejo";
import {BosquejoService} from "../../services/bosquejo.service";



@Injectable({
  providedIn: 'root'
})
export class BosquejoResolver implements Resolve<Bosquejo>{

  constructor(private bosquejoService: BosquejoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get("id");
    if(id){
      return this.bosquejoService.cargarBosquejo(id);
    } else {
      return of(undefined);
    }


  }
}
