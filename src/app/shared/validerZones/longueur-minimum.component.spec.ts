import { ZonesValidator } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator',() =>{
    it('valeur invalide si la chaine contient 10 espace vide', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "          "};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
    it('une phrase avec des mots est valide', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "Vive Angular"};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });
    it('valeur valide ‘   je le veux   ‘', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "   je le veux   "};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });  
});