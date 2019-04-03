import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/validerZones/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeprobleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private probleme: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom:['',[ZonesValidator.longueurMinimum(3), Validators.required]],
      nom:['', [ZonesValidator.longueurMinimum]],
      typeProbleme: ['', Validators.required]
    });
    this.probleme.obtenirProbleme()
    .subscribe(cat => this.typeProbleme = cat,
               error => this.errorMessage = <any>error);
  }

}
