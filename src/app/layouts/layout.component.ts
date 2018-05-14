import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: '.page-wrapper',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class LayoutComponent implements AfterViewInit {
  public timer;
  public deadSession = 30 * 60;
  public minutesForDead = 30 * 60;
  public initSession = 0;
  constructor() { }

  ngAfterViewInit() {

  }

  destroyView() {

  }


}
