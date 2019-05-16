export interface IProbleme {
    Id: number,
    prenom: string,
    nom: string,
    noTypeProbleme: number,   
    courriel?: string,
    courrielConfirmation?: string,
    telephone?: string, 
    notification: string,
    noUnite?: string,
    descriptionProbleme: string,
    dateProbleme: Date
}