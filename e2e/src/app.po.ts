import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('Inter-root h5')).getText() as Promise<string>;
  }
  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomId')).sendKeys('Jane');
    element(by.id('nomId')).sendKeys('Menassa');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('typesProblemeId')).all(by.tagName('option')).get(1).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('notifierId')).get(0).click();
    element(by.id('descriptionProblemeId')).sendKeys('gros probleme'); 
  }
  setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typesProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notifierId')).get(2).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   }
   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typesProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notifierId')).get(1).click();
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('courrielConfirmationId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   }

  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }   

  setZonePrenomCaracteresInsuffisant() : void {
    element(by.id('prenomId')).clear();
    element(by.id('prenomId')).sendKeys('XX');
  }
  setZoneDescriptionProblemeCaracteresSuffisants(): void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }
  setZoneDescriptionProblemeCaracteresInSuffisants(): void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XX');
  }
  obtenirClasseZoneDescriptionProbleme(){
    element(by.id('descriptionProblemeId')).clear();
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }
  obtenirClasseZonePrenom()   { 
    return element(by.id('prenomId')).getAttribute("class");
  } 
}
