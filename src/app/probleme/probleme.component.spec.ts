import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/validerZones/longueur-minimum.component';
import { HttpClientModule } from '@angular/common/http';
import { TypeProblemeService } from './type-probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypeProblemeService]
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
  
  it('should be created', () => {
    const service: TypeProblemeService = TestBed.get(TypeProblemeService);
    expect(service).toBeTruthy();
  });
  it('Zone telephone desactivé quand ne pas me notifier',() =>{
    component.appliquerNotifications('non');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it('Zone telephone est invalide sans valeur si notifierParTelephone',() =>{
    component.appliquerNotifications('telephone');
    let errors ={};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it(' Zone courriel est desactivé ne pas me notifier',() =>{
    component.appliquerNotifications('non');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it(' Zone courriel confirmation est desactivé ne pas me notifier',() =>{
    component.appliquerNotifications('non');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
});
