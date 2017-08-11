import { Component, OnInit } from '@angular/core';
import { PoloService } from './polo/services/polo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private poloService: PoloService) { }

  public ngOnInit() { }
}
