const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("superTest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("TodoApp Server Test", () => {
  it("[1] Server Çalışıyor mu /", async () => {
    const res = await superTest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: "Server is working" });
  }, 1000);
});

describe("Gorev Test", () => {
  it("[2] Doğru Sayıda Görev Geliyor mu ", async () => {
    const res = await superTest(server).get("/api/gorev");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  }, 1000);
  it("[3] Doğru Görev Geliyor mu ", async () => {
    const res = await superTest(server).get("/api/gorev/1");
    expect(res.status).toBe(200);
    expect(res.body.Adi).toBe("Sağlıklı Beslen");
  }, 1000);
  it("[4] Olmayan Görev 404 mü ", async () => {
    const res = await superTest(server).get("/api/gorev/2");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Görev Yok");
  }, 1000);
  it("[5] Görev Ekleme ", async () => {
    let ornekGorev = {
      Adi: "Python Öğren",
      Aciklama: "Makine Öğrenmesinde uzman ol",
    };
    const res = await superTest(server).post("/api/gorev").send(ornekGorev);
    expect(res.status).toBe(201);
    expect(res.body.Adi).toBe("Python Öğren");
  }, 1000);
});

describe("Task Test", () => {
  it("[6] Doğru Sayıda Task Geliyor mu /", async () => {
    const res = await superTest(server).get("/api/task");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  }, 1000);
  it("[7] Doğru Task Geliyor mu /", async () => {
    const res = await superTest(server).get("/api/task/1");
    expect(res.status).toBe(200);
    expect(res.body.Aciklama).toBe("Spor Yap");
  }, 1000);
  it("[8] Yanlış GörevId hatası var mı /", async () => {
    let ornekTask = {
      Adi: "Meyve Ye",
      Aciklama: "Sağlıklı Yap",
      Tarih: new Date().toLocaleString(),
      GorevId: 6,
    };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Görev yok");
  }, 1000);
  it("[9] Task Ekleniyor mu /", async () => {
    let ornekTask = {
      Adi: "TensorFlow Öğren",
      Aciklama: "Tensorflowda uzman ol",
      Tarih: new Date().toLocaleString(),
      GorevId: 1,
    };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(201);
    expect(res.body.Aciklama).toBe("Tensorflowda uzman ol");
  }, 1000);
  it("[10] Task Adı alanı kontrolü yapılıyor mu /", async () => {
    let ornekTask = {
      Aciklama: "Tensorflowda uzman ol",
      Tarih: new Date().toLocaleString(),
      GorevId: 1,
    };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Eksik Alan Var");
  }, 1000);
});
