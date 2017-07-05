import { Component, OnInit } from '@angular/core';
import { PoloService } from './services/polo.service';

@Component({
  selector: 'app-polo',
  templateUrl: './polo.component.html',
  styleUrls: ['./polo.component.css']
})
export class PoloComponent implements OnInit {

  constructor(private poloService: PoloService) { }

  public ngOnInit() {
    this.poloService.getAllData().then(data => {
      console.log(data);

    });
  }

}
