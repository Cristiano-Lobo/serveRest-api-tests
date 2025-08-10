
export function api(method, path, options = {}) {
  const token = Cypress.env('token');
  const headers = token ? { Authorization: token } : {};

  return cy.request({
    method,
    url: path,
    failOnStatusCode: false,
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
}

export function apiLogin(email = Cypress.env('API_EMAIL'), password = Cypress.env('API_PASSWORD')) {
  return cy.request('POST', '/login', { email, password }).then((res) => {
    expect(res.status).to.eq(200);
    const auth = res.body.authorization;
    expect(auth).to.be.a('string').and.not.be.empty;
    Cypress.env('token', auth);
    return auth;
  });
}
