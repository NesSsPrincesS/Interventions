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
  it('#19 Zone TELEPHONE est désactivée quand notifier par courriel',() =>{
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#20 Zone ADRESSE COURRIEL est activée quand notifier par courriel ',() =>{
    component.appliquerNotifications('courrielGroup');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });
  it('#21 Zone ADRESSE COURRIEL CONFIRMATION est activée quand notifier par courriel ',() =>{
    component.appliquerNotifications('courrielGroup');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });
  it('#22  Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors ={};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#23  Zone ADRESSE COURRIEL CONFIRMATION est invalide sans valeur quand notifier par courriel ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors ={};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#24   Zone ADRESSE COURRIEL est invalide avec un format non conforme ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors ={};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('jwsssw');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  it('#25  Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors ={};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('');
    zoneCourrielConfirmation.setValue('jane@hotmail.com')

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsinvalides']).toBeUndefined();
  });
  it('#26 Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('jane@hotmail.com');
    zoneCourrielConfirmation.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsinvalides']).toBeUndefined();
  });
  it('#27 Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('jane@hotmail.com');
    zoneCourrielConfirmation.setValue('EL@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsinvalides']).toBeTruthy();
  });
  it('#28 Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel  ',() =>{
    component.appliquerNotifications('courrielGroup');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('jane@hotmail.com');
    zoneCourrielConfirmation.setValue('jane@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsinvalides']).toBeUndefined();
  });
});
