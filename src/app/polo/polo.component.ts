import { Component, OnInit, Inject } from '@angular/core';
import { PoloService } from './services/polo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-polo',
  templateUrl: './polo.component.html'
})
export class PoloComponent implements OnInit {
  public form: FormGroup;
  public percentList: Array<number> = [];
  public showResult: boolean = false;
  public finalPrice: any = 0;
  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private poloService: PoloService
  ) {
    this.initForm(fb);
  }

  public ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.percentList.push(i);
    }
  }

  /**
   * Init Form
   *
   * @param {FormBuilder} fb
   */
  public initForm(fb: FormBuilder): void {
    this.form = fb.group({
      buyPrice: '',
      profitLost: 'profit',
      percent: 5
    });
  }

  /**
   * Submit Form
   *
   * @param {*} data
   */
  public submit(): void {
    console.log(this.form.value);
    this.showResult = true;
    let price = this.form.get('buyPrice').value;
    let percent = this.form.get('percent').value;
    let profit = this.form.get('profitLost').value;
    if (profit === 'profit') {
      this.finalPrice = price * (100 + percent) / 100;
    } else {
      this.finalPrice = price * (100 - percent) / 100;
    }
  }

}
