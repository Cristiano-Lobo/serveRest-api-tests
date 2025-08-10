function unique() {
  return Date.now().toString(36);
}

export function buildUser(base = {}, { admin = false } = {}) {
  const suffix = unique();
  return {
    nome: base.nome || `Usuario ${suffix}`,
    email: base.email || `user_${suffix}@teste.com`,
    password: base.password || '1234',
    administrador: admin ? 'true' : (base.administrador || 'false'),
  };
}



