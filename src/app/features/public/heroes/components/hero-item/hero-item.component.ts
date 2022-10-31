import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent } from '@core/interfaces/action-event.interface';
import { Hero } from '@core/models/hero.model';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss'],
})
export class HeroItemComponent implements OnInit {
  @Input()
  hero!: Hero;

  @Output()
  action: EventEmitter<ActionEvent<Hero>> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickAction(action: string) {
    this.action.emit({ action, payload: this.hero });
  }
}
