import { Component, OnInit } from '@angular/core';
import { PoloService } from './polo/services/polo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(
    private poloService: PoloService,
    private router: Router
  ) { }

  public ngOnInit() { }

  public gotoPage(page: string): void {
    this.router.navigate([page]);
  }
}
