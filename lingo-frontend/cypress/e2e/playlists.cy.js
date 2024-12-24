describe('Playlists UI', () => {
    const login = 'admin';
    const password = '123456';
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/signin');
      cy.get('input[name="login"]').type(login);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.visit('http://localhost:3000/playlists');
      cy.get('div#add-playlist', { timeout: 10000 }).should('be.visible').click();
    });
  
    it('Should create a new playlist', () => {
      cy.get('input[name="name"]').type('Cypress Test Playlist');
      cy.get('textarea[name="description"]').type('Playlist created by Cypress');
      cy.get('button[type="submit"]').click();
      cy.contains('Cypress Test Playlist').should('be.visible');
    });
  });
  