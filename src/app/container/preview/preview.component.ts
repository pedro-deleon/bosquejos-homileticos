import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Bosquejo} from "../../models/bosquejo";
import {Observable} from "rxjs";
import {BosquejoService} from "../../services/bosquejo.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  bosquejos$: Observable<Bosquejo[]> | undefined;
  idBosquejo: string = '';



  constructor(public bosquejoService: BosquejoService,
              public userService: UserService) {

    this.userService.isLoggedIn$.subscribe(value => {
      console.log(value);
      if(value){
        this.bosquejos$ = this.bosquejoService.cargarMisBosquejos();
      } else {
        this.bosquejos$ = this.bosquejoService.cargarBosquejosInvitado();
      }
    })
  }


  ngOnInit(): void {
  }

  cargarMisBoquejos(){
    this.bosquejos$ = this.bosquejoService.cargarMisBosquejos();
  }

  cargarBosquejosInvitado(){
    this.bosquejos$ = this.bosquejoService.cargarBosquejosInvitado();
  }


}
