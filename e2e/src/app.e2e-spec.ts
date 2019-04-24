import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Déclarer un problème');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });   
  it(' Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  }); 
  it(' Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par Par courriel'  , () => {
    page.setChampsValidesScenarioAlternatifParCourriel();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  }); 
  it('zone prenom a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZonePrenomCaracteresInsuffisant();  
    expect(page.obtenirClasseZonePrenom()).toContain('is-invalid');
  });
  it(' Zone DESCRIPTION DU PROBLÈME a  une bordure VERTE si nombre de  caractères suffisant  ', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisants();  
    expect(page.obtenirClasseZonePrenom()).toContain('is-invalid');
  });
  it('zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionProblemeCaracteresInSuffisants();  
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });
  
});
