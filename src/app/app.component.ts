import { Component, OnInit } from '@angular/core';
import { PoloService } from './polo/services/polo.service';
import { Router } from '@angular/router';
import { HttpService as Http, HttpProgressService, ICustomErrorConfig } from '@nordnet/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private loadingSubscription: Subscription;
  public onLoad: boolean = false;

  constructor(
    private poloService: PoloService,
    private router: Router,
    private httpProgressService: HttpProgressService
  ) {

    this.loadingSubscription = this.httpProgressService.loadingChange.subscribe((loading: boolean) => {
      setTimeout(() => {
        this.onLoad = loading;
      }, 0);
    });
  }

  public ngOnInit() { }

  public gotoPage(page: string): void {
    this.router.navigate([page]);
  }
}
