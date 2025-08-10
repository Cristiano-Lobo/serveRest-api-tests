
Cypress.Commands.add('apiLogin', () => {
  const email = Cypress.env('API_EMAIL');
  const password = Cypress.env('API_PASSWORD');

  return cy.request('POST', '/login', { email, password }).then((res) => {
    expect(res.status).to.eq(200);
    const auth = res.body.authorization;
    expect(auth).to.be.a('string').and.not.be.empty;

    Cypress.env('token', auth);
    return auth;
  });
});

Cypress.Commands.add('api', (method, path, options = {}) => {
  const token = Cypress.env('token');
  const headers = token ? { Authorization: token } : undefined;

  return cy.request({
    method,
    url: path,
    headers,
    failOnStatusCode: false,
    ...options,
  });
});

