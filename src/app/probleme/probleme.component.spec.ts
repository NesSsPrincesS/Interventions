import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/validerZones/longueur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('champ prenom invalide avec 2 caractères',()=>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('champ prenom valide avec 3 caractères',()=>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('champ prenom valide avec 200 caractères',()=>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('champ prenom invalide avec aucun caractère',()=>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(0));
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('champ prenom invalide avec 10 espaces', () =>{
    //Préparer variable pour manipuler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    let control = {value: "          "};
    //faire l'appel du validateur
    let result= validator(control as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat PRÉVU
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });
  it('champ prenom invalide avec 2 espaces et 1 caractère', () =>{
    //Préparer variable pour manipuler le validateur
   let validator = ZonesValidator.longueurMinimum(3);
   let control = {value: "  x"};
   //faire l'appel du validateur
   let result= validator(control as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat PRÉVU
   expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });
});
