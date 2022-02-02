import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Bosquejo} from "../../models/bosquejo";
import {BosquejoService} from "../../services/bosquejo.service";
import {tap} from "rxjs";
import {SnackbarService} from "../../services/snackbar.service";
import {UserService} from "../../services/user.service";
import {DescargaBosquejosService} from "../../services/descarga-bosquejos.service";
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-bosquejo',
  templateUrl: './bosquejo.component.html',
  styleUrls: ['./bosquejo.component.css']
})
export class BosquejoComponent implements OnInit {

  @ViewChild('bosquejoDOM', {static: false})
  public bosquejoElementRef: ElementRef = {} as ElementRef;

  bosquejo: Bosquejo;


  constructor(private route: ActivatedRoute,
              public bosquejoService: BosquejoService,
              private descargaBosquejo: DescargaBosquejosService,
              private snackBarService: SnackbarService,
              private router: Router,
              public userService: UserService) {
    this.bosquejo = this.route.snapshot.data["bosquejo"];
  }

  ngOnInit(): void {
  }

  onClickDownload() {
    this.descargaBosquejo.descargarBosquejoComoImagenPNG(this.bosquejoElementRef)
      .subscribe({
        next: res => console.log(res),
        error: error => console.log(error)
      })
  }

  onDeleteBosquejo(bosquejo: Bosquejo) {
    this.bosquejoService.eliminarBosquejo(bosquejo.id)
      .pipe(
        tap(() => {
          this.snackBarService.openSnackBar('Bosquejo eliminado correctamente');
          this.router.navigateByUrl('/preview');
        })
      )
      .subscribe();
  }

}
