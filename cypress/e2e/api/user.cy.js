describe('User management - ServeRest)', () => {
  let userId;
  let user;

  before(() => {
    const uniq = Date.now();
    user = {
      nome: `User ${uniq}`,
      email: `user_${uniq}@mail.com`,
      password: '1234',
      administrador: 'false',
    };

    cy.request('POST', '/usuarios', user).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body._id;
      expect(userId).to.be.a('string');
    });
  });

  after(() => {
    if (userId) {
      cy.request('DELETE', `/usuarios/${userId}`);
      userId = undefined;
    }
  });

  it('GET /usuarios — lista usuários', () => {
    cy.request('GET', '/usuarios').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('quantidade');
      expect(res.body).to.have.property('usuarios').that.is.an('array');
    });
  });

  it('POST /usuarios — cadastra usuário', () => {
    const uniq = Date.now();
    const newUser = {
      nome: `new_user${uniq}`,
      email: `new${uniq}@mail.com`,
      password: '1234',
      administrador: 'false',
    };

    cy.request('POST', '/usuarios', newUser).then((res) => {
      expect(res.status).to.eq(201);
      const id = res.body._id;
      expect(id).to.be.a('string');

      cy.request('DELETE', `/usuarios/${id}`).its('status').should('be.oneOf', [200, 204]);
    });
  });

  it('GET /usuarios/{id} — busca por ID', () => {
    cy.request('GET', `/usuarios/${userId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.nome).to.eq(user.nome);
      expect(res.body.email).to.eq(user.email);
      expect(res.body.administrador).to.eq(user.administrador);
    });
  });

  it('PUT /usuarios/{id} — edita usuário', () => {
    const edited = { ...user, nome: `${user.nome} - editado` };

    cy.request('PUT', `/usuarios/${userId}`, edited).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.match(/Registro alterado com sucesso/i);

      cy.request('GET', `/usuarios/${userId}`).then((resGet) => {
        expect(resGet.status).to.eq(200);
        expect(resGet.body.nome).to.eq(edited.nome);
      });
    });
  });

  it('DELETE /usuarios/{id} — exclui usuário', () => {
    cy.request('DELETE', `/usuarios/${userId}`).then((res) => {
      expect(res.status).to.be.oneOf([200, 204]);
      userId = undefined;
    });
  });
});
