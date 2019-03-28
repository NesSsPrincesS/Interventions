import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator{
    static longueurMinimum(longueur: number): ValidatorFn{
        //sous angular dans les validateurs pour indiquer un succès retourner null
        return(valeurControle: AbstractControl): {[key:string]: boolean} | null =>{
            if(valeurControle.value.trim().length>=longueur){
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
        };
    }
}