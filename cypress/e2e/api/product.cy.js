describe('Product management - ServeRest', () => {
  let productId;
  let product;
  let auth;

  before(() => {
    const user = {
      nome: `Admin ${Date.now()}`,
      email: `admin_${Date.now()}@mail.com`,
      password: '1234',
      administrador: 'true',
    };

    cy.request('POST', '/usuarios', user).its('status').should('eq', 201);

    cy.request('POST', '/login', { email: user.email, password: user.password })
      .then((res) => {
        expect(res.status).to.eq(200);
        auth = res.body.authorization;
        expect(auth).to.be.a('string').and.not.be.empty;
      });

    const t = Date.now();
    product = {
      nome: `Produto ${t}`,
      preco: 2990,
      descricao: 'Sua iluminação RGB LIGHTSYNC pode ser personalizada com efeitos ou padrões de ondas ',
      quantidade: 7
    };
  });

  after(() => {
    if (productId) {
      cy.request({
        method: 'DELETE',
        url: `/produtos/${productId}`,
        headers: { Authorization: auth }
      }).its('status').should('be.oneOf', [200, 204]);
      productId = undefined;
    }
  });

  it('GET /produtos — lista produtos', () => {
    cy.request('GET', '/produtos').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('quantidade');
      expect(res.body).to.have.property('produtos').that.is.an('array');
    });
  });

  it('POST /produtos — cadastra produto', () => {
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: { Authorization: auth },
      body: product
    }).then((res) => {
      expect(res.status).to.eq(201);
      productId = res.body._id;
      expect(productId).to.be.a('string');

      cy.request({
        method: 'DELETE',
        url: `/produtos/${productId}`,
        headers: { Authorization: auth }
      }).its('status').should('be.oneOf', [200, 204]);

      productId = undefined;
    });
  });

  it('GET /produtos/{id} — busca por ID', () => {
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: { Authorization: auth },
      body: product
    }).then((resCreate) => {
      expect(resCreate.status).to.eq(201);
      const id = resCreate.body._id;

      cy.request('GET', `/produtos/${id}`).then((resGet) => {
        expect(resGet.status).to.eq(200);
        expect(resGet.body.nome).to.eq(product.nome);
        expect(resGet.body.preco).to.eq(product.preco);
        expect(resGet.body.descricao).to.eq(product.descricao);
        expect(resGet.body.quantidade).to.eq(product.quantidade);
      });

      cy.request({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { Authorization: auth }
      }).its('status').should('be.oneOf', [200, 204]);
    });
  });

  it('PUT /produtos/{id} — edita produto', () => {
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: { Authorization: auth },
      body: product
    }).then((resCreate) => {
      expect(resCreate.status).to.eq(201);
      const id = resCreate.body._id;

      const edited = { ...product, nome: `${product.nome} - editado` };

      cy.request({
        method: 'PUT',
        url: `/produtos/${id}`,
        headers: { Authorization: auth },
        body: edited
      }).then((resPut) => {
        expect(resPut.status).to.eq(200);
        expect(resPut.body.message).to.match(/Registro alterado com sucesso/i);

        cy.request('GET', `/produtos/${id}`).then((resGet) => {
          expect(resGet.status).to.eq(200);
          expect(resGet.body.nome).to.eq(edited.nome);
        });
      });

      cy.request({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { Authorization: auth }
      }).its('status').should('be.oneOf', [200, 204]);
    });
  });

  it('DELETE /produtos/{id} — deletar produto', () => {
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: { Authorization: auth },
      body: product
    }).then((resCreate) => {
      expect(resCreate.status).to.eq(201);
      const id = resCreate.body._id;

      cy.request({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { Authorization: auth }
      }).then((resDel) => {
        expect(resDel.status).to.be.oneOf([200, 204]);
      });
    });
  });
});
