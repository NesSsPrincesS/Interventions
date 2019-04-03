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
    it('Une phrase avec 1 espace et 2 caractères est invalide. ` xx` ', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: " xx"};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });  
    it('Une phrase avec 2 espace et 1 caractères est invalide. `  x` ', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "  x"};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    }); 
    it('Une phrase avec 3 espaces et 3 caractères est valide ‘   xxx‘', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "   xxx"};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    }); 
    it('Une phrase avec 5 espaces et 5 caractères est valide ‘   xxxxx  ‘', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: "   xxxxx  "};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    }); 
    it('Une chaine null est invalide ', () =>{
        //Préparer variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: ""};
        //faire l'appel du validateur
        let result= validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    }); 

});