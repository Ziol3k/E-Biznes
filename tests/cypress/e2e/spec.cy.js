describe('GitHub Functional & API Tests', () => {

  it('TC01: Powinien wyświetlać stronę główną GitHub z prawidłowym tytułem i nagłówkiem', () => {
    cy.viewport(1280, 800);
    cy.visit('https://github.com');
    cy.title().should('include', 'GitHub');
    cy.get('header').should('be.visible');
    cy.get('a[href="/login"]').should('be.visible');
  });

  it('TC02: Kliknięcie w "Sign in" przekierowuje do strony logowania', () => {
    cy.viewport(1280, 800);
    cy.visit('https://github.com');
    cy.get('a[href="/login"]').filter(':visible').click();
    cy.url().should('include', '/login');
    cy.get('input[name="login"]').should('be.visible');
  });

  it('TC03: Strona logowania wyświetla wszystkie niezbędne pola formularza', () => {
    cy.visit('https://github.com/login');
    cy.get('input[name="login"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="commit"]').should('exist');
  });

  it('TC04: Nieprawidłowe dane logowania powodują wyświetlenie komunikatu o błędzie', () => {
    cy.visit('https://github.com/login');
    cy.get('input[name="login"]').type('invalidUser');
    cy.get('input[name="password"]').type('invalidPassword');
    cy.get('input[name="commit"]').click();
    cy.get('.flash-error')
      .should('be.visible')
      .and('contain', 'Incorrect username or password');
  });

  it('TC05: Funkcja wyszukiwania działa poprawnie', () => {
    cy.visit('https://github.com');
    cy.viewport(1280, 800);
    cy.wait(1000);
    cy.get('body').type('/');
    cy.wait(1000);
    cy.get('input[name="query-builder-test"]')
      .should('be.visible')
      .type('cypress{enter}');
    cy.url().should('include', 'q=cypress');
    cy.wait(1000);
    cy.get('div[data-testid="results-list"]', { timeout: 10000 })
      .should('be.visible')
      .children()
      .should('have.length.greaterThan', 0);
  });

  it('TC06: Strona repozytorium "microsoft/vscode" wczytuje się poprawnie', () => {
    cy.visit('https://github.com/microsoft/vscode');
    cy.get('strong[itemprop="name"] a').should('contain', 'vscode');
    cy.get('a.UnderlineNav-item[aria-current="page"]', { timeout: 10000 })
      .should('contain', 'Code');
    cy.scrollTo('bottom');
    cy.get('article.markdown-body', { timeout: 10000 }).should('be.visible');
  });

  it('TC07: Kliknięcie "Sign up" przekierowuje do formularza rejestracji', () => {
    cy.visit('https://github.com');
    cy.viewport(1280, 800);
    cy.get('header').find('a[href^="/signup"]').filter(':visible').click({ force: true });
    cy.url().should('include', '/signup');
    cy.get('form').should('contain', 'Sign up to GitHub');
  });

  it('TC08: Strona Explore wyświetla trendy i kolekcje', () => {
    cy.visit('https://github.com/explore');
    cy.get('main').should('be.visible');
    cy.contains('Trending').should('exist');
  });

  it('TC09: Stopka strony głównej zawiera kluczowe linki (Terms, Privacy, Security)', () => {
    cy.visit('https://github.com');
    cy.get('footer').should('be.visible');
    cy.get('footer').within(() => {
      cy.contains('Terms').should('exist');
      cy.contains('Privacy').should('exist');
      cy.contains('Security').should('exist');
    });
  });

  it('TC10: Strona Features prezentuje kluczowe funkcje GitHub', () => {
    cy.visit('https://github.com/features');
    cy.contains('Features').should('be.visible');
    cy.get('div#sub-nav-dropdown').should('exist').and('be.visible');
    cy.get('div#sub-nav-dropdown a')
      .its('length')
      .should('be.gte', 1);
    cy.get('div#sub-nav-dropdown a').then(($links) => {
      const linkTexts = [...$links].map(link => link.textContent.trim());
      cy.log('Teksty linków: ', linkTexts);
    });
  });

  it('TC11: Strona Pricing wyświetla dostępne plany cenowe', () => {
    cy.visit('https://github.com/pricing');
    cy.viewport(1280, 800);
    cy.get('main.font-mktg').should('be.visible');
    cy.contains('Free').should('be.visible');
    cy.contains('Team').should('be.visible');
    cy.contains('Enterprise').should('exist');
  });

  it('TC12: API GitHub zwraca poprawne dane dla repozytorium "microsoft/vscode"', () => {
    cy.request('https://api.github.com/repos/microsoft/vscode')
      .its('status').should('eq', 200);
    cy.request('https://api.github.com/repos/microsoft/vscode')
      .its('body')
      .then((body) => {
        expect(body).to.have.property('name', 'vscode');
        expect(body).to.have.property('full_name', 'microsoft/vscode');
      });
  });

  it('TC13: API GitHub zwraca błąd 404 dla nieistniejącego repozytorium', () => {
    cy.request({
      url: 'https://api.github.com/repos/microsoft/nonexistentrepo',
      failOnStatusCode: false
    })
      .its('status').should('eq', 404);
    cy.request({
      url: 'https://api.github.com/repos/microsoft/nonexistentrepo',
      failOnStatusCode: false
    })
      .its('body').should('have.property', 'message');
  });

  it('TC14: API GitHub zwraca poprawne dane dla użytkownika "github"', () => {
    cy.request('https://api.github.com/users/github')
      .its('status').should('eq', 200);
    cy.request('https://api.github.com/users/github')
      .its('body')
      .then((body) => {
        expect(body).to.have.property('login', 'github');
        expect(body).to.have.property('id');
      });
  });

  it('TC15: API GitHub search dla losowego zapytania zwraca 0 wyników', () => {
    cy.request('https://api.github.com/search/users?q=asldkfjalskdfjalskdfj')
      .its('status').should('eq', 200);
    cy.request('https://api.github.com/search/users?q=asldkfjalskdfjalskdfj')
      .its('body')
      .then((body) => {
        expect(body.total_count).to.eq(0);
      });
  });

  it('TC16: Strona główna GitHub ustawia oczekiwane ciasteczka', () => {
    cy.visit('https://github.com');
    cy.getCookies().should('have.length.greaterThan', 0);
  });

  it('TC17: Strona Trending wyświetla listę repozytoriów', () => {
    cy.visit('https://github.com/trending');
    cy.get('.Box')
      .its('length')
      .should('be.gte', 1);
    cy.get('article.Box-row').first().should('contain.text', '/');
  });

  it('TC18: Wejście na nieistniejącą stronę powoduje wyświetlenie komunikatu 404', () => {
    cy.visit('https://github.com/nonexistingpage', { failOnStatusCode: false });
    cy.get('img[alt*="404"]', { timeout: 10000 }).should('be.visible');
    cy.get('img[alt*="404"]').first()
      .should('have.attr', 'alt')
      .and('not.be.empty')
      .then((altText) => {
        cy.log('Alt attribute:', altText);
        expect(altText).to.include('This is not the web page you are looking for');
      });
  });

  it('TC19: Widok mobilny strony głównej wyświetla elementy mobilnego menu', () => {
    cy.viewport(375, 667);
    cy.visit('https://github.com');
    cy.get('button[aria-label="Toggle navigation"]')
      .filter(':visible')
      .should('be.visible')
      .click();
    cy.contains('Pricing').should('be.visible');
  });

  it('TC20: Stopka wyświetla się i zawiera "Support"', () => {
    cy.visit('https://github.com');
    cy.get('footer').should('be.visible');
    cy.get('footer').should('contain.text', 'Support');
  });

});
