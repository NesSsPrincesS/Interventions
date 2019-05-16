import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/validerZones/longueur-minimum.component';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeprobleme';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;

  problemeI: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private probleme: TypeProblemeService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom:['',[ZonesValidator.longueurMinimum(3), Validators.required]],
      nom:['', [Validators.required, Validators.maxLength(50)]],
      typeProbleme: ['', Validators.required],
      notifier:['non'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
       telephone: [{value: '', disabled: true}],
       descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
       noUnite: '',
       dateProbleme: {value: Date(), disabled: true} 
    });
    this.probleme.obtenirProbleme()
    .subscribe(cat => this.typeProbleme = cat,
               error => this.errorMessage = <any>error);
    this.problemeForm.get('notifier').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(notifier: String): void {
    const notifierTelephoneControl = this.problemeForm.get('telephone');
    const notifierCourrielControl = this.problemeForm.get('courrielGroup.courriel');
    const notifierCourrielConfControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const notifierCourrielGroupControl = this.problemeForm.get('courrielGroup');     

    //tous remettre à zéro
    notifierTelephoneControl.clearValidators();
    notifierTelephoneControl.reset();
    notifierTelephoneControl.disable();

    notifierCourrielControl.clearValidators();
    notifierCourrielControl.reset();
    notifierCourrielControl.disable();

    notifierCourrielConfControl.clearValidators();
    notifierCourrielConfControl.reset();
    notifierCourrielConfControl.disable();

    if(notifier === 'telephone'){
      notifierTelephoneControl.enable();
      notifierTelephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10),  Validators.maxLength(10)]);
    }else if(notifier === 'courrielGroup'){
      notifierCourrielControl.enable();
      notifierCourrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      notifierCourrielConfControl.enable();
      notifierCourrielGroupControl.setValidators([emailMatcherValidator.courrielsValide()]);
    }

    notifierTelephoneControl.updateValueAndValidity();
    notifierCourrielControl.updateValueAndValidity();
    notifierCourrielConfControl.updateValueAndValidity();
    notifierCourrielControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.problemeI = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.problemeI.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
         this.problemeI.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;      
        this.problemeI.dateProbleme = new Date();
         this.problemeService.saveProbleme(this.problemeI)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
  }

}
