import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlatedError } from '@core/models/controlated-error.model';
import { Hero } from '@core/models/hero.model';
import { Subscription } from 'rxjs';
import { HeroFacadeService } from '../../services/hero-facade.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.page.html',
  styleUrls: ['./hero-form.page.scss'],
})
export class HeroFormPage implements OnInit, OnDestroy {
  heroForm: FormGroup<{
    name: FormControl<string | null>;
    alias: FormControl<string | null>;
    city: FormControl<string | null>;
  }> = this.createForm();

  get name(): FormControl<string | null> {
    return this.heroForm.controls.name;
  }

  get alias(): FormControl<string | null> {
    return this.heroForm.controls.alias;
  }

  get city(): FormControl<string | null> {
    return this.heroForm.controls.city;
  }

  edit: boolean = false;

  hero!: Hero;

  subscriptions: Subscription = new Subscription();

  constructor(
    private facade: HeroFacadeService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    if (id && !isNaN(id)) {
      this.edit = true;
      const heroSub = this.facade.hero$.subscribe((hero) => {
        this.hero = hero;
        this.setDataToForm(hero);
      });
      this.subscriptions.add(heroSub);
      this.facade.getHero(+id);
    }
  }

  createForm() {
    return new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      alias: new FormControl<string>(''),
      city: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Requerido';
    }

    if (control.hasError('minlength')) {
      return `Mínimo ${control.getError('minlength').requiredLength} carácteres`;
    }

    return '';
  }

  save() {
    if (!this.heroForm.valid) {
      throw new ControlatedError(
        'Datos no válidos',
        'notification',
        'Revisa los datos introducidos'
      );
    }

    const heroToSave = new Hero(this.heroForm.value);
    if (this.edit) {
      heroToSave.id = this.hero.id;
      this.facade.updateHero(heroToSave);
    } else {
      this.facade.addHero(heroToSave);
    }
  }

  setDataToForm(hero: Hero) {
    this.alias.setValue(hero.alias);
    this.name.setValue(hero.name);
    this.city.setValue(hero.city);
  }
}
