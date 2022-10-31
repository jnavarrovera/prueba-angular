import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from '@core/constants/paths.constants';
import { TitleService } from '@core/services/title.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  constructor(protected titleService: TitleService, private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate([PATHS.HEROES]);
  }
}
