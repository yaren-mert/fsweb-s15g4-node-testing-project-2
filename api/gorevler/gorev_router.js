const router = require("express").Router();
const gorevModel = require("./gorev_model");

router.get("/", async (req, res, next) => {
  try {
    const allGorevs = await gorevModel.getAll();
    res.json(allGorevs);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let gorev = await gorevModel.getById(req.params.id);
    if (!gorev) {
      next({
        status: 404,
        message: "Görev Yok",
      });
    } else {
      res.json(gorev);
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    if (!req.body || !req.body.Adi) {
      next({
        status: "400",
        message: "Eksik Alan Var",
      });
    } else {
      let insertedGorev = await gorevModel.create(req.body);
      res.status(201).json(insertedGorev);
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await gorevModel.remove(req.params.id);
    res.status(200).json({ message: "Silme Başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
