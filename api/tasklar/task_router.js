const router = require("express").Router();
const taskModel = require("./task_model");
const mw = require("./task_middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTasks = await taskModel.getAll();
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.checkTaskId, async (req, res, next) => {
  try {
    res.json(req.Task);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  mw.checkGorevId,
  mw.checkTaskFields,
  async (req, res, next) => {
    try {
      let insertedTask = await taskModel.create(req.body);
      res.status(201).json(insertedTask);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.checkTaskId, async (req, res, next) => {
  try {
    await taskModel.remove(req.params.id);
    res.json(req.Task);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
