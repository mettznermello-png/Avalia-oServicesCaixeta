// Missoes.test.js
import request from "supertest";
import app from "../app.js";

test("POST /Missoes cria um novo livro", async () => {
  const resposta = await request(app).post("/Missoes")
    .send({ nome: "Apollo", ano: " 1969",  agencia: "NASA", status: "Concluida"});

  expect(resposta.status).toBe(201);
  expect(resposta.body.nome).toBe("Apollo");
});

test("POST /Missoes retorna erro ao não informar o ano", async () => {
  const resposta = await request(app).post("/Missoes")
    .send({ nome: "Apollo" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("ano é obrigatório");
});


test("GET /Missoes  filtra Missoes pela Agencia", async () => {
  const resposta = await request(app).get("/Missoes")
    .send("nome=Apollo");

  expect(resposta.status).toBe(200);
  expect(resposta.body[0].nome).toBe("Apollo");
});

test("GET /Missoes duas Missoes já cadastradas", async () => {
  const resposta = await request(app).get("/Missoes")
    .send();

  expect(resposta.status).toBe(200);
  expect(resposta.body.length).toBe(3);
});

test("GET /Missoes filtra por nome sem diferenciar maiúsculas", async () => {
  const resposta = await request(app).get("/Missoes")
    .query({ nome: "APOLLO" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toHaveLength(1);
  expect(resposta.body[0].nome).toBe("Apollo");
});

test("GET /Missoes retorna lista vazio quando não encontra o nome", async () => {
  const resposta = await request(app).get("/Missoes")
    .query({ nome: "Nome inexistente" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toEqual([]);
});

test("GET /Missoes/:id retorna a Missão encontrado", async () => {
  const resposta = await request(app).get("/Missoes/1");

  expect(resposta.status).toBe(200);
  expect(resposta.body.id).toBe(1);
});

test("GET /Missoes/:id retorna erro quando a Missão não existe", async () => {
  const resposta = await request(app).get("/Missoes/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrado" });
});

test("POST /Missoes retorna erro quando a Agencia não é informado", async () => {
  const resposta = await request(app).post("/Missoes")
    .send({ agencia: "Agencia sem Missões" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Missão ainda a de ser marcada");
});

test("POST /Missoes aceita disponibilidade informada", async () => {
  const resposta = await request(app).post("/Missoes")
    .send({ titulo: "Missão concluida", ano: "ano", disponivel: true });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(true);
});

test("POST /Missoes usa indisponibilidade quando ela não é informada", async () => {
  const resposta = await request(app).post("/Missoes")
    .send({ titulo: "Missão ainda não feita", disponivel: false });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(false);
});

test("PUT /Missoes/:id atualiza os campos informados", async () => {
  const resposta = await request(app).put("/Missoes/1")
    .send({ titulo: "Missão atualizado", ano: "Nova Missão", disponivel: true });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    id: 1,
    titulo: "Missão atualizado",
    ano: "Nova Missão",
    disponivel: true
  });
});

test("PUT /Missoes/:id preserva os campos quando recebem valores vazios ou falsos", async () => {
  const resposta = await request(app).put("/Missoes/1")
    .send({ titulo: "", ano: "", nome: "", ano: " ",  agencia: "", status : false });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    titulo: "Missão atualizada",
    ano: "Nova Missão",
    disponivel: true
  });
});

test("PUT /Missoes/:id retorna erro quando a Missão não existe", async () => {
  const resposta = await request(app).put("/Missoes/999")
    .send({ titulo: "Missão" });

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrada" });
});

test("DELETE /Missoes/:id remove a Missão encontrado", async () => {
  const resposta = await request(app).delete("/Missoes/4");

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test("DELETE /Missoes/:id retorna erro quando a Missão não existe", async () => {
  const resposta = await request(app).delete("/Missoes/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrada" });
});